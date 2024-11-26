# EasyRide

## Descrição

Este é um projeto full-stack para estimativa de viagens.
Ele utiliza **Next.js** no front-end, **Node.js** no back-end, **PostgreSQL** para o banco de dados e **Prisma** como ORM. A aplicação é completamente containerizada usando **Docker** e integra a **Google Maps API** para funcionalidades relacionadas a endereços e rotas.



## Tecnologias Utilizadas 

- Next.js
- Node.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- Docker
- Google Maps API


## Pré-requisitos

- **Docker** e **Docker Compose** instalados.
- **Chave de API do Google Maps** configurada no arquivo `.env`.

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <EasyRide>
   ```
2. Configuração do .env: Crie um arquivo .env na raiz do projeto com base no .env.example:
    ```bash
    GOOGLE_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    ```
3. Construção e execução do projeto com Docker: Certifique-se de que o Docker está instalado e em execução, e execute:
    ```bash
    docker-compose up --build
    ```
4. Acesso à aplicação:
    - Acesse o front-end no navegador em: http://localhost:80.
    - O back-end estará disponível em: http://localhost:8080.

## Comandos Úteis

- Para reiniciar os serviços:
    ```bash
    docker-compose restart
    ```
- Para parar os serviços:
    ```bash
    docker-compose down
    ```