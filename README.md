# 🎮 Site de Hospedagem de Jogos de Aprendizagem  

Uma plataforma interativa para ajudar as pessoas a aprenderem matemática básica através de jogos, com um sistema de ranking para estimular o progresso dos usuários.  

### ⚠️ Importante  

- Todos os arquivos `.html` devem ser convertidos para `.ejs`, pois utilizamos o EJS como motor de templates no Node.js.  
- Todos os arquivos estáticos (CSS, JS, imagens, etc.) devem ser armazenados dentro da pasta `public`.  
- As pastas `views/` e `public/` **já foram configuradas no `index.js`**, portanto, **não é necessário incluí-las ao referenciar arquivos**.  

### 📌 Exemplos de Referência Correta e Incorreta  

views/partials/head.ejs = errado
partials/head.ejs = certo

view/home.ejs = errado
home.ejs = certo

Ou seja, ao referenciar arquivos, mencione apenas a subpasta e o nome do arquivo, pois os diretórios views/ e public/ já estão pré-configurados.
