
// ==========================================
// PÁGINA DE PRODUTO ÁUREA
// Eu cuido aqui da galeria, cores, tamanhos,
// estoque, quantidade, pagamento, descrição
// e compartilhamento.
// ==========================================


// ==========================================
// PEGAR O PRODUTO PELA URL
// ==========================================

const parametrosURL =
    new URLSearchParams(window.location.search);

const slugProduto =
    parametrosURL.get("produto");


function encontrarProduto(slug) {

    if (
        typeof produtos === "undefined" ||
        !Array.isArray(produtos)
    ) {
        return null;
    }


    return produtos.find((produto) => {

        const slugAtual =
            produto.slug || gerarSlug(produto.nome);

        return slugAtual === slug;

    });

}


const produtoAtual =
    encontrarProduto(slugProduto);


const containerProduto =
    document.querySelector("#produto-container");


if (!containerProduto) {

    console.error(
        "Container do produto não encontrado."
    );

} else if (!produtoAtual) {

    containerProduto.innerHTML = `

        <div class="produto-nao-encontrado">

            <h1>
                Produto não encontrado
            </h1>

            <p>
                Não encontramos o produto solicitado.
            </p>

            <a
                href="colecao.html"
                class="botao-principal"
            >
                Voltar para a coleção
            </a>

        </div>

    `;

} else {

    inicializarProduto();

}


// ==========================================
// INICIALIZAR PRODUTO
// ==========================================

