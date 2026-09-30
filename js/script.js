// ==========================================
// SITE ÁUREA
// Aqui eu controlo os produtos da página inicial,
// filtros, imagens, cores, estoque e menu mobile.
// ==========================================


const containerProdutos =
    document.querySelector(".produtos");

let categoriaSelecionada = "Todos";


// ==========================================
// VERIFICAR SE O PRODUTO ESTÁ ESGOTADO
// ==========================================

function produtoEsgotado(produto) {

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
// CRIAR PRODUTOS
// ==========================================

function criarProdutos() {

    containerProdutos.innerHTML = "";


    let produtosFiltrados =
        produtos.filter(function (produto) {

            if (
                categoriaSelecionada === "Todos"
            ) {

                return true;

            }

            return (
                produto.categoria ===
                categoriaSelecionada
            );

        });


    for (
        let i = 0;
        i < produtosFiltrados.length;
        i++
    ) {

        const produto =
            produtosFiltrados[i];


        const artigo =
            document.createElement("article");

        artigo.classList.add(
            "produto"
        );


        // ==========================================
        // VERIFICAR ESTOQUE
        // ==========================================

        const estaEsgotado =
            produtoEsgotado(produto);


        // ==========================================
        // IMAGEM
        // ==========================================

        const containerImagem =
            document.createElement("div");

        containerImagem.classList.add(
            "produto-imagem"
        );


        let corSelecionada =
            produto.cores.find(
                function (cor) {

                    return cor.disponivel;

                }
            );


        // Se todas as cores estiverem esgotadas,
        // usamos a primeira apenas para mostrar
        // a imagem do produto.

        if (!corSelecionada) {

            corSelecionada =
                produto.cores[0];

        }


        let indiceImagem = 0;


        const imagem =
            document.createElement("img");


        imagem.src =
            corSelecionada.imagens[
                indiceImagem
            ];


        imagem.alt =
            `${produto.nome} - ${corSelecionada.nome}`;


        // ==========================================
        // ETIQUETA DE ESGOTADO
        // ==========================================

        if (estaEsgotado) {

            const etiqueta =
                document.createElement("span");

            etiqueta.classList.add(
                "produto-esgotado"
            );

            etiqueta.textContent =
                "ESGOTADO";

            containerImagem.appendChild(
                etiqueta
            );

        }


        // ==========================================
        // SETA ESQUERDA
        // ==========================================

        const setaEsquerda =
            document.createElement("button");

        setaEsquerda.type =
            "button";

        setaEsquerda.classList.add(
            "seta",
            "seta-esquerda"
        );

        setaEsquerda.innerHTML =
            "&#10094;";

        setaEsquerda.setAttribute(
            "aria-label",
            "Imagem anterior"
        );


        // ==========================================
        // SETA DIREITA
        // ==========================================

        const setaDireita =
            document.createElement("button");

        setaDireita.type =
            "button";

        setaDireita.classList.add(
            "seta",
            "seta-direita"
        );

        setaDireita.innerHTML =
            "&#10095;";

        setaDireita.setAttribute(
            "aria-label",
            "Próxima imagem"
        );


        containerImagem.appendChild(
            setaEsquerda
        );

        containerImagem.appendChild(
            imagem
        );

        containerImagem.appendChild(
            setaDireita
        );


        // ==========================================
        // INDICADORES
        // ==========================================

        const indicadores =
            document.createElement("div");

        indicadores.classList.add(
            "indicadores"
        );


        function atualizarIndicadores() {

            indicadores.innerHTML = "";


            for (
                let j = 0;
                j < corSelecionada.imagens.length;
                j++
            ) {

                const indicador =
                    document.createElement("button");


                indicador.type =
                    "button";


                indicador.classList.add(
                    "indicador"
                );


                if (
                    j === indiceImagem
                ) {

                    indicador.classList.add(
                        "ativo"
                    );

                }


                indicador.setAttribute(
                    "aria-label",
                    `Ver imagem ${j + 1}`
                );


                indicador.addEventListener(
                    "click",
                    function () {

                        indiceImagem = j;

                        atualizarImagem();

                    }
                );


                indicadores.appendChild(
                    indicador
                );

            }

        }


        // ==========================================
        // ATUALIZAR IMAGEM
        // ==========================================

        function atualizarImagem() {

            imagem.src =
                corSelecionada.imagens[
                    indiceImagem
                ];


            imagem.alt =
                `${produto.nome} - ${corSelecionada.nome}`;


            atualizarIndicadores();

        }


        // ==========================================
        // SETA DIREITA
        // ==========================================

        setaDireita.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


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
            function (event) {

                event.stopPropagation();


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
        // ABRIR PRODUTO
        // ==========================================

        containerImagem.style.cursor =
            "pointer";


        containerImagem.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "seta"
                    )
                ) {

                    return;

                }


                window.location.href =
                    `produto.html?produto=${encodeURIComponent(
                        produto.nome
                    )}`;

            }
        );


        // ==========================================
        // INFORMAÇÕES
        // ==========================================

        const informacoes =
            document.createElement("div");


        informacoes.classList.add(
            "produto-informacoes"
        );


        // ==========================================
        // NOME
        // ==========================================

        const nome =
            document.createElement("h3");


        nome.textContent =
            produto.nome;


        nome.style.cursor =
            "pointer";


        nome.addEventListener(
            "click",
            function () {

                window.location.href =
                    `produto.html?produto=${encodeURIComponent(
                        produto.nome
                    )}`;

            }
        );


        // ==========================================
        // PREÇOS
        // ==========================================

        const precos =
            document.createElement("div");


        precos.classList.add(
            "precos"
        );


        const precoPix =
            document.createElement("p");


        precoPix.classList.add(
            "preco-pix"
        );


        precoPix.textContent =
            `R$ ${produto.precoPix
                .toFixed(2)
                .replace(".", ",")} no Pix`;


        const precoCartao =
            document.createElement("p");


        precoCartao.classList.add(
            "preco-cartao"
        );


        precoCartao.textContent =
            `R$ ${produto.precoCartao
                .toFixed(2)
                .replace(".", ",")} no cartão`;


        precos.appendChild(
            precoPix
        );

        precos.appendChild(
            precoCartao
        );


        // ==========================================
        // CORES
        // ==========================================

        const cores =
            document.createElement("div");


        cores.classList.add(
            "cores"
        );


        const textoCor =
            document.createElement("p");


        textoCor.textContent =
            "Cor:";


        cores.appendChild(
            textoCor
        );


        for (
            let j = 0;
            j < produto.cores.length;
            j++
        ) {

            const cor =
                produto.cores[j];


            const botaoCor =
                document.createElement("button");


            botaoCor.type =
                "button";


            botaoCor.textContent =
                cor.nome;


            // Cor esgotada
            if (
                !cor.disponivel
            ) {

                botaoCor.classList.add(
                    "esgotada"
                );

                botaoCor.disabled =
                    true;

            }


            // Primeira cor disponível
            if (
                cor === corSelecionada &&
                cor.disponivel
            ) {

                botaoCor.classList.add(
                    "selecionada"
                );

            }


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


                    const botoesCor =
                        cores.querySelectorAll(
                            "button"
                        );


                    for (
                        let k = 0;
                        k < botoesCor.length;
                        k++
                    ) {

                        botoesCor[k]
                            .classList
                            .remove(
                                "selecionada"
                            );

                    }


                    botaoCor.classList.add(
                        "selecionada"
                    );


                    atualizarImagem();

                }
            );


            cores.appendChild(
                botaoCor
            );

        }


        // ==========================================
        // BOTÃO VER PRODUTO
        // ==========================================

        const linkProduto =
            document.createElement("a");


        linkProduto.href =
            `produto.html?produto=${encodeURIComponent(
                produto.nome
            )}`;


        linkProduto.classList.add(
            "botao-instagram"
        );


        linkProduto.textContent =
            "Ver produto";


        linkProduto.setAttribute(
            "aria-label",
            `Ver detalhes de ${produto.nome}`
        );


        // ==========================================
        // MONTAR PRODUTO
        // ==========================================

        informacoes.appendChild(
            nome
        );

        informacoes.appendChild(
            precos
        );

        informacoes.appendChild(
            cores
        );

        informacoes.appendChild(
            linkProduto
        );


        artigo.appendChild(
            containerImagem
        );

        artigo.appendChild(
            indicadores
        );

        artigo.appendChild(
            informacoes
        );


        containerProdutos.appendChild(
            artigo
        );


        atualizarIndicadores();

    }

}


