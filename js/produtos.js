// ==========================================
// PRODUTOS DA ÁUREA
// Aqui ficam as informações de cada produto.
//
// Para controlar o estoque:
// true = disponível
// false = esgotado
//
// Como temos apenas uma unidade de cada peça,
// o estoque é controlado por COR.
// ==========================================

const produtos = [

    // ==========================================
    // TOP TUBE
    // ==========================================

    {
        nome: "Top Tube",
        categoria: "Blusas",

        precoPix: 35.00,
        precoCartao: 38.00,

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/top-tube-frente-branco.webp",
                    "assets/images/produtos/blusas/top-tube-costas-branco.webp"
                ]
            },

            {
                nome: "Azul-Marinho",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/top-tube-azul-marinho-frente.webp",
                    "assets/images/produtos/blusas/top-tube-azul-marinho-costas.webp"
                ]
            }

        ]
    },


    // ==========================================
    // TOP HALTER
    // ==========================================

    {
        nome: "Top Halter",
        categoria: "Blusas",

        precoPix: 38.00,
        precoCartao: 40.00,

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/top-halter-frente-branco.webp",
                    "assets/images/produtos/blusas/top-halter-costas-branco.webp"
                ]
            },

            {
                nome: "Cinza",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/top-halter-frente-cinza.webp",
                    "assets/images/produtos/blusas/top-halter-costas-cinza.webp"
                ]
            }

        ]
    },


    // ==========================================
    // BLUSA OMBRO A OMBRO
    // ==========================================

    {
        nome: "Blusa Ombro a Ombro",
        categoria: "Blusas",

        precoPix: 38.00,
        precoCartao: 40.00,

        cores: [

            {
                nome: "Marrom",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-frente-marrom.webp",
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-costas-marrom.webp"
                ]
            },

            {
                nome: "Preto",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-frente-preto.webp",
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-costas-preto.webp"
                ]
            }

        ]
    },


    // ==========================================
    // BLUSA DECOTE COSTAS
    // ==========================================

    {
        nome: "Blusa Decote Costas",
        categoria: "Blusas",

        precoPix: 40.00,
        precoCartao: 45.00,

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/blusa-decote-costas-frente-branco.webp",
                    "assets/images/produtos/blusas/blusa-decote-costas-costas-branco.webp",
                    "assets/images/produtos/blusas/blusa-decote-costas-lado-branco.webp"
                ]
            }

        ]
    },


    // ==========================================
    // POLO BÁSICA
    // ==========================================

    {
        nome: "Polo Básica",
        categoria: "Blusas",

        precoPix: 40.00,
        precoCartao: 45.00,

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/polo-basica-frente-branco.webp",
                    "assets/images/produtos/blusas/polo-basica-costas-branco.webp"
                ]
            },

            {
                nome: "Marrom",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/blusas/polo-basica-frente-marrom.webp",
                    "assets/images/produtos/blusas/polo-basica-costas-marrom.webp"
                ]
            }

        ]
    },


    // ==========================================
    // CALÇA JEANS
    // ==========================================

    {
        nome: "Calça Jeans",
        categoria: "Calças",

        precoPix: 80.00,
        precoCartao: 85.00,

        cores: [

            {
                nome: "Gel Azul",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-gel-azul-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-gel-azul-costas.webp"
                ]
            },

            {
                nome: "Gel Preta",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-gel-preta-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-gel-preta-costas.webp"
                ]
            },

            {
                nome: "Jeans Azul",

                disponivel: true,

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-azul-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-azul-costas.webp"
                ]
            }

        ]
    }

];