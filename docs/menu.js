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
