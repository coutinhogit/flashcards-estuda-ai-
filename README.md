# 🗂️ FlashCards.ai - MVP

![Preview do Projeto](https://i.ibb.co/xp0zdC2/Captura-de-tela-2026-01-11-155628.png)

## 🔗 Acesse o Projeto
 **Link Online:** [FlashCards.Ai](https://flash-cards-estuda-ai-fn7j-8rg1bq77g-coutinhos-projects.vercel.app/login)

## 📌 Objetivo do Projeto FlashCards(Estuda.ai)
O projeto surgiu como uma tentativa de trazer a democratização do acesso ao ensino(onde muitos falam e poucos agem), e tentar trazer métodos de estudos dinâmicos para estudantes de vestibulares de todo o Brasil e todas as classes, o *FlashCards -  Estuda.ai* é o primeiro de muitos projetos da iniciativa a qual eu batizei como *Estuda.ai* que ainda vão surgir de minha autoria para tentar trazer o acesso à educação de forma equânime no nosso país! Além disso também deixei disponível uma versão para quem ja está na Faculdade/Universidade, porém gosta de estudar com os famigerados "FlashCards", portanto sinta-se livre para usar como bem entender!




![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 📌 Sobre este Repositório
Este repositório foi criado especificamente para **documentar o processo de criação** e servir como a vitrine pública do projeto **FlashCards.ai**. 

> **Nota de Segurança:** Este código é um espelho de um repositório de desenvolvimento privado. O histórico de commits foi reiniciado e as chaves de API (`environments`) foram omitidas do controle de versão para proteção de dados, sendo injetadas dinamicamente via Vercel durante o deploy.

---

## 🚀 Tecnologias e Arquitetura

* **Frontend:** [Angular 19+](https://angular.io/) utilizando **Signals** para gerenciamento de estado reativo e alta performance.
* **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL) para persistência de dados e autenticação segura de usuários.
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) para uma interface limpa, moderna e totalmente responsiva.
* **Infraestrutura:** [Vercel](https://vercel.com/) para hospedagem e automação de CI/CD.
* **Linguagem:** TypeScript para garantir código robusto e escalável.

---

## 📸 Screenshots do Projeto

Abaixo, os registros da interface e fluxo de usuário no estado atual do MVP:

| Dashboard | Meus Baralhos |
| :--- | :--- |
| ![Dashboard](https://i.ibb.co/DD83Wyqs/Captura-de-tela-2026-01-11-160033.png) | ![Meus Baralhos](https://i.ibb.co/xtq0W1f0/Captura-de-tela-2026-01-11-160124.png) |
| *Visão geral do progresso e métricas de estudo* | *Gerenciamento e organização de matérias* |

| Estudo Ativo | Cadastro de Cards |
| :--- | :--- |
| ![Sessão](https://i.ibb.co/dsfwyS2v/Captura-de-tela-2026-01-11-160304.png) | ![Cards](https://i.ibb.co/VpNMjrP8/Captura-de-tela-2026-01-11-160408.png) |
| *Interface dos cards* | *Fluxo de criação rápida de novos conteúdos* |

---

## 🛠️ Funcionalidades Implementadas

* **Autenticação Dinâmica:** Login e cadastro com extração automática de metadados para saudação personalizada.
* **Gerenciamento de Decks:** CRUD completo para criação, listagem e exclusão de baralhos de estudo.
* **Sistema de Cards:** Adição de cartões com frente e verso integrados ao banco de dados em tempo real.
* **Métricas de Aprendizagem:** Cálculo de taxa de acerto e nível de maestria baseado no histórico de revisões.
* **Segurança (RLS):** Proteção de dados no banco garantindo que cada usuário acesse apenas seus próprios baralhos.

---

## ⚙️ Como configurar (Desenvolvimento)

Como os arquivos de configuração foram ocultados por segurança, siga estes passos para rodar localmente:

1.  **Clonar:** `git clone https://github.com/seu-usuario/flashcards-ai.git`
2.  **Instalar:** `npm install`
3.  **Ambiente:** Crie a pasta `src/environments/` e adicione o arquivo `environment.ts` com suas chaves do Supabase.
4.  **Executar:** `ng serve`

---
*Projeto desenvolvido como parte do portfólio de aplicações de Tecnologia Educacional.*
