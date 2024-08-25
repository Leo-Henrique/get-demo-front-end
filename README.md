# Getdemo - front-end

<img 
  src="https://github.com/user-attachments/assets/10fd4ff0-fecb-48f3-a083-0f18b843a27f" 
  alt="Getdemo dashboard"
/>

## Principais features

Para dar um ar mais real, a minha ideia foi simular um dashboard, possibilitando gerenciar as demos de um usuário que estaria logado.

### Visualização das demos

<img 
  src="https://github.com/user-attachments/assets/5b72d4d1-e765-4330-879a-696ba11d4d33" 
  alt="Demos list"
/>

### Página de uma demo

<img 
  src="https://github.com/user-attachments/assets/10fd4ff0-fecb-48f3-a083-0f18b843a27f" 
  alt="Demo page"
/>

### Navegação dos frames

<img 
  src="https://github.com/user-attachments/assets/9c2255a1-9d6e-499c-b352-449a0a6b6bcc" 
  alt="Demo navigation"
/>

### Edição do frame com clique duplo no conteúdo

<img 
  src="https://github.com/user-attachments/assets/79b6131e-bb9d-4a32-94a1-862aa4667955" 
  alt="Demo navigation"
/>

### Principais tecnologias

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Instalação

### Back-end

Primeiro, siga as instruções de [instalação do back-end](https://github.com/Leo-Henrique/getdemo-back-end?tab=readme-ov-file#instala%C3%A7%C3%A3o).

### Clone o projeto

Use a mesma [forma de clonagem do repositório back-end](https://github.com/Leo-Henrique/getdemo-back-end?tab=readme-ov-file#clone-o-projeto), mas aponte para o repositório **https://github.com/Leo-Henrique/get-demo-front-end**.

### Instalar dependências do projeto

Na pasta do repositório:

```bash
pnpm install
```

### Rode o projeto

Com o back-end do projeto já rodando, rode o front-end:

```bash
pnpm start:dev
```

Você conseguirá acessar a interface em: [http://localhost:3000](http://localhost:3000)

#### Observações:

- Você primeiro deve rodar o [back-end do projeto](https://github.com/Leo-Henrique/getdemo-back-end) antes de rodar o front-end.
- Se você alterou a porta da api no back-end, altere também a variável `API_BASE_URL` localizada no arquivo `.env.local` no front-end.
- O Next.js possui por padrão um [cache](https://nextjs.org/docs/app/building-your-application/data-fetching/caching-and-revalidating) bem rígido com requisições HTTP para priorizar a performance do aplicativo. Se você modificou o banco de dados diretamente na api ou com algum tipo de IDE de banco do dados, exclua a pasta `.next` localizada na raiz do projeto ou copie e cole a seguinte linha no arquivo `src/app/layout.tsx` após as importações para ver as alterações:

```ts
export const revalidate = 0;
```
