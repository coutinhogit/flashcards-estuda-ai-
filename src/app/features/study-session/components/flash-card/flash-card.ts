import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeckService } from '../../../../core/services/deck';

@Component({
  selector: 'app-flash-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './flash-card.html',
  styleUrl: './flash-card.css'
})
export class FlashCardComponent {
  private route = inject(ActivatedRoute);
  private deckService = inject(DeckService);

  // Pega o ID da URL (ex: /study/5)
  deckId = Number(this.route.snapshot.paramMap.get('id'));

  // --- A CORREÇÃO ESTÁ AQUI ---
  // Em vez de pegar uma vez só, usamos 'computed'.
  // Sempre que 'deckService.decks()' mudar (quando o supabase responder),
  // essa variável 'deck' vai recalcular e encontrar o baralho certo.
  deck = computed(() => {
    return this.deckService.decks().find(d => d.id === this.deckId);
  });

  currentCardIndex = signal(0);
  isFlipped = signal(false);
  isFinished = signal(false);

  // Computado: Qual é a carta atual?
  currentCard = computed(() => {
    const d = this.deck();
    // Verifica se o deck existe E se tem cartas dentro
    if (d && d.cards && d.cards.length > 0) {
      return d.cards[this.currentCardIndex()];
    }
    return null;
  });

  // Progresso (1/10)
  progress = computed(() => {
    const d = this.deck();
    if (!d || !d.cards || d.cards.length === 0) return '0 / 0';
    return `${this.currentCardIndex() + 1} / ${d.cards.length}`;
  });

  flipCard() {
    this.isFlipped.update(v => !v);
  }

  nextCard(isCorrect: boolean) {
    const d = this.deck();
    if (!d) return;

    // Salva o progresso no banco
    this.deckService.registerReview(isCorrect);

    if (this.currentCardIndex() < d.cards.length - 1) {
      this.isFlipped.set(false);
      setTimeout(() => {
        this.currentCardIndex.update(i => i + 1);
      }, 300);
    } else {
      this.isFinished.set(true);
    }
  }

  restart() {
    this.currentCardIndex.set(0);
    this.isFlipped.set(false);
    this.isFinished.set(false);
  }
}