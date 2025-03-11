# Hub VIP

API para gerenciamento de clientes, tickets e faturamento.

## Requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local sem Docker)

## Configuração com Docker

### Executando a aplicação com Docker Compose

1. Clone o repositório
2. Execute o comando para iniciar os containers:

```bash
docker-compose up -d
```

3. A aplicação estará disponível em: http://localhost:3001

### Parando os containers

```bash
docker-compose down
```

## Desenvolvimento local sem Docker

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`

3. Inicie a aplicação:

```bash
npm run dev
```

## Endpoints disponíveis

- `/clientes` - Gerenciamento de clientes
- `/tickets` - Gerenciamento de tickets
- `/faturamento` - Gerenciamento de faturamento
- `/teste` - Endpoint de teste

## Construindo a imagem Docker manualmente

```bash
docker build -t hub-vip .
docker run -p 3001:3001 hub-vip
``` 