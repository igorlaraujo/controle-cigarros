let totalCigarros = 0;
let totalRegistros = 0;

function registrarConsumo() {
    const campoQuantidade = document.getElementById("quantidade");
    const campoObservacao = document.getElementById("observacao");

    const quantidade = Number(campoQuantidade.value);
    const observacao = campoObservacao.value;

    totalCigarros = totalCigarros + quantidade;
    totalRegistros = totalRegistros + 1;

    document.getElementById("total-cigarros").textContent = totalCigarros;
    document.getElementById("total-registros").textContent = totalRegistros;
    document.getElementById("mensagem-formulario").textContent =
        "Registro adicionado: " + quantidade + " cigarro(s).";

    console.log("Quantidade: ", quantidade);
    console.log("Observacao: ", observacao);
}