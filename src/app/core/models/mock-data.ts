export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export interface Deck {
  id: number;
  title: string;
  category: 'VESTIBULAR' | 'FACULDADE';
  cards: Flashcard[];
}

export const MOCK_DECKS: Deck[] = [
  {
    id: 1,
    title: 'História do Brasil',
    category: 'VESTIBULAR',
    cards: [
      { id: 1, question: 'Quem descobriu o Brasil?', answer: 'Pedro Álvares Cabral' },
      { id: 2, question: 'Em que ano foi a independência?', answer: '1822' },
      { id: 3, question: 'Qual foi o movimento que aconteceu no Sul de Revolta Colonial?', answer: 'Farrapos' }
    ]
  },
  {
    id: 2,
    title: 'Anatomia Humana',
    category: 'FACULDADE',
    cards: [
      { id: 1, question: 'Qual o maior osso do corpo?', answer: 'Fêmur' },
      { id: 2, question: 'Quantos dentes tem um adulto?', answer: '32' }
    ]
  }
];