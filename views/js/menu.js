let painelAtivo = null;
let activeMenuItem = null;

// Temporary variables to hold settings before they are saved
let tempBackgroundVolume = 0.5; // Default value
let tempEffectsVolume = 0.3; // Default value
let tempMusicMuted = true; // Default value

let clickSound;
let backgroundMusic;

function abrirPainel(id) {
    const imagemTituloContainer = document.querySelector('.ImagemTitulo');
    const btnJogar = document.getElementById('btnJogar');
    const telaJogo = document.getElementById('telaJogo');
    const clickedMenuItem = document.querySelector(`.menu-lateral li[onclick*="abrirPainel('${id}')"]`);

    playClickSound();

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
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active-menu-item');
            activeMenuItem = null;
        }
        return;
    }

    const painel = document.getElementById(`painel-${id}`);

    if (painelAtivo === painel) {
        // Closing the currently active panel
        painel.classList.remove("ativo");
        painelAtivo = null;
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active-menu-item');
            activeMenuItem = null;
        }
    } else {
        // Opening a new panel
        document.querySelectorAll(".painel").forEach(p => p.classList.remove("ativo"));
        if (painel) {
            painel.classList.add("ativo");
            painel.classList.add('iniciar-painel');
            painelAtivo = painel;

            // Remove active class from previously active menu item
            if (activeMenuItem) {
                activeMenuItem.classList.remove('active-menu-item');
            }
            // Add active class to the clicked menu item
            if (clickedMenuItem) {
                clickedMenuItem.classList.add('active-menu-item');
                activeMenuItem = clickedMenuItem;
            }

            // If opening the config panel, initialize sliders with current *applied* values
            if (id === 'config') {
                const volumeControl = document.getElementById('volume');
                const efeitosControl = document.getElementById('efeitos');
                const toggleMusic = document.getElementById('toggleMusic');

                if (volumeControl && backgroundMusic) {
                    volumeControl.value = backgroundMusic.volume * 100;
                    tempBackgroundVolume = backgroundMusic.volume; // Set temp to current applied
                }
                if (efeitosControl && clickSound) {
                    efeitosControl.value = clickSound.volume * 100;
                    tempEffectsVolume = clickSound.volume; // Set temp to current applied
                }
                if (toggleMusic && backgroundMusic) {
                    toggleMusic.checked = !backgroundMusic.muted;
                    tempMusicMuted = backgroundMusic.muted; // Set temp to current applied mute state
                }
            }
        }
    }
}

function fecharPainel() {
    playClickSound();
    if (painelAtivo) {
        painelAtivo.classList.remove("ativo");
        painelAtivo = null;
    }
    if (activeMenuItem) {
        activeMenuItem.classList.remove('active-menu-item');
        activeMenuItem = null;
    }
}

document.addEventListener('click', function (event) {
    const cliqueDentroPainel = painelAtivo && painelAtivo.contains(event.target);
    const menuLateral = document.querySelector('.menu-lateral');
    const cliqueNoMenu = menuLateral && menuLateral.contains(event.target);


    if (painelAtivo && !cliqueDentroPainel && !cliqueNoMenu) {
        fecharPainel();
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    const btnJogar = document.getElementById('btnJogar');
    const imagemTituloContainer = document.querySelector('.ImagemTitulo');
    const telaJogo = document.getElementById('telaJogo');

    backgroundMusic = document.getElementById('backgroundMusic');
    const toggleMusic = document.getElementById('toggleMusic');
    const volumeControl = document.getElementById('volume');
    const efeitosControl = document.getElementById('efeitos');

    clickSound = new Audio('sfx/SomClique.wav');

    // Initialize actual audio volumes with their default temp values
    if (backgroundMusic) {
        backgroundMusic.volume = tempBackgroundVolume;
        backgroundMusic.muted = tempMusicMuted;
        if (toggleMusic) {
            toggleMusic.checked = !tempMusicMuted;
        }
        console.log("Música de fundo iniciada em estado PAUSADO e MUTADO por padrão.");
    }
    if (clickSound) {
        clickSound.volume = tempEffectsVolume;
    }


    if (toggleMusic && backgroundMusic) {
        toggleMusic.addEventListener('change', () => {
            tempMusicMuted = !toggleMusic.checked; // Update temporary mute state
        });
    }

    if (volumeControl) { // Only update temporary variable
        volumeControl.addEventListener('input', () => {
            tempBackgroundVolume = volumeControl.value / 100;
        });
    }

    if (efeitosControl) { // Only update temporary variable
        efeitosControl.addEventListener('input', () => {
            tempEffectsVolume = efeitosControl.value / 100;
        });
    }

    if (btnJogar && imagemTituloContainer && telaJogo) {
        btnJogar.addEventListener('click', () => {
            playClickSound(); // Som de clique
            imagemTituloContainer.classList.add('hidden');
            btnJogar.classList.add('hidden');
            telaJogo.classList.remove('hidden');
            telaJogo.style.opacity = '1';
        });
    }

    const salvarConfigButton = document.querySelector('#painel-config button');
    if (salvarConfigButton) {
        salvarConfigButton.addEventListener('click', () => {
            // Apply saved settings here!
            if (backgroundMusic) {
                backgroundMusic.volume = tempBackgroundVolume;
                backgroundMusic.muted = tempMusicMuted;
                if (!backgroundMusic.muted && backgroundMusic.paused) {
                    backgroundMusic.play().catch(e => console.error("Erro ao tocar música ao salvar configurações:", e));
                } else if (backgroundMusic.muted && !backgroundMusic.paused) {
                     backgroundMusic.pause(); // Pause if muted and currently playing
                }
            }
            if (clickSound) {
                clickSound.volume = tempEffectsVolume;
            }

            playClickSound(); // Play click sound after applying settings
            fecharPainel();
        });
    }

    const fecharPainelButtons = document.querySelectorAll('.fechar-painel');
    fecharPainelButtons.forEach(button => {
        button.addEventListener('click', () => {
            playClickSound();
        });
    });

    // Add click sound to lateral menu items
    const menuItems = document.querySelectorAll('.menu-lateral li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // The playClickSound() call is now handled inside abrirPainel and fecharPainel
            // for more precise control based on panel state.
        });
    });
});

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.error("Erro ao tocar som de clique:", e));
    }
}