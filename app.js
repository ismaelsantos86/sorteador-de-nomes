document.getElementById('nomeInput').focus();
let lista = [];

let btnAdicionar = document.getElementById('btnAdicionar');
btnAdicionar.addEventListener('click', adicionarNome);

let inputNome = document.getElementById('nomeInput');
inputNome.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarNome();
    }
});


function adicionarNome(){
    let nome = document.getElementById('nomeInput').value.trim().toUpperCase();
    if(nome === ""){
        alert('Adicione um nome');
    }else if(lista.includes(nome)) {
        alert('O nome digitado já consta na Lista');
        document.getElementById('nomeInput').value = "";
        return;
    }else{ 
        lista.push(nome);    
        atualizaTela()
        document.getElementById('nomeInput').value = "";
    }   
    document.getElementById('nomeInput').focus();
}


function atualizaTela(){
    let exibirNomes = ""
    for( let i = 0; i < lista.length; i++){
    exibirNomes += `<li>${lista[i]}
    <button onclick="removerNome(${i})" style="float: right; background: none; border: none; cursor: pointer; color: #ef4444; font-weight: bold;">❌</button></li>`;
    }
    document.getElementById('listaNomes').innerHTML= exibirNomes;
    document.getElementById('contador').innerHTML = lista.length;
}


function removerNome(indice){
    let confirma = confirm("Deseja excluir este nome da Lista?")
    if (confirma) {
        lista.splice(indice, 1);
        atualizaTela();
    }
}

let btnSortear = document.getElementById('btnSortear');
btnSortear.addEventListener('click', sortear);


function sortear(){
    if(lista.length < 2) {
        alert('Adicione mais nomes');
        return;
    }
        let indice = Math.floor(Math.random() * lista.length);
        document.getElementById('resultadoSorteio').innerHTML = `O sorteado foi ${lista[indice]}`;
        let elementoResultado = document.getElementById('resultadoSorteio');
        elementoResultado.style.display = 'block';
      
       confetti({
         particleCount: 500, // Quantidade de confetes
         spread: 70,         // Abertura da explosão
         origin: { y: 0.6 }  // Altura da tela de onde saem
        });
        
        alert(`O sorteado foi ${lista[indice]}!`);
    
        removerNome(indice);
      
    
}


let btnReiniciar = document.getElementById('btnReiniciar');
btnReiniciar.addEventListener('click', reiniciar);


function reiniciar(){
    let confirma = confirm("Tem certeza que deseja reinicar a Lista?");
   
    if(confirma) {
    lista = [];
    document.getElementById('contador').innerHTML = 0;
    document.getElementById('listaNomes').innerHTML= "";
    document.getElementById('resultadoSorteio').innerHTML = "";
    let ocultaResultado = document.getElementById('resultadoSorteio');
    ocultaResultado.style.display = 'none';
}
}