function inicializarProduto() {

    const primeiraCor =
        produtoAtual.cores?.find(corTemEstoque)
        || produtoAtual.cores?.[0];


    let corSelecionada =
        primeiraCor;


    let tamanhoSelecionado =
        null;


    let quantidadeSelecionada =
        1;


    let pagamentoSelecionado =
        "Pix";


    let imagemAtual =
        0;


    // ==========================================
    // FUNÇÕES DE ESTOQUE
    // ==========================================

    function corTemEstoque(cor) {

        if (!cor) {
            return false;
        }


        if (cor.disponivel === false) {
            return false;
        }


        if (
            cor.estoque &&
            typeof cor.estoque === "object"
        ) {

            return Object.values(cor.estoque).some(
                quantidade => Number(quantidade) > 0
            );

        }


        return true;

    }


    function tamanhoTemEstoque(cor, tamanho) {

        if (!cor) {
            return false;
        }


        if (!cor.estoque) {
            return cor.disponivel !== false;
        }


        return Number(
            cor.estoque[tamanho]
        ) > 0;

    }


    // ==========================================
    // MONTAR HTML
    // ==========================================

    containerProduto.innerHTML = `

        <div class="produto-galeria">

            <div class="produto-imagem-grande">

                <button
                    type="button"
                    class="seta-galeria seta-anterior"
                    aria-label="Imagem anterior"
                >
                    ${criarIcone("anterior", 22)}
                </button>


                <div class="produto-zoom-container">

                    <img
                        id="imagem-produto"
                        src="${corSelecionada.imagens[0]}"
                        alt="${produtoAtual.nome}"
                    >

                </div>


                <button
                    type="button"
                    class="seta-galeria seta-proxima"
                    aria-label="Próxima imagem"
                >
                    ${criarIcone("proximo", 22)}
                </button>

            </div>


            <div
                class="indicadores produto-indicadores"
                id="indicadores-produto"
            ></div>


            <p class="zoom-legenda">
                Clique na imagem para ampliar
            </p>

        </div>


        <div class="produto-dados">

            <span class="produto-categoria">
                ${produtoAtual.categoria}
            </span>


            <h1>
                ${produtoAtual.nome}
            </h1>


            <div class="produto-precos">

                <strong id="preco-produto-atual">
                    R$ ${produtoAtual.precoPix.toFixed(2).replace(".", ",")}
                </strong>

                <span id="tipo-preco-produto">
                    no Pix
                </span>

                <small>
                    R$ ${produtoAtual.precoCartao.toFixed(2).replace(".", ",")}
                    no cartão
                </small>

            </div>


            <div class="produto-opcao">

                <h3>
                    Escolha a cor
                </h3>

                <div
                    class="cores-produto"
                    id="cores-produto"
                ></div>

            </div>


            <div class="produto-opcao">

                <h3>
                    Escolha o tamanho
                </h3>

                <div
                    class="tamanhos-produto"
                    id="tamanhos-produto"
                ></div>

            </div>


            <div class="produto-opcao">

                <h3>
                    Quantidade
                </h3>

                <div class="quantidade-produto">

                    <button
                        type="button"
                        id="diminuir-quantidade"
                        aria-label="Diminuir quantidade"
                    >
                        ${criarIcone("menos", 16)}
                    </button>

                    <span id="quantidade-produto">
                        1
                    </span>

                    <button
                        type="button"
                        id="aumentar-quantidade"
                        aria-label="Aumentar quantidade"
                    >
                        ${criarIcone("mais", 16)}
                    </button>

                </div>

            </div>

    <div class="produto-aviso-pagamento">
        <p>
            Você poderá escolher a forma de pagamento
            ao finalizar seu carrinho.
        </p>
    </div>

                </div>

            </div>


            <div
                class="produto-status"
                id="produto-status"
            ></div>


            <a
                id="botao-compra-produto"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                class="produto-botao-compra"
            >
                Escolha cor e tamanho
            </a>


            <p class="produto-reposicao">
                Escolha cor, tamanho, quantidade e forma
                de pagamento antes de finalizar.
            </p>


            <div class="produto-observacao">

                <strong>
                    Observação
                </strong>

                <p>
                    ${produtoAtual.observacao || ""}
                </p>

            </div>


            <div class="produto-descricao">

                <h2>
                    Sobre a peça
                </h2>

                <p>
                    ${(produtoAtual.descricao || "").replace(
                        /\n/g,
                        "<br><br>"
                    )}
                </p>

            </div>


            <div class="produto-tecnico">

                <h2>
                    Informações
                </h2>

                <div class="tecnico-grid">

                    <div>

                        <span>
                            Tecido
                        </span>

                        <strong>
                            ${produtoAtual.tecido || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Composição
                        </span>

                        <strong>
                            ${produtoAtual.composicao || "-"}
                        </strong>

                    </div>

                </div>

            </div>


            ${
                produtoAtual.medidas &&
                Object.keys(produtoAtual.medidas).length > 0

                ? `

                    <div class="produto-medidas">

                        <h2>
                            Medidas
                        </h2>


                        <div class="tabela-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Tamanho
                                        </th>

                                        <th>
                                            Peito
                                        </th>

                                        <th>
                                            Comprimento
                                        </th>

                                        <th>
                                            Cintura
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${produtoAtual.tamanhos.map((tamanho) => {

                                        const medida =
                                            produtoAtual.medidas[tamanho];


                                        if (
                                            !medida ||
                                            typeof medida !== "object"
                                        ) {
                                            return "";
                                        }


                                        return `

                                            <tr>

                                                <td>
                                                    ${tamanho}
                                                </td>

                                                <td>
                                                    ${medida.peito} cm
                                                </td>

                                                <td>
                                                    ${medida.comprimento} cm
                                                </td>

                                                <td>
                                                    ${medida.cintura} cm
                                                </td>

                                            </tr>

                                        `;

                                    }).join("")}

                                </tbody>

                            </table>

                        </div>


                        ${
                            produtoAtual.observacaoMedidas

                            ? `

                                <p class="medidas-observacao">
                                    ${produtoAtual.observacaoMedidas}
                                </p>

                            `

                            : ""
                        }

                    </div>

                `

                : ""
            }


            <div class="produto-compartilhar">

                <h3>
                    Compartilhe este produto
                </h3>

                <div>

                    <button
                        type="button"
                        id="compartilhar-whatsapp"
                    >
                        WhatsApp
                    </button>


                    <button
                        type="button"
                        id="copiar-link"
                    >
                        Copiar link
                    </button>

                </div>

            </div>


            <a
                href="colecao.html"
                class="voltar-colecao"
            >
                ← Voltar para a coleção
            </a>

        </div>

    `;


    const imagemProduto =
        document.querySelector("#imagem-produto");


    const indicadores =
        document.querySelector("#indicadores-produto");


    const coresContainer =
        document.querySelector("#cores-produto");


    const tamanhosContainer =
        document.querySelector("#tamanhos-produto");


    const statusProduto =
        document.querySelector("#produto-status");


    const botaoCompra =
        document.querySelector("#botao-compra-produto");


    const precoProdutoAtual =
        document.querySelector("#preco-produto-atual");


    const tipoPrecoProduto =
        document.querySelector("#tipo-preco-produto");


    const quantidadeElemento =
        document.querySelector("#quantidade-produto");


    const diminuirQuantidade =
        document.querySelector("#diminuir-quantidade");


    const aumentarQuantidade =
        document.querySelector("#aumentar-quantidade");


    const pagamentos =
        document.querySelectorAll(".pagamento-produto");


    const setaAnterior =
        document.querySelector(".seta-anterior");


    const setaProxima =
        document.querySelector(".seta-proxima");


    // ==========================================
    // ATUALIZAR PREÇO
    // Eu mostro o preço correspondente à forma
    // de pagamento escolhida.
    // ==========================================

    function atualizarPreco() {

        const preco =
            pagamentoSelecionado === "Cartão"
                ? produtoAtual.precoCartao
                : produtoAtual.precoPix;


        precoProdutoAtual.textContent =
            `R$ ${Number(preco).toFixed(2).replace(".", ",")}`;


        tipoPrecoProduto.textContent =
            pagamentoSelecionado === "Cartão"
                ? "no cartão"
                : "no Pix";

    }


    // ==========================================
    // ATUALIZAR IMAGEM
    // ==========================================

    function atualizarImagem() {

        if (!corSelecionada?.imagens?.length) {
            return;
        }


        if (
            imagemAtual >=
            corSelecionada.imagens.length
        ) {
            imagemAtual = 0;
        }


        imagemProduto.src =
            corSelecionada.imagens[imagemAtual];


        imagemProduto.alt =
            `${produtoAtual.nome} - ${corSelecionada.nome}`;


        atualizarIndicadores();

    }


    // ==========================================
    // INDICADORES
    // ==========================================

    function atualizarIndicadores() {

        indicadores.innerHTML =
            corSelecionada.imagens.map(
                (imagem, indice) => `

                    <button
                        type="button"
                        class="${
                            indice === imagemAtual
                                ? "ativo"
                                : ""
                        }"
                        data-imagem="${indice}"
                        aria-label="Ver imagem ${indice + 1}"
                    ></button>

                `
            ).join("");


        indicadores
            .querySelectorAll("button")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        imagemAtual =
                            Number(
                                botao.dataset.imagem
                            );

                        atualizarImagem();

                    }
                );

            });

    }


    // ==========================================
    // CORES
    // ==========================================

    function atualizarCores() {

        coresContainer.innerHTML =
            produtoAtual.cores.map(
                (cor) => {

                    const disponivel =
                        corTemEstoque(cor);


                    return `

                        <button
                            type="button"
                            class="
                                produto-cor
                                ${
                                    cor.nome ===
                                    corSelecionada.nome
                                        ? "ativo"
                                        : ""
                                }
                                ${
                                    !disponivel
                                        ? "indisponivel"
                                        : ""
                                }
                            "
                            data-cor="${cor.nome}"
                            ${!disponivel ? "disabled" : ""}
                        >

                            ${cor.nome}

                        </button>

                    `;

                }
            ).join("");


        coresContainer
            .querySelectorAll(".produto-cor")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        const novaCor =
                            produtoAtual.cores.find(
                                cor =>
                                    cor.nome ===
                                    botao.dataset.cor
                            );


                        if (!novaCor) {
                            return;
                        }


                        corSelecionada =
                            novaCor;


                        tamanhoSelecionado =
                            null;


                        quantidadeSelecionada =
                            1;


                        imagemAtual = 0;


                        atualizarQuantidade();

                        atualizarImagem();

                        atualizarCores();

                        atualizarTamanhos();

                        atualizarStatus();

                        atualizarBotaoCompra();

                    }
                );

            });

    }


    // ==========================================
    // TAMANHOS
    // ==========================================

    function atualizarTamanhos() {

        tamanhosContainer.innerHTML =
            produtoAtual.tamanhos.map(
                (tamanho) => {

                    const disponivel =
                        tamanhoTemEstoque(
                            corSelecionada,
                            tamanho
                        );


                    return `

                        <button
                            type="button"
                            class="
                                tamanho-produto
                                ${
                                    tamanho ===
                                    tamanhoSelecionado
                                        ? "ativo"
                                        : ""
                                }
                                ${
                                    !disponivel
                                        ? "indisponivel"
                                        : ""
                                }
                            "
                            data-tamanho="${tamanho}"
                            ${!disponivel ? "disabled" : ""}
                        >

                            ${tamanho}

                        </button>

                    `;

                }
            ).join("");


        tamanhosContainer
            .querySelectorAll(".tamanho-produto")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        // Eu salvo o tamanho escolhido pela cliente.
                        tamanhoSelecionado =
                            botao.dataset.tamanho;

                        quantidadeSelecionada =
                            1;

                        atualizarQuantidade();

                        atualizarTamanhos();

                        atualizarStatus();

                        atualizarBotaoCompra();

                    }
                );

            });

    }


    // ==========================================
    // QUANTIDADE
    // ==========================================

    function atualizarQuantidade() {

        quantidadeElemento.textContent =
            quantidadeSelecionada;

    }


    function aumentarQuantidadeProduto() {

        if (
            !corSelecionada ||
            !tamanhoSelecionado
        ) {
            return;
        }


        const estoqueDisponivel =
            corSelecionada.estoque
                ? Number(
                    corSelecionada.estoque[
                        tamanhoSelecionado
                    ]
                )
                : 99;


        if (
            quantidadeSelecionada >=
            estoqueDisponivel
        ) {
            return;
        }


        quantidadeSelecionada += 1;


        atualizarQuantidade();

        atualizarBotaoCompra();

    }


    function diminuirQuantidadeProduto() {

        if (
            quantidadeSelecionada <= 1
        ) {
            return;
        }


        quantidadeSelecionada -= 1;


        atualizarQuantidade();

        atualizarBotaoCompra();

    }


    diminuirQuantidade.addEventListener(
        "click",
        diminuirQuantidadeProduto
    );


    aumentarQuantidade.addEventListener(
        "click",
        aumentarQuantidadeProduto
    );


    // ==========================================
    // PAGAMENTO
    // ==========================================

    pagamentos.forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                () => {

                    pagamentos.forEach(
                        item => {
                            item.classList.remove(
                                "ativo"
                            );
                        }
                    );


                    botao.classList.add(
                        "ativo"
                    );


                    pagamentoSelecionado =
                        botao.dataset.pagamento;


                    atualizarPreco();

                    atualizarBotaoCompra();

                }
            );

        }
    );


    // ==========================================
    // STATUS DO PRODUTO
    // ==========================================

    function atualizarStatus() {

        if (!corSelecionada) {

            statusProduto.textContent =
                "Escolha uma cor.";

            return;
        }


        if (!corTemEstoque(corSelecionada)) {

            statusProduto.textContent =
                "Esta cor está esgotada.";

            return;

        }


        if (!tamanhoSelecionado) {

            statusProduto.textContent =
                `Cor selecionada: ${corSelecionada.nome}. Escolha um tamanho.`;

            return;

        }


        if (
            !tamanhoTem(
                corSelecionada,
                tamanhoSelecionado
            )
        ) {

            statusProduto.textContent =
                "Este tamanho está esgotado.";

            return;

        }


        const estoque =
            corSelecionada.estoque
                ? Number(
                    corSelecionada.estoque[
                        tamanhoSelecionado
                    ]
                )
                : 99;


        statusProduto.textContent =
            `${estoque} unidade${estoque === 1 ? "" : "s"} disponível${estoque === 1 ? "" : "is"} para esta escolha.`;

    }


    // ==========================================
    // BOTÃO DE COMPRA
    // Eu atualizo o botão principal conforme a
    // cliente escolhe todas as opções.
    // ==========================================

    function atualizarBotaoCompra() {

        if (
            !corSelecionada ||
            !tamanhoSelecionado ||
            !tamanhoTemEstoque(
                corSelecionada,
                tamanhoSelecionado
            )
        ) {

            botaoCompra.classList.add(
                "desativado"
            );


            botaoCompra.textContent =
                "Escolha cor e tamanho";


            botaoCompra.href =
                "#";


            return;

        }


        botaoCompra.classList.remove(
            "desativado"
        );


        botaoCompra.textContent =
            "Comprar pelo WhatsApp";


        const preco =
            pagamentoSelecionado === "Cartão"
                ? Number(produtoAtual.precoCartao)
                : Number(produtoAtual.precoPix);


        const subtotal =
            preco *
            quantidadeSelecionada;


        const mensagem =
`Olá! Gostaria de fazer um pedido na Áurea. ✨

🛍️ Meu pedido:

Produto: ${produtoAtual.nome}
Cor: ${corSelecionada.nome}
Tamanho: ${tamanhoSelecionado}
Quantidade: ${quantidadeSelecionada}
Forma de pagamento: ${pagamentoSelecionado}
Valor unitário: R$ ${preco.toFixed(2).replace(".", ",")}
Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}

💰 Total: R$ ${subtotal.toFixed(2).replace(".", ",")}

Aguardo a confirmação do pedido. ✨`;


        botaoCompra.href =
            `https://wa.me/5511992958541?text=${encodeURIComponent(
                mensagem
            )}`;

    }


    // ==========================================
    // GALERIA
    // ==========================================

    setaAnterior.addEventListener(
        "click",
        () => {

            imagemAtual--;

            if (imagemAtual < 0) {

                imagemAtual =
                    corSelecionada.imagens.length - 1;

            }

            atualizarImagem();

        }
    );


    setaProxima.addEventListener(
        "click",
        () => {

            imagemAtual++;

            if (
                imagemAtual >=
                corSelecionada.imagens.length
            ) {

                imagemAtual = 0;

            }

            atualizarImagem();

        }
    );


    // ==========================================
    // ZOOM
    // Eu faço o zoom pela área inteira da foto,
    // mantendo a imagem centralizada.
    // ==========================================

    const containerZoom =
        document.querySelector(
            ".produto-zoom-container"
        );


    containerZoom.addEventListener(
        "click",
        () => {

            imagemProduto.classList.toggle(
                "zoom-ativo"
            );

        }
    );


    // ==========================================
    // COMPARTILHAR NO WHATSAPP
    // ==========================================

    const compartilharWhatsApp =
        document.querySelector(
            "#compartilhar-whatsapp"
        );


    compartilharWhatsApp.addEventListener(
        "click",
        () => {

            const mensagem =
                `Olha essa roupa linda no site da Áurea! ${produtoAtual.nome}.`;


            const url =
                `https://wa.me/?text=${encodeURIComponent(mensagem)}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


    // ==========================================
    // COPIAR LINK
    // ==========================================

    const copiarLink =
        document.querySelector("#copiar-link");


    copiarLink.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                copiarLink.textContent =
                    "Link copiado!";


                setTimeout(() => {

                    copiarLink.textContent =
                        "Copiar link";

                }, 2000);

            } catch (erro) {

                console.error(
                    "Não foi possível copiar o link.",
                    erro
                );

            }

        }
    );


    // ==========================================
    // PRIMEIRA EXIBIÇÃO
    // ==========================================

    atualizarImagem();

    atualizarCores();

    atualizarTamanhos();

    atualizarQuantidade();

    atualizarPreco();

    atualizarStatus();

    atualizarBotaoCompra();

}
