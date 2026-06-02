const API_URL = "http://127.0.0.1:8000";

let totalCigarros = 0;
let totalRegistros = 0;

const formulario = document.getElementById("form-registro");
const campoQuantidade = document.getElementById("quantidade");
const campoObservacao = document.getElementById("observação");
const elementoTotalCigarros = document.getElementById("total-cigarros");
const elementoTotalRegistros = document.getElementById("total-registros");
const mensagemFormulario = document.getElementById("mensagem-formulário");
const listaRegistros = document.getElementById("lista-registros");

function carregarResumoHoje() {
    fetch(`${API_URL}/resumo/hoje`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            totalCigarros = dados.total_cigarros;
            totalRegistros = dados.total_registros;

            elementoTotalCigarros.textContent = totalCigarros;
            elementoTotalRegistros.textContent = totalRegistros;
        })
        .catch(function (erro) {
            console.error("Erro ao carregar resumo:", erro);
            mensagemFormulario.textContent = "Erro ao carregar resumo da API.";
        });
}

function carregarRegistrosHoje() {
    fetch(`${API_URL}/registros/hoje`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (registros) {
            listaRegistros.textContent = "";

            if (registros.length === 0) {
                const mensagem = document.createElement("p");
                mensagem.textContent = "Nenhum registro encontrado para hoje.";
                listaRegistros.appendChild(mensagem);
                return;
            }

            for (let i = 0; i < registros.length; i++) {
                const registro = registros[i];

                const itemRegistro = document.createElement("article");
                itemRegistro.classList.add("registro-item");

                const quantidade = document.createElement("p");
                quantidade.textContent = "Quantidade: " + registro.quantidade;

                const observacao = document.createElement("p");
                observacao.textContent = "Observação: " + registro.observacao;

                itemRegistro.appendChild(quantidade);
                itemRegistro.appendChild(observacao);

                listaRegistros.appendChild(itemRegistro);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao carregar registros:", erro);
            listaRegistros.textContent = "Erro ao carregar registros da API.";
        });
}

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

carregarResumoHoje();
carregarRegistrosHoje()
