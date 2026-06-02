let totalCigarros = 0;
let totalRegistros = 0;

const formulario = document.getElementById("form-registro");
const campoQuantidade = document.getElementById("quantidade");
const campoObservacao = document.getElementById("observação");
const elementoTotalCigarros = document.getElementById("total-cigarros");
const elementoTotalRegistros = document.getElementById("total-registros");
const mensagemFormulario = document.getElementById("mensagem-formulário");

function registrarConsumo() {
    const quantidade = Number(campoQuantidade.value);
    const observacao = campoObservacao.value;

    if (!quantidade || quantidade <= 0) {
        mensagemFormulario.textContent = "Informe uma quantidade válida.";
        return;
    }

    totalCigarros = totalCigarros + quantidade;
    totalRegistros = totalRegistros + 1;

    elementoTotalCigarros.textContent = totalCigarros;
    elementoTotalRegistros.textContent = totalRegistros;

    mensagemFormulario.textContent =
        "Registro adicionado: " + quantidade + " cigarro(s).";

    console.log("Quantidade:", quantidade);
    console.log("Observação:", observacao);

    formulario.reset();
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    registrarConsumo();
});