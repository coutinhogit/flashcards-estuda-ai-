import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/services/supabase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  supabaseService = inject(SupabaseService);

  async ngOnInit() {
    console.log('--- INICIANDO TESTE DO SUPABASE ---'); 

    try {
      const { data, error } = await this.supabaseService.client
        .from('decks')
        .select('*');

      if (error) {
        console.error('ERRO NO SUPABASE:', error); 
      } else {
        console.log('SUCESSO! DADOS RECEBIDOS:', data); 
      }
    } catch (e) {
      console.error('ERRO CRÍTICO:', e);
    }
  }
}
