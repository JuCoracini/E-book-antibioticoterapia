document.addEventListener("DOMContentLoaded", () => {
  const capitulos = [
    {
      numero: 1,
      titulo: "Fundamentos Conceituais dos Antibacterianos",
      inicio: 1,
      paginas: [
        "Evolução da Antibioticoterapia",
        "Marcos Históricos da Antibioticoterapia",
        "Bases Conceituais da Antibioticoterapia",
        "Toxicidade Seletiva",
        "Janela Terapêutica",
        "Espectro de Ação",
        "Colonização, Contaminação e Infecção",
        "Terapia Empírica e Terapia Dirigida",
        "Profilaxia Antibacteriana",
        "Quiz de revisão"
      ]
    },
    {
      numero: 2,
      titulo: "Mecanismos de Ação dos Antibacterianos",
      inicio: 11,
      paginas: [
        "Alvos celulares dos antibacterianos",
        "Classificação dos antibacterianos segundo o alvo celular",
        "Inibição da síntese da parede celular",
        "Ação sobre a membrana citoplasmática",
        "Inibição da síntese proteica",
        "Ação dos antibacterianos sobre os ácidos nucleicos",
        "Inibição do metabolismo do folato",
        "Atividade bactericida e bacteriostática",
        "Quiz de revisão"
      ]
    },
    {
      numero: 3,
      titulo: "Mecanismos de Resistência Bacteriana",
      inicio: 20,
      paginas: [
        "Resistência bacteriana e pressão seletiva",
        "Resistência intrínseca e resistência adquirida",
        "Mutações e seleção clonal",
        "Transferência horizontal de genes",
        "Inativação enzimática por β-lactamases",
        "Alteração do alvo molecular",
        "Redução da permeabilidade e bombas de efluxo",
        "Resistência cruzada",
        "Multirresistência e impacto clínico",
        "Quiz de revisão"
      ]
    },
    {
      numero: 4,
      titulo: "Farmacocinética e Farmacodinâmica Aplicadas",
      inicio: 30,
      paginas: [
        "Exposição ao antibacteriano e seleção de resistência",
        "Índices farmacodinâmicos: tempo, concentração e exposição total",
        "Via de administração",
        "Via de administração e determinação da exposição ao antibacteriano",
        "Via de administração e implicações clínicas na resposta terapêutica",
        "Penetração tecidual e compartimentos infecciosos",
        "Biofilme e microambiente infeccioso",
        "Exposição antimicrobiana e dinâmica evolutiva",
        "Quiz de revisão"
      ]
    },
    {
      numero: 5,
      titulo: "Laboratório de Microbiologia e Interpretação do Antibiograma",
      inicio: 39,
      paginas: [
        "O laboratório de microbiologia",
        "Bacterioscopia",
        "Coloração de Gram",
        "Gram-positivas e Gram-negativas",
        "Identificação bacteriana",
        "Identificação de bactérias na prática",
        "Teste de suscetibilidade aos antibacterianos",
        "Como o laboratório interpreta o teste de suscetibilidade",
        "Como o médico interpreta S, I e R",
        "Como interpretar as observações do laudo",
        "β-lactamases de espectro estendido",
        "β-lactamases AmpC e resistência emergente",
        "Carbapenemases",
        "MRSA, VRE, resistência MLSB induzível e HLAR",
        "Quiz de revisão"
      ]
    },
    {
      numero: 6,
      titulo: "Associação Terapêutica e Consequências do Uso Indiscriminado",
      inicio: 54,
      paginas: [
        "Associação terapêutica: por que associar antibacterianos?",
        "Como dois antibacterianos podem interagir",
        "Associação para ampliar a cobertura",
        "Do tratamento empírico ao descalonamento",
        "Associação para prevenir resistência",
        "Quando a associação não corrige o problema",
        "Consequências do uso indiscriminado de antibacterianos",
        "Quiz de revisão"
      ]
    },
    {
      numero: 7,
      titulo: "Principais Efeitos Adversos por Classe",
      inicio: 62,
      paginas: [
        "Os efeitos adversos dos antibacterianos",
        "Inibidores da síntese da parede celular",
        "Inibidores da síntese proteica",
        "Inibidores da síntese de ácidos nucleicos",
        "Antibacterianos que atuam na membrana bacteriana",
        "Inibidores da via do folato",
        "Quiz de revisão"
      ]
    },
    {
      numero: 8,
      titulo: "Antibioticoterapia nas Principais Infecções",
      inicio: 69,
      paginas: [
        "Antibioticoterapia nas principais infecções",
        "Infecções respiratórias",
        "Infecções urinárias",
        "Infecções intra-abdominais",
        "Bacteremia e sepse",
        "Infecções de pele e partes moles",
        "Quiz de revisão"
      ]
    },
    {
      numero: 9,
      titulo: "Comunicação em Antibioticoterapia",
      inicio: 76,
      paginas: [
        "Comunicação em antibioticoterapia",
        "Explicando quando o antibacteriano não é necessário",
        "Orientando sobre a duração do tratamento",
        "Automedicação e uso inadequado de antibacterianos",
        "Orientando sobre efeitos adversos",
        "Quiz de revisão"
      ]
    },
    {
      numero: 10,
      titulo: "Simulação Clínica Integrada em Antibioticoterapia",
      inicio: 82,
      paginas: [
        "Decisões clínicas em antibioticoterapia",
        "Simulação 1 — Decisões diante de novos dados",
        "Simulação 2 — Alerta do laboratório: ESBL",
        "Simulação 3 — Resistência em Gram-positivos",
        "Simulação 4 — Cultura positiva significa infecção?",
        "Simulação 5 — Alta segura: o paciente compreendeu?",
        "Desafio final — O antibiograma não decide sozinho"
      ]
    }
  ];

  const listaCapitulos = document.getElementById("lista-capitulos");

  if (!listaCapitulos) {
    return;
  }

  function doisDigitos(numero) {
    return String(numero).padStart(2, "0");
  }

  function criarCapitulo(capitulo) {
    const item = document.createElement("section");
    const painelId = `capitulo-${capitulo.numero}`;

    item.className = "sumario-capitulo";

    const botao = document.createElement("button");

    botao.className = "capitulo-botao";
    botao.type = "button";
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", painelId);

    botao.innerHTML = `
      <span class="capitulo-numero">
        Capítulo ${capitulo.numero}
      </span>

      <span class="capitulo-titulo">
        ${capitulo.titulo}
      </span>

      <span class="capitulo-pontos" aria-hidden="true"></span>

      <span class="capitulo-pagina">
        ${doisDigitos(capitulo.inicio)}
      </span>

      <span class="capitulo-seta" aria-hidden="true"></span>
    `;

    const painel = document.createElement("div");

    painel.className = "capitulo-conteudo";
    painel.id = painelId;
    painel.hidden = true;

    const listaPaginas = document.createElement("ul");

    capitulo.paginas.forEach((titulo, indice) => {
      const numeroPagina = capitulo.inicio + indice;
      const numeroFormatado = doisDigitos(numeroPagina);

      const linha = document.createElement("li");
      const link = document.createElement("a");

      link.href =
        `../capitulo-${doisDigitos(capitulo.numero)}` +
        `/p${numeroFormatado}.html`;

      const numero = document.createElement("span");
      numero.textContent = numeroFormatado;

      link.appendChild(numero);
      link.appendChild(document.createTextNode(titulo));

      linha.appendChild(link);
      listaPaginas.appendChild(linha);
    });

    painel.appendChild(listaPaginas);
    item.appendChild(botao);
    item.appendChild(painel);

    return item;
  }

  capitulos.forEach((capitulo) => {
    listaCapitulos.appendChild(criarCapitulo(capitulo));
  });

  const botoes = Array.from(
    document.querySelectorAll(".capitulo-botao")
  );

  function fecharCapitulo(botao) {
    const painelId = botao.getAttribute("aria-controls");
    const painel = document.getElementById(painelId);

    botao.setAttribute("aria-expanded", "false");

    if (painel) {
      painel.hidden = true;
    }
  }

  function abrirCapitulo(botao) {
    const painelId = botao.getAttribute("aria-controls");
    const painel = document.getElementById(painelId);

    botoes.forEach((outroBotao) => {
      if (outroBotao !== botao) {
        fecharCapitulo(outroBotao);
      }
    });

    botao.setAttribute("aria-expanded", "true");

    if (painel) {
      painel.hidden = false;
    }
  }

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const estaAberto =
        botao.getAttribute("aria-expanded") === "true";

      if (estaAberto) {
        fecharCapitulo(botao);
      } else {
        abrirCapitulo(botao);
      }
    });
  });
});