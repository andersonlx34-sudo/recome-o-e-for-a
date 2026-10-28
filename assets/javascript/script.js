
"use strict";

// ============================================
// RECOMEÇO & FORÇA 2.0
// ============================================

const $ = (id) => document.getElementById(id);

const dinheiro = (valor) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

const escapar = (valor) =>
    String(valor).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);

// ============================================
// 1. BANCO DE DADOS DOS PLANOS
// ============================================

const planos = {
    musculo: {
        titulo: "Força e desenvolvimento muscular",
        descricao:
            "Priorize aprender os movimentos, progredir gradualmente e descansar adequadamente.",

        treino: [
            {
                titulo: "Segunda — corpo todo",
                texto: "Agachamento adaptado, flexão na parede ou no apoio, remada com elástico e exercícios de estabilidade."
            },
            {
                titulo: "Quarta — força e coordenação",
                texto: "Pratique movimentos de empurrar, puxar e trabalhar as pernas, respeitando sua experiência."
            },
            {
                titulo: "Sexta — corpo todo",
                texto: "Repita movimentos que já domina e observe a técnica. Peça orientação se usar cargas."
            }
        ],

        dica:
            "O desenvolvimento muscular depende de treino apropriado, alimentação suficiente, descanso e tempo. Não é preciso treinar até a exaustão."
    },

    saude: {
        titulo: "Condicionamento e disposição",
        descricao:
            "Combine atividades prazerosas, força, mobilidade e recuperação.",

        treino: [
            {
                titulo: "Segunda — movimento",
                texto: "Faça uma caminhada confortável, dance ou pratique uma atividade de sua preferência."
            },
            {
                titulo: "Quarta — força",
                texto: "Experimente movimentos básicos para pernas, costas e braços, adaptados ao seu nível."
            },
            {
                titulo: "Sexta — atividade aeróbica",
                texto: "Caminhe, pedale, nade ou pratique um esporte de que você goste."
            }
        ],

        dica:
            "Aumente o tempo ou a dificuldade aos poucos. Se estiver começando, sessões curtas também contam."
    },

    emagrecer: {
        titulo: "Saúde e composição corporal",
        descricao:
            "Construa uma rotina sustentável, sem dietas extremas nem punição pelo que come.",

        treino: [
            {
                titulo: "Segunda — corpo todo",
                texto: "Movimentos adaptados de força, mobilidade e equilíbrio."
            },
            {
                titulo: "Quarta — atividade prazerosa",
                texto: "Caminhada, dança, bicicleta ou outro exercício confortável."
            },
            {
                titulo: "Sexta — força e coordenação",
                texto: "Pratique movimentos básicos com atenção à técnica e ao descanso."
            }
        ],

        dica:
            "O peso corporal não define sua saúde. Evite pular refeições ou restringir alimentos; busque orientação profissional para necessidades individuais."
    },

    praia: {
        titulo: "Força, mobilidade e estilo de vida ativo",
        descricao:
            "Combine treinamento de força, condicionamento, mobilidade e atividades ao ar livre.",

        treino: [
            {
                titulo: "Segunda — força",
                texto: "Movimentos adaptados para membros superiores e inferiores."
            },
            {
                titulo: "Quarta — cardio e mobilidade",
                texto: "Caminhada, bicicleta, dança ou natação, seguida de movimentos leves de mobilidade."
            },
            {
                titulo: "Sexta — corpo todo",
                texto: "Pratique movimentos de força que você já conhece e finalize com uma atividade agradável."
            }
        ],

        dica:
            "Um estilo de vida ativo não depende de alcançar um corpo específico. Foque na capacidade física, na disposição e em hábitos sustentáveis."
    }
};

// ============================================
// 2. ALIMENTAÇÃO POR ORÇAMENTO E PREFERÊNCIA
// ============================================

