let listaNumerosSorteados = []; // Criação de um array
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();


// Exemplode função básica para colocar um texto dentro de uma tag HTML
function exibirTextoNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", 
    {rate: 1.2});
}

function exibirMensagemInicial()
{
    let titulo = document.querySelector("h1"); // document.querySelector --> Seleciona um elemento do documento.
    titulo.innerHTML = "Jogo do número secreto"; // innerHTML --> Acessa o titulo, que está no HTML.
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

function verificarChute()
{
    let chute = document.querySelector("input").value; // .value --> pega o valor de um elemento HTML
    
    if (chute == numeroSecreto)
    {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela("p", mensagemTentativas);

        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else if (chute > numeroSecreto)
    {
        exibirTextoNaTela("p", "O número secreto é menor do que o chute");
        tentativas++;
        limparCampo();
    }
    else 
    {
        exibirTextoNaTela("p", "O número secreto é maior do que o chute");
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio()
{
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite)
    {
        listaNumerosSorteados == [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido))
    {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return gerarNumeroAleatorio(); // Recursão --> A função chama ela novamente, devido a situação.
    }
    else
    {
        return numeroEscolhido;
    }
    
}

function limparCampo()
{
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo()
{
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}