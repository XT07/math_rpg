# site de hospedagem de jogos teste
site para as pessoas aprenderem matemática básica com um sistema de ranking

### lembretes
Todos os arquivos que seriam .html mudem para .ejs pois ele eh um interpretador de html para node e todos os arquivos estaticos deverão ficar dentro da pasta public. qual quer arquivo dentro dessas pastas sitadas não precisarão ser sitadas os caminhos completos delas pois elas já forma configuradas no index.js e elas tem que ficar na raiz do projeto ex:

views/partials/head.ejs = errado
partials/head.ejs = certo

view/home.ejs = errado
home.ejs = certo

ou seja ou public e o views não precisam ser citados, apenas as subpastas
