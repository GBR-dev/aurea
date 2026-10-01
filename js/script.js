// ==========================================
// SCRIPT PRINCIPAL DA ÁUREA
// Eu cuido aqui das interações gerais,
// filtros, cards e menu do site.
// ==========================================


// ==========================================
// MENU MOBILE
// ==========================================

const menuMobile = document.querySelector(".menu-mobile");
const nav = document.querySelector(".nav");

if (menuMobile && nav) {

    menuMobile.addEventListener("click", () => {

        const menuAberto = nav.classList.toggle("menu-aberto");

        menuMobile.setAttribute(
            "aria-expanded",
            menuAberto
        );

    });


    // Eu fecho o menu depois que a pessoa escolhe uma página.
    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("menu-aberto");

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ==========================================
// FUNÇÃO PARA GERAR SLUG
// ==========================================

function gerarSlug(texto) {

    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}


// ==========================================
// VERIFICAÇÃO DE ESTOQUE
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


    return cor.disponivel !== false;

}


// ==========================================
// VERIFICAÇÃO DO PRODUTO
// ==========================================

function produtoTemEstoque(produto) {

    if (!produto || !Array.isArray(produto.cores)) {
        return false;
    }

    return produto.cores.some(corTemEstoque);

}


// ==========================================
// CRIAÇÃO DO CARD
// Eu monto cada card de produto e direciono
// a cliente para a página individual da peça.
// ==========================================

function criarCardProduto(produto) {

    if (!produto) {
        return "";
    }


    // Eu encontro a primeira cor que ainda possui estoque.
    const primeiraCorDisponivel =
        produto.cores?.find(corTemEstoque)
        || produto.cores?.[0];


    if (!primeiraCorDisponivel) {
        return "";
    }


    // Eu pego a primeira imagem dessa cor para mostrar no card.
    const primeiraImagem =
        primeiraCorDisponivel.imagens?.[0];


    if (!primeiraImagem) {
        return "";
    }


    // Eu uso o slug cadastrado e, caso ele não exista,
    // eu gero um automaticamente a partir do nome.
    const slug =
        produto.slug || gerarSlug(produto.nome);


    // Eu mostro somente as cores que possuem estoque.
    const coresDisponiveis =
        (produto.cores || [])
            .filter(corTemEstoque)
            .map(cor => cor.nome);


    const coresHTML =
        coresDisponiveis.length > 0

            ? `
                <div class="cores-lista">

                    ${coresDisponiveis.map(cor => `
                        <span class="cor-nome">
                            ${cor}
                        </span>
                    `).join("")}

                </div>
            `

            : `
                <span class="sem-estoque">
                    Esgotado
                </span>
            `;


    // Eu monto o endereço da página individual do produto.
    const linkProduto =
        `produto.html?produto=${encodeURIComponent(slug)}`;


    return `

        <article class="produto">

            <a
                href="${linkProduto}"
                class="produto-imagem-link"
                aria-label="Ver ${produto.nome}"
            >

                <div class="produto-imagem">

                    <img
                        src="${primeiraImagem}"
                        alt="${produto.nome} - ${primeiraCorDisponivel.nome}"
                        loading="lazy"
                    >

                </div>

            </a>


            <div class="produto-informacoes">

                <span class="produto-categoria">
                    ${produto.categoria}
                </span>


                <h3>
                    ${produto.nome}
                </h3>


                <div class="precos">

                    <strong>
                        R$ ${produto.precoPix.toFixed(2).replace(".", ",")}
                    </strong>

                    <span>
                        no Pix
                    </span>

                </div>


                <div class="preco-cartao">

                    R$
                    ${produto.precoCartao.toFixed(2).replace(".", ",")}
                    no cartão

                </div>


                <div class="cores">

                    <span class="cores-titulo">
                        Cores:
                    </span>

                    ${coresHTML}

                </div>


                <a
                    href="${linkProduto}"
                    class="botao-instagram botao-produto"
                >
                    Ver produto
                </a>

            </div>

        </article>

    `;

}


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function mostrarProdutos(categoria = "Todos") {

    const containerProdutos =
        document.querySelector(".produtos");


    if (!containerProdutos) {
        return;
    }


    // Eu verifico se o arquivo de produtos foi carregado.
    if (
        typeof produtos === "undefined" ||
        !Array.isArray(produtos)
    ) {

        console.error(
            "Erro: produtos.js não foi carregado corretamente."
        );

        containerProdutos.innerHTML = `
            <p class="mensagem-produtos">
                Não foi possível carregar a coleção.
            </p>
        `;

        return;
    }


    let produtosFiltrados = produtos;


    if (categoria !== "Todos") {

        produtosFiltrados =
            produtos.filter(
                produto => produto.categoria === categoria
            );

    }


    produtosFiltrados =
        produtosFiltrados.filter(produtoTemEstoque);


    if (produtosFiltrados.length === 0) {

        containerProdutos.innerHTML = `
            <p class="mensagem-produtos">
                Nenhum produto disponível nesta categoria.
            </p>
        `;

        return;
    }


    containerProdutos.innerHTML =
        produtosFiltrados
            .map(criarCardProduto)
            .join("");

}


// ==========================================
// FILTROS
// ==========================================

const filtros =
    document.querySelectorAll(".filtro");


if (filtros.length > 0) {

    filtros.forEach((filtro) => {

        filtro.addEventListener("click", () => {

            filtros.forEach((item) => {
                item.classList.remove("ativo");
            });


            filtro.classList.add("ativo");


            const categoria =
                filtro.dataset.categoria || "Todos";


            mostrarProdutos(categoria);

        });

    });

}


// ==========================================
// INICIALIZAÇÃO DA COLEÇÃO
// ==========================================

// Eu só tento criar os cards quando existe
// um container de produtos na página atual.

if (document.querySelector(".produtos")) {

    mostrarProdutos("Todos");

}