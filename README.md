# 🎮 Site de Hospedagem de Jogos de Aprendizagem  

Plataforma interativa para o aprendizado de matemática básica por meio de um jogo com elementos de RPG. Os usuários podem testar seus conhecimentos, acompanhar seu desempenho e competir em um sistema de ranking em tempo real.  

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
