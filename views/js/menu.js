let painelAtivo = null;

function abrirPainel(id) {
  const painel = document.getElementById(`painel-${id}`);

  // Se o painel clicado já está ativo, fecha-o
  if (painelAtivo === painel) {
    painel.classList.remove("ativo");
    painelAtivo = null;
  } else {
    // Fecha todos os outros painéis primeiro
    document.querySelectorAll(".painel").forEach(p => p.classList.remove("ativo"));

    // Abre o painel novo
    if (painel) { // Adiciona uma verificação para garantir que o elemento exista
      painel.classList.add("ativo");
      painelAtivo = painel;
    }
  }
}

// --- FUNÇÃO fecharPainel() ADICIONADA AQUI ---
function fecharPainel() {
  if (painelAtivo) {
    painelAtivo.classList.remove("ativo");
    painelAtivo = null;
  }
}
// --- FIM DA FUNÇÃO fecharPainel() ---


// Fecha o painel se clicar fora dele e do menu
document.addEventListener('click', function (event) {
  const cliqueDentroPainel = painelAtivo && painelAtivo.contains(event.target);
  const menuLateral = document.querySelector('.menu-lateral'); // Seleciona o menu lateral
  const cliqueNoMenu = menuLateral && menuLateral.contains(event.target); // Verifica se o clique foi dentro do menu lateral

  if (!cliqueDentroPainel && !cliqueNoMenu) {
    if (painelAtivo) {
      fecharPainel(); // Chama a função fecharPainel() para fechar o painel ativo
    }
  }
});
