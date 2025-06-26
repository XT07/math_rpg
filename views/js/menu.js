let painelAtivo = null;

function abrirPainel(id) {
    const painel = document.getElementById(`painel-${id}`);

    if (painelAtivo === painel) {
        painel.classList.remove("ativo");
        painelAtivo = null;
    } else {
        document.querySelectorAll(".painel").forEach(p => p.classList.remove("ativo"));

        if (painel) {
            painel.classList.add("ativo");
            painelAtivo = painel;
        }
    }
}

function fecharPainel() {
    if (painelAtivo) {
        painelAtivo.classList.remove("ativo");
        painelAtivo = null;
    }
}

document.addEventListener('click', function (event) {
    const cliqueDentroPainel = painelAtivo && painelAtivo.contains(event.target);
    const menuLateral = document.querySelector('.menu-lateral');
    const cliqueNoMenu = menuLateral && menuLateral.contains(event.target);

    if (!cliqueDentroPainel && !cliqueNoMenu) {
        if (painelAtivo) {
            fecharPainel();
        }
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const btnJogar = document.getElementById('btnJogar');
    const imagemTituloContainer = document.querySelector('.ImagemTitulo'); 
    const telaJogo = document.getElementById('telaJogo');

    if (btnJogar && imagemTituloContainer && telaJogo) {
        btnJogar.addEventListener('click', () => {
            imagemTituloContainer.classList.add('hidden'); 
            btnJogar.classList.add('hidden');    
            telaJogo.classList.remove('hidden'); 
            telaJogo.style.opacity = '1';        
        });
    }
});