// ==========================================
// CARRINHO DA ÁUREA
// Eu cuido aqui de adicionar produtos,
// controlar quantidades, pagamento e finalizar
// o pedido pelo WhatsApp.
// Também abro o carrinho como um painel lateral.
// ==========================================


// Eu uso outro nome para a constante neste arquivo
// para não entrar em conflito com o script.js.
const CHAVE_CARRINHO_LOCAL = "aureaCarrinho";

const NUMERO_WHATSAPP = "5511992958541";


// ==========================================
// RECUPERAR CARRINHO
// ==========================================

function obterCarrinho() {

    try {

        const carrinhoSalvo =
            localStorage.getItem(CHAVE_CARRINHO_LOCAL);

        if (!carrinhoSalvo) {
            return [];
        }

        const carrinho =
            JSON.parse(carrinhoSalvo);

        return Array.isArray(carrinho)
            ? carrinho
            : [];

    } catch (erro) {

        console.error(
            "Não foi possível carregar o carrinho.",
            erro
        );

        return [];

    }

}


// ==========================================
// SALVAR CARRINHO
// ==========================================

function salvarCarrinho(carrinho) {

    localStorage.setItem(
        CHAVE_CARRINHO_LOCAL,
        JSON.stringify(carrinho)
    );

    atualizarContadorCarrinho();

}


// ==========================================
// FORMATAÇÃO DE PREÇO
// ==========================================

function formatarPreco(valor) {

    return Number(valor || 0)
        .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

}


// ==========================================
// TOTAL DO CARRINHO
// ==========================================

function calcularTotal(carrinho) {

    return carrinho.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.preco) *
                    Number(item.quantidade)
                );

        },
        0
    );

}


// ==========================================
// CRIAR IDENTIFICADOR DO ITEM
// Eu uso produto + cor + tamanho + pagamento
// para diferenciar corretamente cada escolha.
// ==========================================

function criarIdItem(
    produto,
    cor,
    tamanho,
    pagamento = "Pix"
) {

    return [
        produto.slug || gerarSlug(produto.nome),
        cor,
        tamanho,
        pagamento
    ]
        .join("|")
        .toLowerCase();

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function adicionarAoCarrinho(
    produto,
    cor,
    tamanho,
    quantidade = 1,
    pagamento = "Pix"
) {

    const carrinho =
        obterCarrinho();


    const preco =
        pagamento === "Cartão"
            ? Number(produto.precoCartao)
            : Number(produto.precoPix);


    const id =
        criarIdItem(
            produto,
            cor.nome,
            tamanho,
            pagamento
        );


    const itemExistente =
        carrinho.find(
            item => item.id === id
        );


    if (itemExistente) {

        itemExistente.quantidade +=
            Number(quantidade);

    } else {

        carrinho.push({

            id,

            produtoSlug:
                produto.slug ||
                gerarSlug(produto.nome),

            nome:
                produto.nome,

            categoria:
                produto.categoria,

            cor:
                cor.nome,

            tamanho:
                tamanho,

            quantidade:
                Number(quantidade),

            pagamento:
                pagamento,

            preco:
                preco,

            imagem:
                cor.imagens?.[0] || ""

        });

    }


    salvarCarrinho(carrinho);


    mostrarAvisoCarrinho(
        "Produto adicionado ao carrinho ✨"
    );


    abrirCarrinho();

}


// ==========================================
// CONTADOR DO CARRINHO
// ==========================================

function atualizarContadorCarrinho() {

    const contador =
        document.querySelector(
            ".contador-carrinho"
        );


    if (!contador) {
        return;
    }


    const carrinho =
        obterCarrinho();


    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + Number(item.quantidade || 0),
            0
        );


    contador.textContent =
        quantidadeTotal;


    contador.classList.toggle(
        "visivel",
        quantidadeTotal > 0
    );

}


// ==========================================
// AVISO
// ==========================================

function mostrarAvisoCarrinho(mensagem) {

    let aviso =
        document.querySelector(
            ".aviso-carrinho"
        );


    if (!aviso) {

        aviso =
            document.createElement("div");

        aviso.className =
            "aviso-carrinho";

        document.body.appendChild(aviso);

    }


    aviso.textContent =
        mensagem;


    aviso.classList.add("ativo");


    clearTimeout(
        window.timerAvisoCarrinho
    );


    window.timerAvisoCarrinho =
        setTimeout(() => {

            aviso.classList.remove(
                "ativo"
            );

        }, 2200);

}


