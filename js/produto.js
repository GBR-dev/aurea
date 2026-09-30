// ==========================================
// PRODUTO INDIVIDUAL
// Aqui eu controlo a página de cada produto.
// ==========================================


const parametros =
    new URLSearchParams(
        window.location.search
    );


const nomeProduto =
    parametros.get("produto");


const produto =
    produtos.find(
        function (item) {

            return item.nome === nomeProduto;

        }
    );


const containerProduto =
    document.querySelector(
        "#produto-detalhes"
    );


if (!produto) {

    containerProduto.innerHTML = `

        <div class="produto-nao-encontrado">

            <h1>
                Produto não encontrado
            </h1>

            <p>
                O produto que você procura
                não está disponível.
            </p>

            <a href="index.html#colecao">
                Voltar para a coleção
            </a>

        </div>

    `;

}


else {

    // ==========================================
    // VARIÁVEIS
    // ==========================================

    let corSelecionada =
        produto.cores.find(
            function (cor) {

                return cor.disponivel;

            }
        );


    // Se todas estiverem esgotadas,
    // usamos a primeira apenas para mostrar
    // as informações do produto.

    if (!corSelecionada) {

        corSelecionada =
            produto.cores[0];

    }


    let indiceImagem = 0;


    // ==========================================
    // VERIFICAR SE TODAS AS CORES ACABARAM
    // ==========================================

    function produtoEsgotado() {

        for (
            let i = 0;
            i < produto.cores.length;
            i++
        ) {

            if (
                produto.cores[i].disponivel
            ) {

                return false;

            }

        }

        return true;

    }


    // ==========================================
    // MONTAR A PÁGINA
    // ==========================================

    containerProduto.innerHTML = `

        <div class="produto-detalhes">

            <div class="produto-galeria">

                <div class="produto-imagem">

                    <button
                        class="seta seta-esquerda"
                        type="button"
                        aria-label="Imagem anterior"
                    >
                        &#10094;
                    </button>

                    <img
                        src="${corSelecionada.imagens[0]}"
                        alt="${produto.nome} - ${corSelecionada.nome}"
                    >

                    <button
                        class="seta seta-direita"
                        type="button"
                        aria-label="Próxima imagem"
                    >
                        &#10095;
                    </button>

                </div>

                <div class="indicadores"></div>

            </div>


            <div class="produto-informacoes">

                <h1>
                    ${produto.nome}
                </h1>


                <div class="precos">

                    <p class="preco-pix">
                        R$
                        ${produto.precoPix
                            .toFixed(2)
                            .replace(".", ",")}
                        no Pix
                    </p>

                    <p class="preco-cartao">
                        R$
                        ${produto.precoCartao
                            .toFixed(2)
                            .replace(".", ",")}
                        no cartão
                    </p>

                </div>


                <div class="cores">

                    <p>
                        Cor:
                    </p>

                </div>


                <div class="disponibilidade-tamanho">

                    <p>
                        Tamanho
                    </p>

                    <span>
                        Consulte a disponibilidade
                    </span>

                </div>


                <div
                    class="status-produto"
                    id="status-produto"
                ></div>


                <a
                    href="https://www.instagram.com/useaurea.m/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="botao-instagram botao-comprar"
                    id="botao-comprar"
                >
                    Comprar pelo Instagram
                </a>


                <a
                    href="index.html#colecao"
                    class="voltar-colecao"
                >
                    ← Voltar para a coleção
                </a>

            </div>

        </div>

    `;


    // ==========================================
    // PEGAR ELEMENTOS
    // ==========================================

    const imagemProduto =
        containerProduto.querySelector(
            ".produto-imagem img"
        );


    const setaEsquerda =
        containerProduto.querySelector(
            ".seta-esquerda"
        );


    const setaDireita =
        containerProduto.querySelector(
            ".seta-direita"
        );


    const containerIndicadores =
        containerProduto.querySelector(
            ".indicadores"
        );


    const containerCores =
        containerProduto.querySelector(
            ".cores"
        );


    const botaoComprar =
        containerProduto.querySelector(
            "#botao-comprar"
        );


    const statusProduto =
        containerProduto.querySelector(
            "#status-produto"
        );


    // ==========================================
    // ATUALIZAR STATUS
    // ==========================================

    function atualizarStatus() {

        statusProduto.classList.remove(
            "disponivel",
            "esgotado"
        );


        if (
            produtoEsgotado()
        ) {

            statusProduto.textContent =
                "ESGOTADO";

            statusProduto.classList.add(
                "esgotado"
            );


            botaoComprar.classList.add(
                "desativado"
            );


            botaoComprar.removeAttribute(
                "href"
            );


            return;

        }


        if (
            !corSelecionada.disponivel
        ) {

            statusProduto.textContent =
                "ESTA COR ESTÁ ESGOTADA";

            statusProduto.classList.add(
                "esgotado"
            );


            botaoComprar.classList.add(
                "desativado"
            );


            botaoComprar.removeAttribute(
                "href"
            );


            return;

        }


        statusProduto.textContent =
            "DISPONÍVEL";


        statusProduto.classList.add(
            "disponivel"
        );


        botaoComprar.classList.remove(
            "desativado"
        );


        botaoComprar.href =
            "https://www.instagram.com/useaurea.m/";

    }


    // ==========================================
    // ATUALIZAR IMAGEM
    // ==========================================

    function atualizarImagem() {

        imagemProduto.src =
            corSelecionada.imagens[
                indiceImagem
            ];


        imagemProduto.alt =
            `${produto.nome} - ${corSelecionada.nome}`;


        atualizarIndicadores();

    }


    // ==========================================
    // INDICADORES
    // ==========================================

    function atualizarIndicadores() {

        containerIndicadores.innerHTML =
            "";


        for (
            let i = 0;
            i < corSelecionada.imagens.length;
            i++
        ) {

            const indicador =
                document.createElement(
                    "button"
                );


            indicador.type =
                "button";


            indicador.classList.add(
                "indicador"
            );


            if (
                i === indiceImagem
            ) {

                indicador.classList.add(
                    "ativo"
                );

            }


            indicador.setAttribute(
                "aria-label",
                `Ver imagem ${i + 1}`
            );


            indicador.addEventListener(
                "click",
                function () {

                    indiceImagem = i;

                    atualizarImagem();

                }
            );


            containerIndicadores.appendChild(
                indicador
            );

        }

    }


    // ==========================================
    // SETA DIREITA
    // ==========================================

    setaDireita.addEventListener(
        "click",
        function () {

            indiceImagem++;


            if (
                indiceImagem >=
                corSelecionada.imagens.length
            ) {

                indiceImagem = 0;

            }


            atualizarImagem();

        }
    );


    // ==========================================
    // SETA ESQUERDA
    // ==========================================

    setaEsquerda.addEventListener(
        "click",
        function () {

            indiceImagem--;


            if (
                indiceImagem < 0
            ) {

                indiceImagem =
                    corSelecionada.imagens.length - 1;

            }


            atualizarImagem();

        }
    );


    // ==========================================
    // CORES
    // ==========================================

    for (
        let i = 0;
        i < produto.cores.length;
        i++
    ) {

        const cor =
            produto.cores[i];


        const botaoCor =
            document.createElement(
                "button"
            );


        botaoCor.type =
            "button";


        botaoCor.textContent =
            cor.nome;


        // ==========================================
        // COR ESGOTADA
        // ==========================================

        if (
            !cor.disponivel
        ) {

            botaoCor.classList.add(
                "esgotada"
            );


            botaoCor.disabled =
                true;

        }


        // ==========================================
        // COR SELECIONADA
        // ==========================================

        if (
            cor === corSelecionada &&
            cor.disponivel
        ) {

            botaoCor.classList.add(
                "selecionada"
            );

        }


        // ==========================================
        // TROCAR COR
        // ==========================================

        botaoCor.addEventListener(
            "click",
            function () {

                if (
                    !cor.disponivel
                ) {

                    return;

                }


                corSelecionada =
                    cor;


                indiceImagem =
                    0;


                const botoes =
                    containerCores.querySelectorAll(
                        "button"
                    );


                for (
                    let j = 0;
                    j < botoes.length;
                    j++
                ) {

                    botoes[j]
                        .classList
                        .remove(
                            "selecionada"
                        );

                }


                botaoCor.classList.add(
                    "selecionada"
                );


                atualizarImagem();

                atualizarStatus();

            }
        );


        containerCores.appendChild(
            botaoCor
        );

    }


    // ==========================================
    // INICIAR
    // ==========================================

    atualizarIndicadores();

    atualizarStatus();

}