const alimentos = {
    normal: {
        base: [
            {
                nome: "Arroz e feijão",
                detalhe: "Base versátil para almoço e jantar."
            },
            {
                nome: "Ovos",
                detalhe: "Opção prática para diferentes refeições."
            },
            {
                nome: "Aveia e banana",
                detalhe: "Podem complementar o café da manhã ou o lanche."
            },
            {
                nome: "Frango ou sardinha",
                detalhe: "Compare o preço por quilo e alterne as opções."
            },
            {
                nome: "Legumes e frutas da estação",
                detalhe: "Escolha os que estiverem acessíveis e de que você goste."
            },
            {
                nome: "Leite ou iogurte",
                detalhe: "Opções adicionais se forem adequadas à sua alimentação."
            }
        ],

        extra: [
            "Pão com ovos ou queijo.",
            "Vitamina de banana com aveia e leite.",
            "Iogurte com fruta e aveia.",
            "Sanduíche caseiro com frango desfiado."
        ]
    },

    vegetariana: {
        base: [
            {
                nome: "Arroz e feijão",
                detalhe: "Combinação versátil de cereais e leguminosas."
            },
            {
                nome: "Lentilha, ervilha ou grão-de-bico",
                detalhe: "Alternativas para variar as leguminosas."
            },
            {
                nome: "Ovos e laticínios, se consumidos",
                detalhe: "Fontes adicionais de proteína para quem os inclui."
            },
            {
                nome: "Soja e derivados",
                detalhe: "Tofu e proteína de soja podem ajudar a variar as refeições."
            },
            {
                nome: "Aveia, frutas e vegetais",
                detalhe: "Contribuem para a variedade alimentar."
            }
        ],

        extra: [
            "Sanduíche com ovo ou tofu.",
            "Aveia com fruta e iogurte, se consumido.",
            "Arroz com feijão e legumes.",
            "Lentilha com batata e vegetais."
        ]
    },

    semleite: {
        base: [
            {
                nome: "Arroz e feijão",
                detalhe: "Base prática para refeições variadas."
            },
            {
                nome: "Ovos",
                detalhe: "Opção de proteína se você consumir ovos."
            },
            {
                nome: "Frango ou sardinha",
                detalhe: "Compare preços e escolha conforme suas preferências."
            },
            {
                nome: "Soja, lentilha e ervilha",
                detalhe: "Alternativas vegetais para variar a proteína."
            },
            {
                nome: "Aveia, banana e frutas",
                detalhe: "Opções versáteis para cafés da manhã e lanches."
            }
        ],

        extra: [
            "Banana com aveia e bebida de soja fortificada.",
            "Sanduíche com ovo, se consumido.",
            "Arroz, feijão e vegetais.",
            "Vitamina com bebida vegetal adequada às suas necessidades."
        ]
    }
};

// ============================================
// 3. SELEÇÃO DE OBJETIVO
// ============================================

const botoesObjetivo = document.querySelectorAll("[data-goal]");
const seletorObjetivo = $("goalSelect");

function selecionarObjetivo(objetivo) {
    if (!planos[objetivo]) return;

    botoesObjetivo.forEach((botao) => {
        const selecionado = botao.dataset.goal === objetivo;

        botao.classList.toggle("selected", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });

    if (seletorObjetivo) {
        seletorObjetivo.value = objetivo;
    }
}

botoesObjetivo.forEach((botao) => {
    botao.addEventListener("click", () => {
        selecionarObjetivo(botao.dataset.goal);

        $("planejador")?.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "start"
        });
    });
});

if (seletorObjetivo) {
    seletorObjetivo.addEventListener("change", () => {
        selecionarObjetivo(seletorObjetivo.value);
    });
}

// ============================================
// 4. GERADOR DE PLANO
// ============================================

const formulario = $("plannerForm");

