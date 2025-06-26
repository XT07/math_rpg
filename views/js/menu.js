let painelAtivo = null;

function abrirPainel(id) {
    const imagemTituloContainer = document.querySelector('.ImagemTitulo');
    const btnJogar = document.getElementById('btnJogar');
    const telaJogo = document.getElementById('telaJogo');
    
    playClickSound(); // Toca som de clique ao abrir/fechar painéis

    if (id === 'inicio') {
        if (telaJogo) {
            telaJogo.classList.add('hidden');
            telaJogo.style.opacity = '0';
        }
        if (imagemTituloContainer) {
            imagemTituloContainer.classList.remove('hidden');
        }
        if (btnJogar) {
            btnJogar.classList.remove('hidden');
        }
        if (painelAtivo) {
            painelAtivo.classList.remove("ativo");
            painelAtivo = null;
        }
        return;
    }

    const painel = document.getElementById(`painel-${id}`);

    if (painelAtivo === painel) {
        painel.classList.remove("ativo");
        painelAtivo = null;
    } else {
        document.querySelectorAll(".painel").forEach(p => p.classList.remove("ativo"));
        if (painel) {
            painel.classList.add("ativo");
            painel.classList.add('iniciar-painel'); // Adiciona classe para animação, se desejar
            painelAtivo = painel;
        }
    }
}

function fecharPainel() {
    playClickSound(); // Toca som de clique ao fechar painel
    if (painelAtivo) {
        painelAtivo.classList.remove("ativo");
        // painelAtivo.classList.remove('iniciar-painel'); // Opcional: remover classe de animação
        painelAtivo = null;
    }
}

// Listener global para fechar painel clicando fora
document.addEventListener('click', function (event) {
    const cliqueDentroPainel = painelAtivo && painelAtivo.contains(event.target);
    const menuLateral = document.querySelector('.menu-lateral');
    const cliqueNoMenu = menuLateral && menuLateral.contains(event.target);

    // Se clicou fora do painel ativo E fora do menu lateral, fecha o painel
    if (painelAtivo && !cliqueDentroPainel && !cliqueNoMenu) {
        fecharPainel();
    }
});


let clickSound; 
let backgroundMusic; 

document.addEventListener('DOMContentLoaded', (event) => {
    const btnJogar = document.getElementById('btnJogar');
    const imagemTituloContainer = document.querySelector('.ImagemTitulo'); 
    const telaJogo = document.getElementById('telaJogo');

    backgroundMusic = document.getElementById('backgroundMusic');
    const toggleMusic = document.getElementById('toggleMusic');
    const volumeControl = document.getElementById('volume');
    const efeitosControl = document.getElementById('efeitos');

    // CORREÇÃO AQUI: Caminho e nome do arquivo do som de clique
    clickSound = new Audio('sfx/SomClique.wav'); 
    clickSound.volume = (efeitosControl ? efeitosControl.value / 100 : 0.7);

    // --- LÓGICA DE ÁUDIO NO CARREGAMENTO (Simplificada para sua decisão) ---
    if (backgroundMusic) {
        // Define o volume inicial da música (ela ainda está mutada pelo HTML por padrão)
        backgroundMusic.volume = (volumeControl ? volumeControl.value / 100 : 0.5);
        
        // Garante que a música está mutada e pausada no carregamento,
        // e o checkbox desmarcado (usuário precisará ativar)
        backgroundMusic.muted = true;
        backgroundMusic.pause(); // Garante que não está tocando
        if (toggleMusic) {
            toggleMusic.checked = false; // Checkbox começa desligado
        }
        console.log("Música de fundo iniciada em estado PAUSADO e MUTADO por padrão.");
    }
    // --- FIM DA LÓGICA DE ÁUDIO NO CARREGAMENTO ---


    // Listener para o toggle de música
    if (toggleMusic && backgroundMusic) {
        toggleMusic.addEventListener('change', () => {
            if (toggleMusic.checked) {
                backgroundMusic.muted = false; // Desmuta
                if (backgroundMusic.paused) { // Se estava pausada, tenta tocar
                    backgroundMusic.play().catch(e => console.error("Erro ao tocar música ao desmutar via checkbox:", e));
                }
            } else {
                backgroundMusic.muted = true; // Muta
                backgroundMusic.pause(); // Pausa explicitamente
            }
        });
    }

    // Listener para o controle de volume da música
    if (volumeControl && backgroundMusic) {
        volumeControl.addEventListener('input', () => {
            backgroundMusic.volume = volumeControl.value / 100;
            if (volumeControl.value > 0) {
                // Se volume é maior que zero e está mutado ou pausado, desmuta e tenta tocar
                if (backgroundMusic.muted || backgroundMusic.paused) {
                    backgroundMusic.muted = false;
                    backgroundMusic.play().catch(e => console.error("Erro ao tocar música ao ajustar volume:", e));
                }
                if(toggleMusic) toggleMusic.checked = true; // Marca o checkbox
            } else { // volumeControl.value == 0
                backgroundMusic.muted = true; // Muta
                if(toggleMusic) toggleMusic.checked = false; // Desmarca o checkbox
            }
        });
    }

    // Listener para o controle de volume dos efeitos
    if (efeitosControl && clickSound) {
        efeitosControl.addEventListener('input', () => {
            clickSound.volume = efeitosControl.value / 100;
        });
    }

    // Lógica para o botão "Jogar"
    if (btnJogar && imagemTituloContainer && telaJogo) {
        btnJogar.addEventListener('click', () => {
            playClickSound(); // Som de clique
            imagemTituloContainer.classList.add('hidden'); 
            btnJogar.classList.add('hidden');    
            telaJogo.classList.remove('hidden'); 
            telaJogo.style.opacity = '1';         
        });
    }

    // Adiciona som de clique ao botão "Salvar Configurações"
    const salvarConfigButton = document.querySelector('#painel-config button');
    if (salvarConfigButton) {
        salvarConfigButton.addEventListener('click', () => {
            playClickSound();
            fecharPainel();
        });
    }

    // Adiciona som de clique a todos os botões de fechar painel
    const fecharPainelButtons = document.querySelectorAll('.fechar-painel');
    fecharPainelButtons.forEach(button => {
        button.addEventListener('click', () => {
            playClickSound();
        });
    });

    // Adiciona som de clique aos itens do menu lateral
    const menuItems = document.querySelectorAll('.menu-lateral li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // A função abrirPainel() já chama playClickSound()
        });
    });
});

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0; // Reinicia o áudio
        clickSound.play().catch(e => console.error("Erro ao tocar som de clique:", e));
    }
}