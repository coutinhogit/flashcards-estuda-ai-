import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeckService } from '../../core/services/deck';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  public deckService = inject(DeckService);
  public authService = inject(AuthService); // AGORA É PÚBLICO

  // Controla se está no INÍCIO ou MEUS BARALHOS
  currentView = signal<'HOME' | 'MY_DECKS'>('HOME');

  currentMode = signal<'VESTIBULAR' | 'FACULDADE'>('VESTIBULAR');
  
  // Menus e Modais
  isProfileMenuOpen = signal(false);
  isCreateModalOpen = signal(false);
  isAddCardModalOpen = signal(false);
  
  newDeckTitle = signal('');
  newDeckCategory = signal('VESTIBULAR');
  
  activeMenuDeckId = signal<number | null>(null);
  selectedDeckIdForAdd = signal<number | null>(null);
  newCardFront = signal('');
  newCardBack = signal('');

  allDecks = computed(() => this.deckService.decks());


  isSidebarCollapsed = signal(false);
  // --- FILTRO INTELIGENTE ---
  filteredDecks = computed(() => {
    const view = this.currentView();
    const decks = this.allDecks();


  

    if (view === 'MY_DECKS') {
      // Se estiver na aba Meus Baralhos, mostra SÓ os do usuário
      
      return decks;
    } else {
      // Se estiver no Início, filtra por categoria (Vestibular/Faculdade)
      return decks.filter(deck => deck.category === this.currentMode());
    }
  });

  // Muda a visualização (Início ou Meus Baralhos)
  setView(view: 'HOME' | 'MY_DECKS') {
    this.currentView.set(view);
  }

  setMode(mode: 'VESTIBULAR' | 'FACULDADE') {
    this.currentMode.set(mode);
    // Se mudar o modo, forçamos voltar para a Home pra ver os decks daquele modo
    this.setView('HOME');
  }

  // ... (O RESTO DO CÓDIGO PERMANECE IGUAL: toggleProfileMenu, Modais, Salvar, etc) ...

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(v => !v);
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }
  
  async logout() {
    await this.authService.signOut();
  }

  toggleDeckMenu(deckId: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.activeMenuDeckId() === deckId) {
      this.activeMenuDeckId.set(null);
    } else {
      this.activeMenuDeckId.set(deckId);
    }
  }

  closeDeckMenu() {
    this.activeMenuDeckId.set(null);
  }

  async deleteDeck(deckId: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if(confirm('Tem certeza que deseja excluir este baralho?')) {
        await this.deckService.deleteDeck(deckId);
    }
    this.closeDeckMenu();
  }

  openAddCardModal(deckId: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedDeckIdForAdd.set(deckId);
    this.newCardFront.set('');
    this.newCardBack.set('');
    this.isAddCardModalOpen.set(true);
    this.closeDeckMenu();
  }

  closeAddCardModal() {
    this.isAddCardModalOpen.set(false);
  }

  async saveNewCard() {
    const deckId = this.selectedDeckIdForAdd();
    const front = this.newCardFront();
    const back = this.newCardBack();

    if (deckId && front && back) {
      await this.deckService.addCard(deckId, front, back);
      this.closeAddCardModal();
    }
  }

  openCreateModal() {
    this.newDeckTitle.set('');
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  async saveNewDeck() {
    if (!this.newDeckTitle()) return;
    await this.deckService.createDeck(this.newDeckTitle(), this.newDeckCategory());
    
    // Se criou um deck, vai pra aba de Meus Baralhos pra ver ele? 
    // Ou vai pra categoria certa? Vamos manter a lógica anterior de categoria:
    if (this.newDeckCategory() === 'VESTIBULAR' || this.newDeckCategory() === 'FACULDADE') {
        this.setMode(this.newDeckCategory() as 'VESTIBULAR' | 'FACULDADE');
    }
    this.closeCreateModal();
  }
}