// ==========================================
// CRIAR PAINEL LATERAL
// ==========================================

function criarPainelCarrinho() {

    if (
        document.querySelector(
            ".carrinho-lateral"
        )
    ) {
        return;
    }


    const overlay =
        document.createElement("div");


    overlay.className =
        "carrinho-overlay";


    const painel =
        document.createElement("aside");


    painel.className =
        "carrinho-lateral";


    painel.setAttribute(
        "aria-hidden",
        "true"
    );


    painel.innerHTML = `

        <div class="carrinho-lateral-cabecalho">

            <div>

                <span class="carrinho-lateral-subtitulo">
                    ÁUREA
                </span>

                <h2>
                    Seu carrinho
                </h2>

            </div>


            <button
                type="button"
                class="carrinho-fechar"
                aria-label="Fechar carrinho"
            >
                ×
            </button>

        </div>


        <div
            class="carrinho-lateral-conteudo"
            id="carrinho-lateral-conteudo"
        ></div>


        <div
            class="carrinho-lateral-rodape"
            id="carrinho-lateral-rodape"
        ></div>

    `;


    document.body.appendChild(
        overlay
    );


    document.body.appendChild(
        painel
    );


    overlay.addEventListener(
        "click",
        fecharCarrinho
    );


    painel
        .querySelector(".carrinho-fechar")
        .addEventListener(
            "click",
            fecharCarrinho
        );


    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key === "Escape"
            ) {

                fecharCarrinho();

            }

        }
    );


    renderizarCarrinhoLateral();

}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    criarPainelCarrinho();


    renderizarCarrinhoLateral();


    const overlay =
        document.querySelector(
            ".carrinho-overlay"
        );


    const painel =
        document.querySelector(
            ".carrinho-lateral"
        );


    if (!overlay || !painel) {
        return;
    }


    document.body.classList.add(
        "carrinho-aberto"
    );


    overlay.classList.add(
        "ativo"
    );


    painel.classList.add(
        "aberto"
    );


    painel.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    const overlay =
        document.querySelector(
            ".carrinho-overlay"
        );


    const painel =
        document.querySelector(
            ".carrinho-lateral"
        );


    if (!overlay || !painel) {
        return;
    }


    overlay.classList.remove(
        "ativo"
    );


    painel.classList.remove(
        "aberto"
    );


    painel.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "carrinho-aberto"
    );

}


// ==========================================
// RENDERIZAR CARRINHO
// ==========================================