// ==========================================
// FILTROS
// ==========================================

const botoesFiltro =
    document.querySelectorAll(
        ".filtro"
    );


for (
    let i = 0;
    i < botoesFiltro.length;
    i++
) {

    botoesFiltro[i].addEventListener(
        "click",
        function () {

            categoriaSelecionada =
                botoesFiltro[i]
                    .dataset
                    .categoria;


            for (
                let j = 0;
                j < botoesFiltro.length;
                j++
            ) {

                botoesFiltro[j]
                    .classList
                    .remove(
                        "ativo"
                    );

            }


            botoesFiltro[i]
                .classList
                .add(
                    "ativo"
                );


            criarProdutos();

        }
    );

}


// ==========================================
// MENU MOBILE
// ==========================================

const botaoMenu =
    document.querySelector(
        ".menu-mobile"
    );


const menuNavegacao =
    document.querySelector(
        "#menu-navegacao"
    );


if (
    botaoMenu &&
    menuNavegacao
) {

    botaoMenu.addEventListener(
        "click",
        function () {

            const menuAberto =
                menuNavegacao.classList.toggle(
                    "menu-aberto"
                );


            botaoMenu.setAttribute(
                "aria-expanded",
                menuAberto
            );


            if (menuAberto) {

                botaoMenu.textContent =
                    "✕";

            } else {

                botaoMenu.textContent =
                    "☰";

            }

        }
    );


    const linksMenu =
        menuNavegacao.querySelectorAll(
            "a"
        );


    for (
        let i = 0;
        i < linksMenu.length;
        i++
    ) {

        linksMenu[i].addEventListener(
            "click",
            function () {

                menuNavegacao.classList.remove(
                    "menu-aberto"
                );


                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );


                botaoMenu.textContent =
                    "☰";

            }
        );

    }

}


// ==========================================
// INICIAR PRODUTOS
// ==========================================

if (containerProdutos) {

    criarProdutos();

}