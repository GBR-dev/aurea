// ==========================================
// PÁGINA DE PRODUTO ÁUREA
// Eu cuido aqui da galeria, cores, tamanhos,
// estoque, descrição e compartilhamento.
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
                    ‹
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
                    ›
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

                <strong>
                    R$ ${produtoAtual.precoPix.toFixed(2).replace(".", ",")}
                </strong>

                <span>
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


            <div
                class="produto-status"
                id="produto-status"
            ></div>


            <a
                id="botao-compra-produto"
                href="https://www.instagram.com/useaurea.m/"
                target="_blank"
                rel="noopener noreferrer"
                class="produto-botao-compra"
            >
                Comprar pelo Instagram
            </a>


            <p class="produto-reposicao">
                Após escolher a cor e o tamanho,
                fale conosco para confirmar a disponibilidade.
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


    const setaAnterior =
        document.querySelector(".seta-anterior");


    const setaProxima =
        document.querySelector(".seta-proxima");


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


                        imagemAtual = 0;


                        atualizarImagem();

                        atualizarCores();

                        atualizarTamanhos();

                        atualizarStatus();

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

                atualizarTamanhos();

                atualizarStatus();

                atualizarBotaoCompra();

                    }
                );

            });

    }


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
            !tamanhoTemEstoque(
                corSelecionada,
                tamanhoSelecionado
            )
        ) {

            statusProduto.textContent =
                "Este tamanho está esgotado.";

            return;

        }


        statusProduto.textContent =
            `Última unidade disponível: ${corSelecionada.nome} — tamanho ${tamanhoSelecionado}.`;

    }


    // ==========================================
    // BOTÃO DE COMPRA
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

            botaoCompra.classList.add("desativado");

            botaoCompra.textContent =
                "Escolha cor e tamanho";

            botaoCompra.href =
                "#";

            return;

        }


        botaoCompra.classList.remove("desativado");

        botaoCompra.textContent =
            "Comprar pelo Instagram";


        botaoCompra.href =
            "https://www.instagram.com/useaurea.m/";

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
    document.querySelector(".produto-zoom-container");


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
                `Olá! Gostaria de saber mais sobre o produto ${produtoAtual.nome}.`;


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

    atualizarStatus();

    atualizarBotaoCompra();

}