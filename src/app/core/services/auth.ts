import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService).client;
  private router = inject(Router);

  currentUser = signal<User | null>(null);

  constructor() {
    this.supabase.auth.getUser().then(({ data }) => {
      this.currentUser.set(data.user);
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.currentUser.set(session.user);
      } else {
        this.currentUser.set(null);
      }
    });
  }

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (error) {
      alert('Erro ao cadastrar: ' + error.message);
      return { error };
    }

    if (data.user && !data.session) {
      alert(
        '✅ Cadastro realizado com sucesso!\n\nACESSE SEU E-MAIL AGORA e clique no link para ativar sua conta.'
      );
    }

    return { data, error: null };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        alert(
          '🔒 Conta ainda não ativada! Verifique seu e-mail (e a caixa de spam) para confirmar o cadastro antes de entrar.'
        );
      } else {
        alert('Erro ao entrar: ' + error.message);
      }
      return { error };
    }

    if (data.user) {
      this.router.navigate(['/dashboard']);
    }

    return { data, error: null };
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/login']);
  }
}
