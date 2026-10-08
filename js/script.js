
// ==========================================
// SCRIPT PRINCIPAL DA ÁUREA
// Eu cuido aqui das interações gerais,
// filtros, cards, menu e carrinho do site.
// ==========================================


// ==========================================
// MENU MOBILE
// ==========================================

const menuMobile = document.querySelector(".menu-mobile");
const nav = document.querySelector(".nav");

if (menuMobile && nav) {

    menuMobile.addEventListener("click", () => {

        // Eu alterno a classe que já existe no CSS
        // para abrir e fechar o menu no celular.
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


function produtoTemEstoque(produto) {

    if (!produto || !Array.isArray(produto.cores)) {
        return false;
    }

    return produto.cores.some(corTemEstoque);

}


// ==========================================
// CRIAÇÃO DO CARD
// Eu mantenho aqui exatamente as classes
// que já existem no meu style.css.
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
    // eu gero automaticamente a partir do nome.
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


    // Eu uso as mesmas classes que já existem
    // no CSS original da Áurea para não perder o visual.
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
                        R$ ${Number(produto.precoPix).toFixed(2).replace(".", ",")}
                    </strong>

                    <span>
                        no Pix
                    </span>

                </div>


                <div class="preco-cartao">

                    R$
                    ${Number(produto.precoCartao).toFixed(2).replace(".", ",")}
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


    // Eu filtro somente quando uma categoria específica
    // foi escolhida.
    if (categoria !== "Todos") {

        produtosFiltrados =
            produtos.filter(
                produto => produto.categoria === categoria
            );

    }


    // Eu não mostro produtos que não possuem estoque.
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
// FILTROS AUTOMÁTICOS
// Eu crio as categorias diretamente a partir
// do produtos.js para não precisar alterar o
// HTML sempre que eu cadastrar uma categoria nova.
// ==========================================

function criarFiltrosAutomaticos() {

    const containerFiltros =
        document.querySelector(".filtros");


    if (!containerFiltros) {
        return;
    }


    if (
        typeof produtos === "undefined" ||
        !Array.isArray(produtos)
    ) {
        return;
    }


    // Eu pego somente categorias únicas.
    const categorias = [
        "Todos",
        ...new Set(
            produtos
                .map(produto => produto.categoria)
                .filter(Boolean)
        )
    ];


    containerFiltros.innerHTML =
        categorias
            .map((categoria, index) => {

                return `
                    <button
                        type="button"
                        class="filtro ${index === 0 ? "ativo" : ""}"
                        data-categoria="${categoria}"
                    >
                        ${categoria}
                    </button>
                `;

            })
            .join("");


    // Eu adiciono o comportamento dos botões depois
    // que eles foram criados pelo JavaScript.
    const filtros =
        containerFiltros.querySelectorAll(".filtro");


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
// CARRINHO
// ==========================================

const CHAVE_CARRINHO = "aureaCarrinho";


// Eu atualizo o número mostrado no ícone
// do carrinho sempre que a quantidade muda.
function atualizarContadorCarrinho() {

    const contador =
        document.querySelector(".contador-carrinho");


    if (!contador) {
        return;
    }


    let carrinho = [];

    try {

        carrinho =
            JSON.parse(
                localStorage.getItem(CHAVE_CARRINHO)
            ) || [];

    } catch (erro) {

        carrinho = [];

    }


    const quantidade =
        carrinho.reduce(
            (total, item) => total + Number(item.quantidade || 0),
            0
        );


    contador.textContent = quantidade;


    if (quantidade > 0) {
        contador.classList.add("visivel");
    } else {
        contador.classList.remove("visivel");
    }

}


// Eu deixo essa função disponível para os outros
// arquivos do projeto também utilizarem.
window.atualizarContadorCarrinho =
    atualizarContadorCarrinho;


// ==========================================
// ÍCONE DO CARRINHO NO HEADER
// ==========================================

function criarIconeCarrinho() {

    const headerContainer =
        document.querySelector(".header-container");


    if (!headerContainer) {
        return;
    }


    // Eu não crio o ícone novamente caso ele já exista.
    if (document.querySelector(".link-carrinho")) {
        return;
    }


    const linkCarrinho =
        document.createElement("a");


    // Eu não mando mais o usuário para carrinho.html.
    // O carrinho agora abre como uma lateral na própria página.
    linkCarrinho.href = "#";
    linkCarrinho.className = "link-carrinho";
    linkCarrinho.setAttribute(
        "aria-label",
        "Abrir carrinho"
    );


    linkCarrinho.innerHTML = `

        <span class="icone-carrinho" aria-hidden="true">
            🛒
        </span>

        <span class="contador-carrinho">
            0
        </span>

    `;


    headerContainer.appendChild(linkCarrinho);


    // Eu evito que o clique tente navegar para outra página.
    // O carrinho.js vai assumir a abertura da lateral.
    linkCarrinho.addEventListener("click", (evento) => {

        evento.preventDefault();

        // Eu disparo um evento para o carrinho lateral abrir.
        document.dispatchEvent(
            new CustomEvent("abrirCarrinho")
        );

    });


    atualizarContadorCarrinho();

}


// ==========================================
// ÍCONES DO RODAPÉ
// ==========================================

function criarIconesRodape() {

    const footerSocial =
        document.querySelector(".footer-social");


    if (!footerSocial) {
        return;
    }


    // Eu coloco os links sociais aqui para manter
    // o mesmo rodapé em todas as páginas do site.
    footerSocial.innerHTML = `

        <a
            href="https://www.instagram.com/useaurea.m/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
        >

            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                ></rect>

                <circle
                    cx="12"
                    cy="12"
                    r="4"
                ></circle>

                <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                ></circle>
            </svg>

            <span>
                Instagram
            </span>

        </a>


        <a
            href="https://wa.me/5511992958541"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
        >

            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
            >
                <path
                    d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"
                ></path>

                <path
                    d="M8.5 8.5c.2-.5.5-.6.9-.6h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c.7 1.2 1.6 2.1 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.6c0 .4-.1.7-.6.9-.4.2-1.1.2-1.7 0-2.9-.8-5.2-3.1-6-6-.2-.6-.2-1.3 0-1.7Z"
                ></path>
            </svg>

            <span>
                WhatsApp
            </span>

        </a>

    `;

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

function iniciarSite() {

    // Eu crio os filtros automaticamente somente
    // quando estou em uma página que possui filtros.
    criarFiltrosAutomaticos();


    // Eu só monto os produtos quando existe
    // o espaço destinado aos cards.
    if (document.querySelector(".produtos")) {
        mostrarProdutos("Todos");
    }


    // Eu adiciono o carrinho ao cabeçalho.
    criarIconeCarrinho();


    // Eu atualizo os links sociais do rodapé.
    criarIconesRodape();


    // Eu atualizo o contador logo ao abrir a página.
    atualizarContadorCarrinho();

}


// Eu inicio tudo depois que o HTML estiver pronto.
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarSite
    );

} else {

    iniciarSite();

}