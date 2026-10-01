// ==========================================
// PRODUTOS ÁUREA
// Eu cadastro aqui todas as informações
// dos produtos disponíveis na loja.
// ==========================================


const produtos = [

    // ==========================================
    // TOP TUBE
    // ==========================================

    {
        nome: "Top Tube",

        slug: "top-tube",

        categoria: "Blusas",

        precoPix: 35.00,

        precoCartao: 38.00,

        descricao: `Descubra o conforto e a versatilidade do nosso Tube Top, confeccionado em tecido Suplex (92% Poliéster, 8% Elastano) que se ajusta perfeitamente ao corpo. O modelo possui forro duplo na área dos seios, proporcionando ainda mais conforto. Ideal para qualquer ocasião, do casual ao elegante.

Adicione esta peça essencial ao seu guarda-roupa e aproveite a combinação perfeita de estilo e praticidade!`,

        observacao: "Modelo veste tamanho P.",

        tecido: "Suplex",

        composicao: "92% Poliéster, 8% Elastano",

        tamanhos: ["P", "M", "G"],

        medidas: {

            P: {
                peito: 70,
                comprimento: 36,
                cintura: 70
            },

            M: {
                peito: 90,
                comprimento: 38,
                cintura: 90
            },

            G: {
                peito: 96,
                comprimento: 41,
                cintura: 96
            }

        },

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

                imagens: [
                    "assets/images/produtos/blusas/top-tube-frente-branco.webp",
                    "assets/images/produtos/blusas/top-tube-costas-branco.webp"
                ]
            },

            {
                nome: "Azul-Marinho",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

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

        slug: "top-halter",

        categoria: "Blusas",

        precoPix: 38.00,

        precoCartao: 40.00,

        descricao: `Blusa em suplex de alta qualidade, com toque macio, ótima elasticidade e ajuste perfeito ao corpo. O modelo halter com decote reto valoriza o colo e garante um visual moderno e versátil.

Confortável, com forro duplo na parte dos seios e perfeita para compor looks do casual ao elegante.

Uma básica indispensável no guarda-roupa!`,

        observacao: "Modelo veste tamanho P.",

        tecido: "Suplex",

        composicao: "92% Poliéster, 8% Elastano",

        tamanhos: ["P", "M", "G"],

        medidas: {

            P: {
                peito: 68,
                comprimento: 30,
                cintura: 64
            },

            M: {
                peito: 72,
                comprimento: 33,
                cintura: 70
            },

            G: {
                peito: 78,
                comprimento: 35,
                cintura: 76
            }

        },

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

                imagens: [
                    "assets/images/produtos/blusas/top-halter-frente-branco.webp",
                    "assets/images/produtos/blusas/top-halter-costas-branco.webp"
                ]
            },

            {
                nome: "Cinza",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

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

        slug: "blusa-ombro-a-ombro",

        categoria: "Blusas",

        precoPix: 38.00,

        precoCartao: 40.00,

        descricao: `Descubra o charme irresistível da Blusa Ombro a Ombro, confeccionada em tecido Suplex (92% Poliéster, 8% Elastano) que oferece um excelente ajuste ao corpo. Com forro duplo para maior conforto, esta peça é perfeita para qualquer ocasião, do casual ao sofisticado.`,

        observacao: "Modelo veste tamanho P.",

        tecido: "Suplex",

        composicao: "92% Poliéster, 8% Elastano",

        tamanhos: ["P", "M", "G"],

        medidas: {

            P: {
                peito: 90,
                comprimento: 46,
                cintura: 90
            },

            M: {
                peito: 94,
                comprimento: 46,
                cintura: 94
            },

            G: {
                peito: 100,
                comprimento: 48,
                cintura: 100
            }

        },

        observacaoMedidas:
            "As medidas podem variar 2 cm para mais ou para menos.",

        cores: [

            {
                nome: "Marrom",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

                imagens: [
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-frente-marrom.webp",
                    "assets/images/produtos/blusas/blusa-ombro-a-ombro-costas-marrom.webp"
                ]
            },

            {
                nome: "Preto",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

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

        slug: "blusa-decote-costas",

        categoria: "Blusas",

        precoPix: 40.00,

        precoCartao: 45.00,

        descricao: `Apaixone-se pela elegância e conforto da nossa Blusa Decote Costas. Confeccionada em tecido suplex (92% poliéster, 8% elastano), esta peça oferece um ajuste perfeito e um lindo decote nas costas. Com forro duplo, garante segurança e evita transparências. Ideal para compor looks modernos e sofisticados.`,

        observacao: "Modelo veste tamanho P.",

        tecido: "Suplex",

        composicao: "92% Poliéster, 8% Elastano",

        tamanhos: ["P", "M", "G"],

        medidas: {

            P: {
                peito: 84,
                comprimento: 46,
                cintura: 84
            },

            M: {
                peito: 90,
                comprimento: 46,
                cintura: 90
            },

            G: {
                peito: 100,
                comprimento: 50,
                cintura: 100
            }

        },

        observacaoMedidas:
            "As medidas podem variar 2 cm para mais ou para menos.",

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                estoque: {
                    P: 1,
                    M: 1,
                    G: 1
                },

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

        slug: "polo-basica",

        categoria: "Blusas",

        precoPix: 40.00,

        precoCartao: 45.00,

        descricao: `A escolha certa para quem quer arrasar no casual ou no despojado! Feita em tecido Ribana (50% algodão, 47% poliéster e 3% elastano). Seja elegante ou descontraído, esta peça te salva em qualquer ocasião.`,

        observacao: "Tamanho único, veste do 36 ao 42.",

        tecido: "Ribana",

        composicao:
            "50% Algodão, 47% Poliéster e 3% Elastano",

        tamanhos: ["Único"],

        medidas: {

            "Único": {
                peito: 106,
                comprimento: 56,
                cintura: 106
            }

        },

        cores: [

            {
                nome: "Branco",

                disponivel: true,

                estoque: {
                    "Único": 1
                },

                imagens: [
                    "assets/images/produtos/blusas/polo-basica-frente-branco.webp",
                    "assets/images/produtos/blusas/polo-basica-costas-branco.webp"
                ]
            },

            {
                nome: "Marrom",

                disponivel: true,

                estoque: {
                    "Único": 1
                },

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

        slug: "calca-jeans",

        categoria: "Calças",

        precoPix: 80.00,

        precoCartao: 85.00,

        descricao: `Nossa Calça Jeans foi escolhida para trazer versatilidade e praticidade para os seus looks. Uma peça fácil de combinar e perfeita para diferentes ocasiões.`,

        observacao:
            "Consulte a disponibilidade do tamanho desejado.",

        tecido: "Jeans",

        composicao:
            "Consulte a etiqueta da peça.",

        tamanhos: [
            "34",
            "36",
            "38",
            "40",
            "42",
            "44",
            "46"
        ],

        medidas: {},

        observacaoMedidas:
            "As medidas específicas da calça serão adicionadas posteriormente.",

        cores: [

            {
                nome: "Gel Azul",

                disponivel: true,

                estoque: {
                    "34": 1,
                    "36": 1,
                    "38": 1,
                    "40": 1,
                    "42": 1,
                    "44": 1,
                    "46": 1
                },

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-gel-azul-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-gel-azul-costas.webp"
                ]
            },

            {
                nome: "Gel Preta",

                disponivel: true,

                estoque: {
                    "34": 1,
                    "36": 1,
                    "38": 1,
                    "40": 1,
                    "42": 1,
                    "44": 1,
                    "46": 1
                },

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-gel-preta-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-gel-preta-costas.webp"
                ]
            },

            {
                nome: "Jeans Azul",

                disponivel: true,

                estoque: {
                    "34": 1,
                    "36": 1,
                    "38": 1,
                    "40": 1,
                    "42": 1,
                    "44": 1,
                    "46": 1
                },

                imagens: [
                    "assets/images/produtos/calcas/calca-jeans-azul-frente.webp",
                    "assets/images/produtos/calcas/calca-jeans-azul-costas.webp"
                ]
            }

        ]

    }

];