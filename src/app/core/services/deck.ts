import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { AuthService } from './auth';

export interface Deck {
  id: number;
  title: string;
  category: string;
  is_public: boolean;
  cards: any[];
  user_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private supabase = inject(SupabaseService).client;

  decks = signal<Deck[]>([]);
  cardsReviewed = signal(0);
  streakDays = signal(0);
  masteryLevel = signal(0);

  userInitial = signal('EU');
  userName = signal('Estudante');

  private currentUser: any = null;

  constructor() {
    this.init();
  }

  async init() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session?.user) {
      this.currentUser = data.session.user;
      this.loadRealData();
    } else {
      this.loadPublicDecksOnly();
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        this.currentUser = session.user;
        this.loadRealData();
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
        this.resetData();
      }
    });
  }

  resetData() {
    this.cardsReviewed.set(0);
    this.streakDays.set(0);
    this.masteryLevel.set(0);
    this.userInitial.set('EU');
    this.userName.set('Estudante');
    this.loadPublicDecksOnly();
  }

  async loadRealData() {
    if (!this.currentUser) return;

    const meta = this.currentUser.user_metadata;

    const { data: profile } = await this.supabase
      .from('profiles')
      .select('display_name, total_reviews, streak_days, correct_reviews')
      .eq('id', this.currentUser.id)
      .single();

    let nameToUse = profile?.display_name || meta?.display_name || meta?.full_name;

    if (!nameToUse || nameToUse.includes('@')) {
      const fallback = nameToUse || this.currentUser.email || 'Estudante';
      nameToUse = fallback.split('@')[0];
    }

    this.formatAndSetName(nameToUse);

    if (profile) {
      this.cardsReviewed.set(profile.total_reviews || 0);
      this.streakDays.set(profile.streak_days || 0);
      const total = profile.total_reviews || 0;
      const acertos = profile.correct_reviews || 0;
      this.masteryLevel.set(total > 0 ? Math.round((acertos / total) * 100) : 0);
    }

    const { data: decksData } = await this.supabase.from('decks').select('*, cards(*)').order('id');
    if (decksData) this.decks.set(decksData);
  }

  private formatAndSetName(fullName: string) {
    if (!fullName) return;

    let name = fullName;
    //correcao rapidinha para um erro que tava dando
    const nomesErrados = ['gabresdeus', 'gabresdeus@gmail.com'];

    if (nomesErrados.includes(name.toLowerCase())) {
      name = 'Gabriel';
    }

    if (name.includes('@')) {
      name = name.split('@')[0];
    }

    const firstName = name.trim().split(' ')[0];
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    this.userName.set(capitalizedName);
    this.userInitial.set(capitalizedName.charAt(0));
  }

  async loadPublicDecksOnly() {
    const { data } = await this.supabase.from('decks').select('*, cards(*)').eq('is_public', true);
    if (data) this.decks.set(data);
  }

  async createDeck(title: string, category: string) {
    if (!this.currentUser) return;
    const { data, error } = await this.supabase
      .from('decks')
      .insert({
        title: title,
        category: category,
        user_id: this.currentUser.id,
        is_public: false,
      })
      .select()
      .single();

    if (!error) {
      const newDeck = { ...data, cards: [] };
      this.decks.update((curr) => [...curr, newDeck]);
    }
  }

  async deleteDeck(id: number) {
    const { error } = await this.supabase.from('decks').delete().eq('id', id);
    if (!error) this.decks.update((list) => list.filter((d) => d.id !== id));
  }

  async addCard(deckId: number, front: string, back: string) {
    const { data, error } = await this.supabase
      .from('cards')
      .insert({
        deck_id: deckId,
        front: front,
        back: back,
      })
      .select()
      .single();

    if (!error) {
      this.decks.update((list) =>
        list.map((deck) => {
          if (deck.id === deckId) return { ...deck, cards: [...deck.cards, data] };
          return deck;
        })
      );
    }
  }

  async registerReview(isCorrect: boolean) {
    if (!this.currentUser) return;

    const newTotal = this.cardsReviewed() + 1;
    this.cardsReviewed.set(newTotal);

    let acertosAtuais = Math.round((this.masteryLevel() / 100) * (newTotal - 1));
    if (isCorrect) acertosAtuais++;
    this.masteryLevel.set(Math.round((acertosAtuais / newTotal) * 100));

    const { data: profile } = await this.supabase
      .from('profiles')
      .select('correct_reviews')
      .eq('id', this.currentUser.id)
      .single();

    const updateData: any = {
      total_reviews: newTotal,
      correct_reviews: isCorrect
        ? (profile?.correct_reviews || 0) + 1
        : profile?.correct_reviews || 0,
    };

    await this.supabase.from('profiles').update(updateData).eq('id', this.currentUser.id);
  }
}
