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
const modalConfirmacao = document.getElementById("modal-confirmação");
const botaoConfirmarExclusao = document.getElementById("botao-confirmar-exclusao");
const botaoCancelarExclusao = document.getElementById("botao-cancelar-exclusao");

let idRegistroParaExcluir = null;


function exibirMensagemFormulario(texto, tipo) {
    mensagemFormulario.textContent = texto;

    mensagemFormulario.classList.remove("mensagem-sucesso", "mensagem-erro");

    if (tipo === "sucesso") {
        mensagemFormulario.classList.add("mensagem-sucesso");
    } else if (tipo === "erro") {
        mensagemFormulario.classList.add("mensagem-erro");
    }
}

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
            exibirMensagemFormulario("Erro ao carregar resumo da API.", "erro");
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

            for (let i = registros.length - 1; i >= 0; i--) {
                const registro = registros[i];

                const itemRegistro = document.createElement("article");
                itemRegistro.classList.add("registro-item");

                const dataHora = new Date(registro.data_hora);

                const horario = document.createElement("p");
                horario.textContent = "Horário: " + dataHora.toLocaleString("pt-BR");

                const quantidade = document.createElement("p");
                quantidade.textContent = "Quantidade: " + registro.quantidade;

                const observacao = document.createElement("p");

                if (registro.observacao) {
                    observacao.textContent = "Observação: " + registro.observacao;
                } else {
                    observacao.textContent = "Observação: sem observação.";
                }

                const botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.classList.add("botao-excluir");

                botaoExcluir.addEventListener("click", function () {
                    abrirModalExclusao(registro.id);
                });

                itemRegistro.appendChild(horario);
                itemRegistro.appendChild(quantidade);
                itemRegistro.appendChild(observacao);
                itemRegistro.appendChild(botaoExcluir);

                listaRegistros.appendChild(itemRegistro);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao carregar registros:", erro);
            listaRegistros.textContent = "Erro ao carregar registros da API.";
        });
}

function abrirModalExclusao(idRegistro) {
    idRegistroParaExcluir = idRegistro;
    modalConfirmacao.classList.remove("oculto");
}

function fecharModalExclusao() {
    idRegistroParaExcluir = null;
    modalConfirmacao.classList.add("oculto");
}

function confirmarExclusaoRegistro() {
    if (!idRegistroParaExcluir) {
        return;
    }

    fetch(`${API_URL}/registros/${idRegistroParaExcluir}`, {
        method: "DELETE"
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro ao excluir registro.");
            }

            return resposta.json();
        })
        .then(function () {
            exibirMensagemFormulario("Registro excluído com sucesso.", "sucesso");

            fecharModalExclusao();

            carregarResumoHoje();
            carregarRegistrosHoje();
        })
        .catch(function (erro) {
            console.error("Erro ao excluir registro:", erro);
            exibirMensagemFormulario("Erro ao excluir registro na API.", "erro");
            fecharModalExclusao();
        });
}

function registrarConsumo() {
    const quantidade = Number(campoQuantidade.value);
    const observacao = campoObservacao.value;

    if (!quantidade || quantidade <= 0) {
        exibirMensagemFormulario("Informe uma quantidade válida.","erro");
        return;
    }

    const dadosRegistro = {
        quantidade: quantidade,
        observacao: observacao
    };

    fetch(`${API_URL}/registros`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosRegistro)
    })
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (registroCriado) {
            exibirMensagemFormulario(
                "Registro salvo com sucesso: " + registroCriado.quantidade + " cigarro(s).",
                "sucesso"
            );

            formulario.reset();

            carregarResumoHoje();
            carregarRegistrosHoje();

            console.log("Registro criado:", registroCriado);
        })
        .catch(function (erro) {
            console.error("Erro ao salvar registro:", erro);
            exibirMensagemFormulario("Erro ao salvar registro na API.", "erro");
        });
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    registrarConsumo();
});

botaoConfirmarExclusao.addEventListener("click", function () {
    confirmarExclusaoRegistro();
});

botaoCancelarExclusao.addEventListener("click", function () {
    fecharModalExclusao();
});

modalConfirmacao.addEventListener("click", function (event) {
    if (event.target === modalConfirmacao) {
        fecharModalExclusao();
    }
});

carregarResumoHoje();
carregarRegistrosHoje()