if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const objetivo = $("goalSelect").value;
        const experiencia = $("experience").value;
        const orcamentoAlimentacao = Number($("foodBudget").value);
        const orcamentoTreino = Number($("gymBudget").value);
        const local = $("place").value;
        const preferencia = $("foodStyle").value;

        if (!planos[objetivo]) {
            alert("Escolha um objetivo para gerar seu plano.");
            return;
        }

        if (
            !Number.isFinite(orcamentoAlimentacao) ||
            !Number.isFinite(orcamentoTreino) ||
            orcamentoAlimentacao < 0 ||
            orcamentoTreino < 0 ||
            orcamentoAlimentacao > 100000 ||
            orcamentoTreino > 100000
        ) {
            alert("Informe valores válidos para seu orçamento.");
            return;
        }

        const plano = planos[objetivo];
        const selecaoAlimentos = alimentos[preferencia] || alimentos.normal;

        $("resultTitle").textContent = plano.titulo;

        $("resultIntro").textContent =
            plano.descricao +
            (experiencia === "iniciante"
                ? " Como iniciante, comece com movimentos simples e orientação adequada."
                : " Continue progredindo gradualmente, mantendo a técnica e o descanso.");

        // Treino ajustado ao local e ao orçamento.
        const treinoPersonalizado = plano.treino.map((item) => {
            let texto = item.texto;

            if (local === "casa") {
                texto += " Adapte os exercícios ao espaço e aos recursos disponíveis em casa.";
            } else if (local === "ar livre") {
                texto += " Dê preferência a um local seguro, iluminado e adequado à atividade.";
            } else {
                texto += " Na academia, peça orientação sobre a execução dos exercícios.";
            }

            return {
                titulo: item.titulo,
                texto
            };
        });

        if (orcamentoTreino === 0) {
            treinoPersonalizado.push({
                titulo: "Alternativa sem mensalidade",
                texto: "Você pode explorar caminhadas, atividades ao ar livre e movimentos básicos em casa. Equipamentos não são obrigatórios para começar."
            });
        } else {
            treinoPersonalizado.push({
                titulo: "Planejamento de gastos",
                texto: `Você definiu ${dinheiro(orcamentoTreino)} por mês para atividade física. Compare opções e confira se o valor cobre matrícula, mensalidade e transporte.`
            });
        }

        $("trainingResult").innerHTML = `
            <ul class="result-list">
                ${treinoPersonalizado.map((item) => `
                    <li>
                        <strong>${escapar(item.titulo)}</strong>
                        ${escapar(item.texto)}
                    </li>
                `).join("")}
            </ul>

            <div class="result-note">
                ${escapar(plano.dica)}
            </div>
        `;

        // Ideias de refeições adequadas à preferência.
        const refeicoes = [
            {
                nome: "Café da manhã",
                texto: selecaoAlimentos.extra[0]
            },
            {
                nome: "Almoço",
                texto: selecaoAlimentos.base[0].nome +
                    ", " + selecaoAlimentos.base[1].nome +
                    " e vegetais conforme a disponibilidade."
            },
            {
                nome: "Lanche",
                texto: selecaoAlimentos.extra[1]
            },
            {
                nome: "Jantar",
                texto: selecaoAlimentos.extra[2]
            }
        ];

        $("foodResult").innerHTML = `
            <ul class="result-list">
                ${refeicoes.map((item) => `
                    <li>
                        <strong>${escapar(item.nome)}</strong>
                        ${escapar(item.texto)}
                    </li>
                `).join("")}
            </ul>

            <h5 class="mt-3 mb-3">Lista de alimentos para considerar</h5>

            <ul class="result-list">
                ${selecaoAlimentos.base.map((item) => `
                    <li>
                        <strong>${escapar(item.nome)}</strong>
                        ${escapar(item.detalhe)}
                    </li>
                `).join("")}
            </ul>
        `;

        // Orçamento: valores de entrada do usuário, não preços de mercado.
        $("budgetResult").innerHTML = `
            <div class="budget-summary">
                <div class="budget-item">
                    <span>Limite mensal para alimentação extra</span>
                    <strong>${dinheiro(orcamentoAlimentacao)}</strong>
                </div>

                <div class="budget-item">
                    <span>Limite mensal para atividade física</span>
                    <strong>${dinheiro(orcamentoTreino)}</strong>
                </div>

                <div class="budget-item">
                    <span>Limite combinado informado</span>
                    <strong>${dinheiro(orcamentoAlimentacao + orcamentoTreino)}</strong>
                </div>

                <div class="budget-item">
                    <span>Prioridade recomendada</span>
                    <strong>Alimentação e segurança</strong>
                </div>
            </div>

            <div class="result-note mt-3">
                ${orcamentoAlimentacao === 0
                    ? "Você informou que não tem orçamento extra para alimentação. Comece avaliando as refeições já disponíveis em casa; não é preciso comprar suplementos."
                    : "Use o valor informado como teto de gasto. Compare preços reais, priorize os alimentos que faltam em casa e não presuma que esse valor cubra toda a alimentação mensal."}

                ${orcamentoTreino === 0
                    ? " Existem opções de atividade física sem mensalidade."
                    : " Não comprometa despesas essenciais para pagar uma academia."}
            </div>
        `;

        const resultados = $("planResults");

        resultados.classList.remove("d-none");

        resultados.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "start"
        });
    });
}

// ============================================
// 5. CALCULADORA DE CUSTO DO WHEY
// ============================================

const botaoCalcularWhey = $("calculateWhey");

if (botaoCalcularWhey) {
    botaoCalcularWhey.addEventListener("click", () => {
        const preco = Number($("wheyPrice").value);
        const porcoes = Number($("wheyServings").value);
        const resultado = $("wheyCost");

        if (
            !Number.isFinite(preco) ||
            !Number.isFinite(porcoes) ||
            preco <= 0 ||
            porcoes <= 0
        ) {
            resultado.textContent =
                "Informe um preço positivo e a quantidade de porções.";
            return;
        }

        const custoPorPorcao = preco / porcoes;

        resultado.textContent =
            `Custo aproximado por porção: ${dinheiro(custoPorPorcao)}. ` +
            "Confira a porção indicada no rótulo e compare produtos equivalentes.";
    });
}

