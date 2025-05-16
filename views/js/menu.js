let painelAtivo = null;

function abrirPainel(id) {
  const painel = document.getElementById(`painel-${id}`);

  // Se já está aberto, fecha
  if (painelAtivo === painel) {
    painel.classList.remove("ativo");
    painelAtivo = null;
  } else {
    // Fecha os outros
    document.querySelectorAll(".painel").forEach(p => p.classList.remove("ativo"));

    // Abre o painel novo
    painel.classList.add("ativo");
    painelAtivo = painel;
  }
}

// Fecha o painel se clicar fora dele e do menu
document.addEventListener('click', function (event) {
  const cliqueDentroPainel = painelAtivo && painelAtivo.contains(event.target);
  const cliqueNoMenu = event.target.closest('.menu-lateral');

  if (!cliqueDentroPainel && !cliqueNoMenu) {
    if (painelAtivo) {
      painelAtivo.classList.remove("ativo");
      painelAtivo = null;
    }
  }
});

function iniciarJogo() {
  // Esconde o botão "JOGAR"
  document.getElementById('botaoJogar').style.display = 'none';

  // Mostra a área do jogo
  document.getElementById('telaJogo').style.display = 'flex'; // ou block, conforme seu css

  // Ativa a classe tela-ativa no container principal (.conteudo)
  document.querySelector('.conteudo').classList.add('tela-ativa');
}

// Se quiser, pode criar uma função para voltar (exemplo)
function sairJogo() {
  document.getElementById('botaoJogar').style.display = 'inline-block';
  document.getElementById('telaJogo').style.display = 'none';
  document.querySelector('.conteudo').classList.remove('tela-ativa');
}
