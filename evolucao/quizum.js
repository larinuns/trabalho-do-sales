let ContPerguta = 0;
let TotalCorretas = 0;
let nomeJogador = "";
let perguntasEmbaralhadas = [];

const btnEntrar = document.querySelector(".entrar");
const btnProximo = document.querySelector(".proximo");
const btnCadastro = document.querySelector(".btnCadastro");
const Boas_vindas = document.querySelector(".Boas_vindas");
const cadastro = document.querySelector(".cadastro");
const NomeUsuario = document.querySelector("#nome");
const JogoQuiz = document.querySelector(".JogoQuiz");
const Questao = document.querySelector(".pergunta");
const DivOpcoes = document.querySelector(".opcoes");
let btnOpcao = document.querySelectorAll(".opcao");

function embaralharPerguntas() {
  perguntasEmbaralhadas = [...PERGUNTAS];

  for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] = [
      perguntasEmbaralhadas[j],
      perguntasEmbaralhadas[i],
    ];
  }
}

function EntrarNoJogo() {
  Boas_vindas.classList.add("esconder");
  btnEntrar.classList.add("esconder");
  cadastro.classList.remove("esconder");
  btnCadastro.classList.remove("esconder");
}

function ComecarJogar() {
  if (NomeUsuario.value.trim() === "") {
    NomeUsuario.focus();
    NomeUsuario.setCustomValidity("Por favor, preencha o nome.");
    NomeUsuario.reportValidity();
    NomeUsuario.addEventListener("input", () => {
      NomeUsuario.setCustomValidity("");
    }, { once: true });
    return;
  }

  nomeJogador = NomeUsuario.value.trim();
  ContPerguta = 0;
  TotalCorretas = 0;
  embaralharPerguntas();

  cadastro.classList.add("esconder");
  JogoQuiz.classList.remove("esconder");
  Boas_vindas.classList.add("esconder");
  btnCadastro.classList.add("esconder");
  btnEntrar.classList.add("esconder");

  TrocarPergunta();
}

function TrocarPergunta() {
  if (!btnProximo.classList.contains("esconder")) {
    ContPerguta++;
  }

  LimparPergunta();

  if (ContPerguta >= perguntasEmbaralhadas.length) {
    return FinalDoJogo();
  }

  Questao.textContent = perguntasEmbaralhadas[ContPerguta].pergunta;

  perguntasEmbaralhadas[ContPerguta].opcoes.forEach((item) => {
    const btnsNovos = document.createElement("button");
    btnsNovos.type = "button";
    btnsNovos.classList.add("opcao", "button");
    btnsNovos.textContent = item.opcao;

    if (item.resposta) {
      btnsNovos.dataset.resposta = "true";
    }

    DivOpcoes.appendChild(btnsNovos);
    btnsNovos.addEventListener("click", SelecionarOpcao);
  });
}

function LimparPergunta() {
  while (DivOpcoes.firstChild) {
    DivOpcoes.removeChild(DivOpcoes.firstChild);
  }

  btnProximo.classList.add("esconder");
}

function SelecionarOpcao(evento) {
  const opcaoSelecionada = evento.currentTarget;
  const opcoes = document.querySelectorAll(".opcao");
  const acertou = opcaoSelecionada.dataset.resposta === "true";

  opcoes.forEach((botao) => {
    botao.disabled = true;

    if (botao.dataset.resposta === "true") {
      botao.classList.add("certo");
    } else {
      botao.classList.add("errado");
    }
  });

  if (acertou) {
    TotalCorretas++;
  }

  const audio = acertou ? document.getElementById("somAcerto") : document.getElementById("somErro");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  btnProximo.classList.remove("esconder");
}