// ============================================
// 6. PLAYER DE MÚSICA
// ============================================

const audio = $("relaxAudio");
const audioStatus = $("audioStatus");

if (audio && audioStatus) {
    audio.addEventListener("play", () => {
        audioStatus.textContent = "Música em reprodução. Ajuste o volume para seu conforto.";
    });

    audio.addEventListener("pause", () => {
        audioStatus.textContent = "Música pausada.";
    });

    audio.addEventListener("ended", () => {
        audioStatus.textContent = "Faixa concluída. Você pode reproduzi-la novamente.";
    });

    audio.addEventListener("error", () => {
        audioStatus.textContent =
            "Não foi possível carregar a faixa. Confira o arquivo relaxamento.mp3 na pasta assets/audio.";
    });
}

// ============================================
// 7. RESPIRAÇÃO GUIADA
// ============================================

let respiracaoAtiva = false;
let temporizadorRespiracao = null;
let faseAtual = 0;

const fases = [
    {
        nome: "Inspire",
        status: "Inspire suavemente",
        instrucao: "Puxe o ar de forma natural, sem forçar.",
        classe: "inhale",
        tempo: 4000
    },
    {
        nome: "Expire",
        status: "Solte o ar devagar",
        instrucao: "Expire confortavelmente, sem prender a respiração.",
        classe: "exhale",
        tempo: 6000
    }
];

function atualizarRespiracao() {
    if (!respiracaoAtiva) return;

    const fase = fases[faseAtual];

    $("breathPhase").textContent = fase.nome;
    $("breathStatus").textContent = fase.status;
    $("breathInstruction").textContent = fase.instrucao;

    const circulo = $("breathCircle");
    circulo.classList.remove("inhale", "exhale");
    circulo.classList.add(fase.classe);

    temporizadorRespiracao = window.setTimeout(() => {
        if (!respiracaoAtiva) return;

        faseAtual = (faseAtual + 1) % fases.length;
        atualizarRespiracao();
    }, fase.tempo);
}

function iniciarRespiracao() {
    if (respiracaoAtiva) return;

    respiracaoAtiva = true;
    faseAtual = 0;

    $("startBreathing").disabled = true;
    $("stopBreathing").disabled = false;

    atualizarRespiracao();
}

function pararRespiracao() {
    respiracaoAtiva = false;

    if (temporizadorRespiracao !== null) {
        clearTimeout(temporizadorRespiracao);
        temporizadorRespiracao = null;
    }

    $("breathCircle").classList.remove("inhale", "exhale");
    $("breathPhase").textContent = "Calma";
    $("breathStatus").textContent = "Faça uma pausa";
    $("breathInstruction").textContent =
        "Respire naturalmente e continue somente se estiver confortável.";

    $("startBreathing").disabled = false;
    $("stopBreathing").disabled = true;
}

$("startBreathing")?.addEventListener("click", iniciarRespiracao);
$("stopBreathing")?.addEventListener("click", pararRespiracao);

// ============================================
// 8. ANIMAÇÕES AO ROLAR
// ============================================

const elementosReveal = document.querySelectorAll(".reveal");

const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduzirMovimento) {
    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                obs.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementosReveal.forEach((elemento) => {
        observador.observe(elemento);
    });
} else {
    elementosReveal.forEach((elemento) => {
        elemento.classList.add("visible");
    });
}

// ============================================
// 9. MENU MOBILE
// ============================================

document.querySelectorAll("#menu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        const menu = $("menu");

        if (
            menu &&
            menu.classList.contains("show") &&
            typeof bootstrap !== "undefined"
        ) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

// ============================================
// 10. BOTÃO VOLTAR AO TOPO
// ============================================

const botaoTopo = $("backToTop");

function atualizarBotaoTopo() {
    botaoTopo?.classList.toggle("visible", window.scrollY > 450);
}

window.addEventListener("scroll", atualizarBotaoTopo, {
    passive: true
});

atualizarBotaoTopo();

botaoTopo?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reduzirMovimento ? "auto" : "smooth"
    });
});

// ============================================
// 11. ANO AUTOMÁTICO
// ============================================

$("currentYear").textContent = new Date().getFullYear();

console.log("Recomeço & Força 2.0 carregado!");
