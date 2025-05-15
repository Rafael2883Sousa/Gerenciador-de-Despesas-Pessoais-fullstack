# Gerenciador-de-Despesas-Pessoais-fullstack

📊 Gerenciador de Despesas Pessoais - Fullstack
Um sistema completo para controle financeiro pessoal, com autenticação segura, dashboard interativo e CRUD de transações.

Stack
Status

🚀 Funcionalidades
✅ Autenticação

Registro e login com JWT e cookies HTTP-only

Rotas protegidas por middleware

📊 Dashboard

Visualização de saldo total

Gráficos de receitas/despesas por categoria (em desenvolvimento)

💸 Transações

CRUD completo (Create, Read, Update, Delete)

Filtros por data e categoria

🛠️ Tecnologias
Frontend
Tecnologia	Uso
React + Vite	Interface dinâmica
Axios	Comunicação com a API
Context API	Gerenciamento de estado
Tailwind CSS	Estilização
Backend
Tecnologia	Uso
Node.js	Ambiente de execução
Express	Framework para API REST
MongoDB	Banco de dados NoSQL
Mongoose	Modelagem de dados
JWT + Bcrypt	Autenticação segura

Estrutura do Projeto

.
├── backend/               # API Node.js
│   ├── src/
│   │   ├── config/        # Configurações do banco e ambiente
│   │   ├── controllers/   # Lógica de negócio
│   │   ├── models/        # Schemas do MongoDB
│   │   └── routes/        # Endpoints da API
│   └── package.json
│
└── frontend/              # Aplicação React
    ├── src/
    │   ├── components/    # Componentes reutilizáveis
    │   ├── pages/         # Páginas da aplicação
    │   └── services/      # Chamadas à API
    └── package.json