function FinalDoJogo() {
  const totalPerguntas = perguntasEmbaralhadas.length;
  const performance = totalPerguntas === 0 ? 0 : Math.floor((TotalCorretas * 100) / totalPerguntas);

  let mensagem = "";

  switch (true) {
    case performance >= 90:
      mensagem = `Parabéns, ${nomeJogador}, você é especialista sobre evolução!`;
      break;
    case performance >= 70:
      mensagem = `Ótimo! Muito bom, ${nomeJogador}!`;
      break;
    case performance >= 50:
      mensagem = `Bom trabalho, ${nomeJogador}!`;
      break;
    default:
      mensagem = `${nomeJogador}, você pode melhorar! Continue estudando, você consegue!`;
  }

  JogoQuiz.innerHTML = `
    <p class="mensagem_final">
      Você acertou ${TotalCorretas} de ${totalPerguntas} questões!
      <span>Resultado: ${mensagem}</span>
    </p>

    <button onclick="window.location.reload()" class="btnRecomecar">
      Voltar a Jogar
    </button>
  `;


}
const PERGUNTAS = [
  {
    pergunta: "Quem ficou conhecido por desenvolver a teoria da evolução por seleção natural?",
    opcoes: [
      { opcao: "a) Charles Darwin", resposta: true },
      { opcao: "b) Gregor Mendel", resposta: false },
      { opcao: "c) Louis Pasteur", resposta: false },
      { opcao: "d) Albert Einstein", resposta: false },
      { opcao: "e) Isaac Newton", resposta: false }
    ]
  },
  {
    pergunta: "O que é evolução biológica?",
    opcoes: [
      { opcao: "a) A mudança dos seres vivos ao longo das gerações", resposta: true },
      { opcao: "b) O crescimento de um indivíduo", resposta: false },
      { opcao: "c) A mudança das estações do ano", resposta: false },
      { opcao: "d) A formação diária de nuvens", resposta: false },
      { opcao: "e) O desaparecimento de toda a vida", resposta: false }
    ]
  },
  {
    pergunta: "O que são fósseis?",
    opcoes: [
      { opcao: "a) Animais que vivem em cavernas", resposta: false },
      { opcao: "b) Pedras formadas apenas por lava", resposta: false },
      { opcao: "c) Restos ou vestígios de seres vivos antigos", resposta: true },
      { opcao: "d) Plantas que vivem no deserto", resposta: false },
      { opcao: "e) Rochas sem nenhuma história", resposta: false }
    ]
  },
  {
    pergunta: "O que é seleção natural?",
    opcoes: [
      { opcao: "a) A escolha de animais feita por cientistas", resposta: false },
      { opcao: "b) A mudança dos seres vivos por vontade própria", resposta: false },
      { opcao: "c) A reprodução de todos os indivíduos na mesma quantidade", resposta: false },
      { opcao: "d) O processo em que características hereditárias favoráveis podem se tornar mais comuns", resposta: true },
      { opcao: "e) A transformação de todos os seres vivos em uma única espécie", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes animais é um mamífero?",
    opcoes: [
      { opcao: "a) Tartaruga", resposta: false },
      { opcao: "b) Sapo", resposta: false },
      { opcao: "c) Sardinha", resposta: false },
      { opcao: "d) Borboleta", resposta: false },
      { opcao: "e) Baleia", resposta: true }
    ]
  },
  {
    pergunta: "De onde surgem novas variações genéticas?",
    opcoes: [
      { opcao: "a) Somente do clima", resposta: true },
      { opcao: "b) De mutações e da recombinação genética", resposta: false },
      { opcao: "c) Da vontade dos animais", resposta: false },
      { opcao: "d) Apenas da alimentação", resposta: false },
      { opcao: "e) Somente do exercício físico", resposta: false }
    ]
  },
  {
    pergunta: "Os seres humanos e os chimpanzés atuais:",
    opcoes: [
      { opcao: "a) Descendem um do outro diretamente", resposta: true },
      { opcao: "b) São exatamente a mesma espécie", resposta: false },
      { opcao: "c) Compartilham ancestrais comuns", resposta: false },
      { opcao: "d) Não têm nenhuma relação evolutiva", resposta: false },
      { opcao: "e) Surgiram na mesma época que os dinossauros não aviários", resposta: false }
    ]
  },
  {
    pergunta: "Qual é uma evidência da evolução biológica?",
    opcoes: [
      { opcao: "a) A existência de fósseis", resposta: true },
      { opcao: "b) A mudança diária do clima", resposta: false },
      { opcao: "c) O movimento das ondas", resposta: false },
      { opcao: "d) A formação de arco-íris", resposta: false },
      { opcao: "e) A alternância entre dia e noite", resposta: false }
    ]
  }
];