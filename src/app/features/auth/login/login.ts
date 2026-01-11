import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  authService = inject(AuthService);

  name = '';
  email = '';
  password = '';

  isSignUp = false;
  errorMessage = '';

  async handleLogin() {
    this.errorMessage = '';

    if (this.isSignUp) {
      if (!this.name || !this.email || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos.';
        return;
      }

      const { data, error } = await this.authService.signUp(this.email, this.password, this.name);

      if (error) {
        this.errorMessage = 'Erro ao criar conta: ' + error.message;
      } else {
        if (data.user && !data.session) {
          this.toggleMode();
        } else {
          this.handleLoginAction();
        }
      }
    } else {
      this.handleLoginAction();
    }
  }

  async handleLoginAction() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha email e senha.';
      return;
    }

    const { error } = await this.authService.signIn(this.email, this.password);

    if (error) {
      if (!error.message.includes('Email not confirmed')) {
        this.errorMessage = 'Email ou senha incorretos.';
      }
    }
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }
}