function renderizarCarrinhoLateral() {

    const conteudo =
        document.querySelector(
            "#carrinho-lateral-conteudo"
        );


    const rodape =
        document.querySelector(
            "#carrinho-lateral-rodape"
        );


    if (!conteudo || !rodape) {
        return;
    }


    const carrinho =
        obterCarrinho();


    if (carrinho.length === 0) {

        conteudo.innerHTML = `

            <div class="carrinho-lateral-vazio">

                <div class="carrinho-lateral-vazio-icone">
                    🛍️
                </div>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Escolha uma peça da coleção
                    para começar seu pedido.
                </p>

                <a
                    href="colecao.html"
                    class="botao-principal"
                >
                    Ver coleção
                </a>

            </div>

        `;


        rodape.innerHTML = "";

        return;

    }


    conteudo.innerHTML =
        carrinho.map(
            (item, indice) => {

                const subtotal =
                    Number(item.preco) *
                    Number(item.quantidade);


                return `

                    <article
                        class="item-carrinho-lateral"
                    >

                        <div
                            class="item-carrinho-lateral-imagem"
                        >

                            <img
                                src="${item.imagem}"
                                alt="${item.nome}"
                            >

                        </div>


                        <div
                            class="item-carrinho-lateral-info"
                        >

                            <span>
                                ${item.categoria || ""}
                            </span>


                            <h3>
                                ${item.nome}
                            </h3>


                            <p>
                                Cor: ${item.cor}
                            </p>


                            <p>
                                Tamanho: ${item.tamanho}
                            </p>


                            <p>
                                Pagamento: ${item.pagamento || "Pix"}
                            </p>


                            <strong>
                                ${formatarPreco(subtotal)}
                            </strong>


                            <div
                                class="item-carrinho-lateral-acoes"
                            >

                                <div
                                    class="controle-quantidade-lateral"
                                >

                                    <button
                                        type="button"
                                        data-acao="diminuir"
                                        data-indice="${indice}"
                                        aria-label="Diminuir quantidade"
                                    >
                                        −
                                    </button>


                                    <span>
                                        ${item.quantidade}
                                    </span>


                                    <button
                                        type="button"
                                        data-acao="aumentar"
                                        data-indice="${indice}"
                                        aria-label="Aumentar quantidade"
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    type="button"
                                    class="remover-item-lateral"
                                    data-acao="remover"
                                    data-indice="${indice}"
                                >
                                    Remover
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            }
        ).join("");


    const total =
        calcularTotal(carrinho);


    rodape.innerHTML = `

        <div
            class="carrinho-lateral-total"
        >

            <span>
                Total
            </span>

            <strong>
                ${formatarPreco(total)}
            </strong>

        </div>


        <button
            type="button"
            class="botao-finalizar-carrinho-lateral"
            id="finalizar-carrinho-whatsapp"
        >
            Finalizar pelo WhatsApp
        </button>


        <button
            type="button"
            class="botao-limpar-carrinho-lateral"
            id="limpar-carrinho"
        >
            Limpar carrinho
        </button>

    `;


    // Eu adiciono aqui os controles de quantidade.
    conteudo
        .querySelectorAll(
            "[data-acao]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const indice =
                        Number(
                            botao.dataset.indice
                        );


                    const acao =
                        botao.dataset.acao;


                    alterarQuantidadeCarrinho(
                        indice,
                        acao
                    );

                }
            );

        });


    const finalizar =
        document.querySelector(
            "#finalizar-carrinho-whatsapp"
        );


    if (finalizar) {

        finalizar.addEventListener(
            "click",
            finalizarPedidoWhatsApp
        );

    }


    const limpar =
        document.querySelector(
            "#limpar-carrinho"
        );


    if (limpar) {

        limpar.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    CHAVE_CARRINHO_LOCAL
                );


                atualizarContadorCarrinho();


                renderizarCarrinhoLateral();

            }
        );

    }

}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidadeCarrinho(
    indice,
    acao
) {

    const carrinho =
        obterCarrinho();


    const item =
        carrinho[indice];


    if (!item) {
        return;
    }


    if (acao === "aumentar") {

        item.quantidade += 1;

    }


    if (acao === "diminuir") {

        item.quantidade -= 1;

    }


    if (acao === "remover") {

        carrinho.splice(
            indice,
            1
        );

    }


    if (
        item &&
        item.quantidade <= 0
    ) {

        carrinho.splice(
            indice,
            1
        );

    }


    salvarCarrinho(
        carrinho
    );


    renderizarCarrinhoLateral();

}


// ==========================================
// MENSAGEM DO WHATSAPP
// ==========================================

function criarMensagemWhatsApp() {

    const carrinho =
        obterCarrinho();


    const total =
        calcularTotal(carrinho);


    let mensagem =
`Olá! Gostaria de fazer um pedido na Áurea. ✨

🛍️ Meu carrinho:

`;


    carrinho.forEach(
        (item, indice) => {

            const subtotal =
                Number(item.preco) *
                Number(item.quantidade);


            mensagem +=
`${indice + 1}. ${item.nome}
Cor: ${item.cor}
Tamanho: ${item.tamanho}
Quantidade: ${item.quantidade}
Forma de pagamento: ${item.pagamento || "Pix"}
Valor unitário: ${formatarPreco(item.preco)}
Subtotal: ${formatarPreco(subtotal)}

`;

        }
    );


    mensagem +=
`💰 Total: ${formatarPreco(total)}

Aguardo a confirmação do meu pedido. ✨`;


    return mensagem;

}


// ==========================================
// FINALIZAR PEDIDO
// ==========================================

function finalizarPedidoWhatsApp() {

    const carrinho =
        obterCarrinho();


    if (carrinho.length === 0) {

        mostrarAvisoCarrinho(
            "Seu carrinho está vazio."
        );

        return;

    }


    const mensagem =
        criarMensagemWhatsApp();


    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// ==========================================
// BOTÃO DO CARRINHO NO HEADER
// ==========================================

function prepararBotaoCarrinho() {

    const botao =
        document.querySelector(
            ".link-carrinho"
        );


    if (!botao) {
        return;
    }


    // Eu deixo o link preparado para funcionar
    // como botão, sem navegar para outra página.
    botao.setAttribute(
        "href",
        "#"
    );


    // Eu não adiciono outro click aqui porque
    // o script.js já controla o clique do ícone.
    atualizarContadorCarrinho();

}


// ==========================================
// EU ESCUTO O EVENTO DO SCRIPT PRINCIPAL
// ==========================================

document.addEventListener(
    "abrirCarrinho",
    () => {

        abrirCarrinho();

    }
);


// ==========================================
// BOTÃO ADICIONAR AO CARRINHO
// ==========================================

function prepararBotaoProduto() {

    const botaoCompra =
        document.querySelector(
            "#botao-compra-produto"
        );


    if (!botaoCompra) {
        return;
    }


    if (
        document.querySelector(
            "#botao-adicionar-carrinho"
        )
    ) {
        return;
    }


    const botaoCarrinho =
        document.createElement(
            "button"
        );


    botaoCarrinho.type =
        "button";


    botaoCarrinho.id =
        "botao-adicionar-carrinho";


    botaoCarrinho.className =
        "produto-botao-carrinho";


    botaoCarrinho.textContent =
        "Adicionar ao carrinho";


    botaoCompra.insertAdjacentElement(
        "afterend",
        botaoCarrinho
    );


    botaoCarrinho.addEventListener(
        "click",
        () => {

            const corSelecionada =
                document.querySelector(
                    ".produto-cor.ativo"
                );


            const tamanhoSelecionado =
                document.querySelector(
                    ".tamanho-produto.ativo"
                );


            const quantidadeSelecionada =
                document.querySelector(
                    "#quantidade-produto"
                );


            const pagamentoSelecionado =
                document.querySelector(
                    ".pagamento-produto.ativo"
                );


            if (
                !corSelecionada ||
                !tamanhoSelecionado
            ) {

                mostrarAvisoCarrinho(
                    "Escolha a cor e o tamanho."
                );

                return;

            }


            if (!quantidadeSelecionada) {

                mostrarAvisoCarrinho(
                    "Escolha a quantidade."
                );

                return;

            }


            const quantidade =
                Number(
                    quantidadeSelecionada.textContent
                );


            if (quantidade < 1) {

                mostrarAvisoCarrinho(
                    "Escolha uma quantidade válida."
                );

                return;

            }


            if (!pagamentoSelecionado) {

                mostrarAvisoCarrinho(
                    "Escolha a forma de pagamento."
                );

                return;

            }


            const pagamento =
                pagamentoSelecionado.dataset.pagamento;


            const slug =
                new URLSearchParams(
                    window.location.search
                ).get("produto");


            if (
                typeof produtos === "undefined" ||
                !Array.isArray(produtos)
            ) {

                console.error(
                    "Erro: produtos.js não foi carregado."
                );

                return;

            }


            const produto =
                produtos.find(
                    item => {

                        const slugAtual =
                            item.slug ||
                            gerarSlug(item.nome);


                        return (
                            slugAtual === slug
                        );

                    }
                );


            if (!produto) {
                return;
            }


            const cor =
                produto.cores.find(
                    item =>
                        item.nome ===
                        corSelecionada.dataset.cor
                );


            if (!cor) {
                return;
            }


            adicionarAoCarrinho(
                produto,
                cor,
                tamanhoSelecionado.dataset.tamanho,
                quantidade,
                pagamento
            );

        }
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        criarPainelCarrinho();

        prepararBotaoCarrinho();

        prepararBotaoProduto();

        atualizarContadorCarrinho();

    }
);


// ==========================================
// EU DEIXO ESSAS FUNÇÕES DISPONÍVEIS
// PARA OUTROS SCRIPTS DA ÁUREA.
// ==========================================

window.abrirCarrinho =
    abrirCarrinho;


window.fecharCarrinho =
    fecharCarrinho;


window.atualizarContadorCarrinho =
    atualizarContadorCarrinho;
