let lista = [];

document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.getElementById('nomeInput');
    const btnAdicionar = document.getElementById('btnAdicionar');
    const btnSortear = document.getElementById('btnSortear');
    const btnReiniciar = document.getElementById('btnReiniciar');

    if (btnAdicionar) btnAdicionar.addEventListener('click', adicionarNome);
    if (btnSortear) btnSortear.addEventListener('click', sortear);
    if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciar);

    if (inputNome) {
        inputNome.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') adicionarNome();
        });
        inputNome.focus();
    }
});

function adicionarNome() {
    let inputNome = document.getElementById('nomeInput');
    let nome = inputNome.value.trim().toUpperCase();
    
    if (nome === "") {
        abrirModalAlerta("Atenção", "Por favor, digite um nome válido.");
        return;
    }
    
    if (lista.includes(nome)) {
        abrirModalAlerta("Atenção!", "O nome digitado já consta na Lista.");
        inputNome.value = "";
        inputNome.focus();
        return;
    }
    
    lista.push(nome);    
    atualizaTela();
    inputNome.value = "";
    inputNome.focus();
}

function atualizaTela() {
    let exibirNomes = "";
    for (let i = 0; i < lista.length; i++) {
        exibirNomes += `<li>${lista[i]}
        <button onclick="removerNome(${i})" style="float: right; background: none; border: none; cursor: pointer; color: #ef4444; font-weight: bold;">❌</button></li>`;
    }
    document.getElementById('listaNomes').innerHTML = exibirNomes;
    document.getElementById('contador').innerHTML = lista.length;
}

// Chamado diretamente pelo botão "X" da lista
function removerNome(indice) {
    abrirModalConfirmacao(
        "Excluir Participante", 
        "Tem certeza que deseja remover este nome da lista?", 
        function() {
            lista.splice(indice, 1);
            atualizaTela();
        }
    );
}

function sortear() {
    if (lista.length < 2) {
        abrirModalAlerta("Atenção", "Adicione pelo menos 2 nomes para realizar o sorteio!");
        return;
    }
    
    let indice = Math.floor(Math.random() * lista.length);
    let nomeSorteado = lista[indice];
    
    let elementoResultado = document.getElementById('resultadoSorteio');
    elementoResultado.innerHTML = `O sorteado foi ${nomeSorteado}`;
    elementoResultado.style.display = 'block';
  
    if (typeof confetti === 'function') {
        confetti({ particleCount: 500, spread: 70, origin: { y: 0.6 } });
    }
    
    abrirModalAlerta("🎉 Resultado do Sorteio", `O sorteado foi: ${nomeSorteado}!`);

    lista.splice(indice, 1);
    atualizaTela()
}

function reiniciar() {
    abrirModalConfirmacao(
        "Reiniciar Lista", 
        "Tem certeza que deseja apagar todos os nomes?", 
        function() {
            lista = [];
            atualizaTela();
            let elResultado = document.getElementById('resultadoSorteio');
            elResultado.innerHTML = "";
            elResultado.style.display = 'none';
        }
    );
}

// --- CONTROLE DOS MODAIS ---

function abrirModalAlerta(titulo, mensagem) {
    const modal = document.getElementById('meuModal');
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalMensagem').textContent = mensagem;

    // Esconde o botão "Cancelar" e transforma o "Confirmar" em um botão de OK simples
    const btnNao = document.getElementById('modalBtnNao');
    const btnSim = document.getElementById('modalBtnSim');

    btnNao.style.display = 'none';
    btnSim.textContent = 'OK';
    btnSim.className = ''; // Remove classe de perigo para usar padrão
    btnSim.style.backgroundColor = 'var(--primary-color)';

    btnSim.onclick = function() {
        modal.close();
    };

    modal.showModal();
}

function abrirModalConfirmacao(titulo, mensagem, funcaoCallback) {
    const modal = document.getElementById('meuModal');
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalMensagem').textContent = mensagem;

    const btnNao = document.getElementById('modalBtnNao');
    const btnSim = document.getElementById('modalBtnSim');

    // Restaura os dois botões para confirmação
    btnNao.style.display = 'inline-block';
    btnSim.textContent = 'Confirmar';
    btnSim.className = 'btn-primario'; // Aplica cor de perigo/confirmação
    btnSim.style.backgroundColor = ''; 

    // Se clicar em Confirmar: fecha o modal e roda a função (ex: remover da lista)
    btnSim.onclick = function() {
        modal.close();
        if (typeof funcaoCallback === 'function') {
            funcaoCallback();
        }
    };

    // Se clicar em Cancelar: apenas fecha
    btnNao.onclick = function() {
        modal.close();
    };

    modal.showModal();
}