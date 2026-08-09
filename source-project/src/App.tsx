import { useEffect, useState, type CSSProperties } from "react";

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true">
    <path d="M14 24V12m0 1C11 7 7 5 3 6c0 6 4 10 11 8Zm0-2c3-5 7-7 11-6 0 6-4 10-11 8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const contentItems = [
  "Histórias bíblicas",
  "Desenhos e animações cristãs",
  "Conteúdos sobre Jesus",
  "Músicas cristãs infantis",
  "Atividades interativas",
  "Perguntas e desafios",
  "Histórias sobre fé, oração e obediência",
  "Ensinamentos sobre amor, perdão e gratidão",
  "Princípios bíblicos aplicados ao cotidiano",
];

const seedValues = ["Cristo", "A Palavra de Deus", "Fé", "Sabedoria", "Amor", "Verdade", "Bons princípios"];

type QuizQuestion = {
  question: string;
  answers: string[];
  correct: string;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Quem construiu uma grande arca depois de receber uma ordem de Deus?",
    answers: ["Moisés", "Noé", "Davi", "Abraão"],
    correct: "Noé",
    explanation: "Muito bem! 🌱 Noé confiou em Deus e construiu a arca.",
  },
  {
    question: "Quem enfrentou o gigante Golias confiando em Deus?",
    answers: ["Sansão", "Pedro", "Davi", "Josué"],
    correct: "Davi",
    explanation: "Muito bem! 🌱 Davi confiou em Deus e enfrentou Golias.",
  },
  {
    question: "Quem foi lançado em uma cova cheia de leões?",
    answers: ["José", "Daniel", "Paulo", "Samuel"],
    correct: "Daniel",
    explanation: "Muito bem! 🌱 Deus cuidou de Daniel na cova dos leões.",
  },
  {
    question: "Quem abriu o Mar Vermelho pela ação de Deus?",
    answers: ["Moisés", "Noé", "Elias", "Salomão"],
    correct: "Moisés",
    explanation: "Muito bem! 🌱 Deus usou Moisés para conduzir o povo pelo mar.",
  },
  {
    question: "Em qual cidade Jesus nasceu?",
    answers: ["Nazaré", "Jerusalém", "Belém", "Jericó"],
    correct: "Belém",
    explanation: "Muito bem! 🌱 Jesus nasceu em Belém.",
  },
  {
    question: "Quem foi engolido por um grande peixe?",
    answers: ["Jonas", "João", "Jacó", "Jó"],
    correct: "Jonas",
    explanation: "Muito bem! 🌱 Jonas orou e aprendeu a obedecer a Deus.",
  },
  {
    question: "Quem é o Filho de Deus?",
    answers: ["Abraão", "Jesus", "Davi", "João Batista"],
    correct: "Jesus",
    explanation: "Muito bem! 🌱 Jesus é o Filho de Deus e nos ama.",
  },
  {
    question: "Qual livro nos ensina sobre Deus e Sua Palavra?",
    answers: ["Um mapa", "A Bíblia", "Um dicionário", "Um livro de receitas"],
    correct: "A Bíblia",
    explanation: "Muito bem! 🌱 A Bíblia é a Palavra de Deus.",
  },
  {
    question: "Qual era o nome da mãe de Jesus?",
    answers: ["Ester", "Rute", "Maria", "Sara"],
    correct: "Maria",
    explanation: "Muito bem! 🌱 Maria foi escolhida para ser a mãe de Jesus.",
  },
  {
    question: "Qual foi o primeiro homem criado por Deus?",
    answers: ["Adão", "Noé", "José", "Elias"],
    correct: "Adão",
    explanation: "Muito bem! 🌱 Adão foi o primeiro homem criado por Deus.",
  },
];

const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
};

const createRound = (includeOpeningQuestion = false) => {
  if (!includeOpeningQuestion) return shuffle(quizQuestions).slice(0, 3);
  return [quizQuestions[0], ...shuffle(quizQuestions.slice(1)).slice(0, 2)];
};

function BibleQuiz() {
  const [round, setRound] = useState<QuizQuestion[]>(() => createRound(true));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [seedScore, setSeedScore] = useState(0);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = round[questionIndex];
  const growthStages = ["🌰", "🌱", "🌿", "🌳"];
  const correctAnswers = seedScore / 100;

  useEffect(() => {
    if (!answeredCorrectly) return undefined;
    const timer = window.setTimeout(() => setShowNext(true), 900);
    return () => window.clearTimeout(timer);
  }, [answeredCorrectly]);

  useEffect(() => {
    if (!wrongChoice) return undefined;
    const timer = window.setTimeout(() => setWrongChoice(null), 650);
    return () => window.clearTimeout(timer);
  }, [wrongChoice]);

  const chooseAnswer = (answer: string) => {
    if (answeredCorrectly) return;
    if (answer === question.correct) {
      setWrongChoice(null);
      setAnsweredCorrectly(true);
      setSeedScore((current) => current + 100);
      return;
    }
    setWrongChoice(answer);
  };

  const nextQuestion = () => {
    if (questionIndex === round.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setAnsweredCorrectly(false);
    setShowNext(false);
    setWrongChoice(null);
  };

  const playAgain = () => {
    setRound(createRound());
    setQuestionIndex(0);
    setSeedScore(0);
    setWrongChoice(null);
    setAnsweredCorrectly(false);
    setShowNext(false);
    setFinished(false);
  };

  return (
    <div className="quiz-card" aria-live="polite">
      {!finished ? (
        <>
          <div className="quiz-topline">
            <span>Desafio da Sementinha</span>
            <strong key={seedScore} aria-label={`${seedScore} sementes`}>🌱 {seedScore}</strong>
          </div>
          <div className="quiz-progress-row">
            <div>
              <span>Pergunta {questionIndex + 1} de 3</span>
              <div className="quiz-progress" aria-hidden="true">
                <i style={{ "--quiz-progress": `${((questionIndex + (answeredCorrectly ? 1 : 0)) / 3) * 100}%` } as CSSProperties} />
              </div>
            </div>
            <div className={`growth-stage ${answeredCorrectly ? "is-growing" : ""}`} aria-label={`Etapa de crescimento ${correctAnswers} de 3`}>
              <span key={correctAnswers}>{growthStages[correctAnswers]}</span>
              <small>{growthStages.map((stage, index) => <i className={index <= correctAnswers ? "is-active" : ""} key={stage}>{stage}</i>)}</small>
            </div>
          </div>

          <div className="quiz-question" key={question.question}>
            <h3>{question.question}</h3>
            <div className="quiz-answers" role="group" aria-label="Alternativas">
              {question.answers.map((answer, index) => {
                const isCorrect = answeredCorrectly && answer === question.correct;
                const isWrong = wrongChoice === answer;
                return (
                  <button
                    className={`${isCorrect ? "is-correct" : ""} ${isWrong ? "is-try-again" : ""}`}
                    disabled={answeredCorrectly}
                    key={answer}
                    onClick={() => chooseAnswer(answer)}
                    type="button"
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {answer}
                    {isCorrect && <b aria-hidden="true">✓</b>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-feedback" aria-live="assertive">
            {answeredCorrectly && <div className="feedback-correct-wrap"><img src="/media/sementinha-feliz.webp" alt="Sementinha comemorando" width="96" height="96" /><p className="feedback-correct"><span>+100 sementes</span>{question.explanation}</p></div>}
            {!answeredCorrectly && wrongChoice && <p className="feedback-try">Quase! Tente outra vez 🌱</p>}
          </div>

          <div className={`quiz-next-wrap ${showNext ? "is-visible" : ""}`}>
            <button className="quiz-next" disabled={!showNext} onClick={nextQuestion} type="button">
              {questionIndex === 2 ? "Ver meu resultado →" : "Próxima pergunta →"}
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-finish">
          <div className="subtle-confetti" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--confetti": index } as CSSProperties} />)}
          </div>
          <div className="finish-tree" aria-hidden="true">🌳</div>
          <p className="quiz-finish-kicker">Desafio concluído</p>
          <h3>Você fez a Sementinha crescer! 🌱</h3>
          <strong>3 de 3</strong>
          <p>Muito bem! Cada nova história é uma oportunidade de conhecer um pouco mais da Palavra de Deus.</p>
          <button className="quiz-restart" onClick={playAgain} type="button">Jogar novamente</button>
          <a className="quiz-universe-link" href="#universo">Conheça o universo Sementinha <ArrowIcon /></a>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const chapterIndex = document.querySelector<HTMLElement>(".chapter-index");
    const chapterLabel = document.querySelector<HTMLElement>(".chapter-label");
    const pointerLight = document.querySelector<HTMLElement>(".pointer-light");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMotion = window.matchMedia("(max-width: 900px)");
    let frame = 0;
    let readyTimer = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scenes: Array<{ element: HTMLElement; top: number; height: number }> = [];

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const measureScenes = () => {
      scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]")).map((element) => {
        const rect = element.getBoundingClientRect();
        return { element, top: rect.top + window.scrollY, height: rect.height };
      });
    };

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewport = Math.max(window.innerHeight, 1);
        const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const now = performance.now();
        const velocity = clamp(Math.abs(scrollY - lastScrollY) / Math.max(now - lastScrollTime, 16) / 1.4);
        root.style.setProperty("--page-progress", `${scrollY / max}`);
        root.style.setProperty("--hero-scroll", mobileMotion.matches ? "0" : `${Math.min(scrollY / viewport, 1)}`);
        root.style.setProperty("--scroll-velocity", mobileMotion.matches ? "0" : velocity.toFixed(3));
        header?.classList.toggle("is-compact", scrollY > 42);
        lastScrollY = scrollY;
        lastScrollTime = now;

        if (!reducedMotion) {
          scenes.forEach(({ element, top, height }) => {
            const sceneProgress = clamp((scrollY - (top - viewport)) / Math.max(height + viewport, 1));
            const pinProgress = clamp((scrollY - top) / Math.max(height - viewport, 1));
            element.style.setProperty("--scene-progress", sceneProgress.toFixed(4));
            element.style.setProperty("--pin-progress", mobileMotion.matches ? ".5" : pinProgress.toFixed(4));
          });

          document.querySelectorAll<HTMLElement>("[data-count]").forEach((counter) => {
            const target = Number(counter.dataset.count ?? 0);
            const section = counter.closest<HTMLElement>("[data-scroll-scene]");
            const progress = Number(section?.style.getPropertyValue("--scene-progress") || 0);
            const eased = 1 - Math.pow(1 - clamp((progress - .18) / .26), 3);
            counter.textContent = String(Math.round(target * eased));
          });
        }

        const readingPoint = scrollY + viewport * .48;
        const activeChapter = scenes
          .filter(({ element }) => element.dataset.chapter)
          .reduce<{ element: HTMLElement; top: number; height: number } | null>((closest, scene) => {
            if (scene.top <= readingPoint) return scene;
            return closest;
          }, null);
        if (activeChapter) {
          const chapter = activeChapter.element.dataset.chapter ?? "01";
          const label = activeChapter.element.dataset.chapterLabel ?? "A Sementinha";
          if (chapterIndex) chapterIndex.textContent = chapter;
          if (chapterLabel) chapterLabel.textContent = label;
          root.dataset.chapter = chapter;
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureScenes) : null;

    document.querySelectorAll<HTMLElement>("[data-reveal], [data-scroll-scene]").forEach((element) => observer.observe(element));
    measureScenes();
    scenes.forEach(({ element }) => resizeObserver?.observe(element));
    updateScroll();
    readyTimer = window.setTimeout(() => body.classList.add("is-ready"), reducedMotion ? 0 : 260);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", measureScenes, { passive: true });

    const handleHeroPointer = (event: PointerEvent) => {
      if (!hero || !finePointer || reducedMotion) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - .5).toFixed(3)}`);
      hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight) - .5).toFixed(3)}`);
    };

    const resetHeroPointer = () => {
      hero?.style.setProperty("--pointer-x", "0");
      hero?.style.setProperty("--pointer-y", "0");
    };

    const movePointerLight = (event: PointerEvent) => {
      if (!pointerLight || !finePointer || reducedMotion) return;
      pointerLight.style.setProperty("--light-x", `${event.clientX}px`);
      pointerLight.style.setProperty("--light-y", `${event.clientY}px`);
    };

    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>(".button, .header-cta"));
    const magneticMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotion) return;
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--magnetic-x", `${(event.clientX - rect.left - rect.width / 2) * .1}px`);
      target.style.setProperty("--magnetic-y", `${(event.clientY - rect.top - rect.height / 2) * .14}px`);
    };
    const magneticReset = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.setProperty("--magnetic-x", "0px");
      target.style.setProperty("--magnetic-y", "0px");
    };

    hero?.addEventListener("pointermove", handleHeroPointer);
    hero?.addEventListener("pointerleave", resetHeroPointer);
    window.addEventListener("pointermove", movePointerLight, { passive: true });
    magneticItems.forEach((item) => {
      item.addEventListener("pointermove", magneticMove);
      item.addEventListener("pointerleave", magneticReset);
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", measureScenes);
      window.removeEventListener("pointermove", movePointerLight);
      window.clearTimeout(readyTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver?.disconnect();
      hero?.removeEventListener("pointermove", handleHeroPointer);
      hero?.removeEventListener("pointerleave", resetHeroPointer);
      magneticItems.forEach((item) => {
        item.removeEventListener("pointermove", magneticMove);
        item.removeEventListener("pointerleave", magneticReset);
      });
    };
  }, []);

  return (
    <main id="inicio">
      <div className="cinema-intro" aria-hidden="true">
        <div className="intro-mark"><span>🌱</span></div>
        <p>Uma pequena semente.</p>
        <strong>Um propósito eterno.</strong>
      </div>
      <div className="pointer-light" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <div className="page-progress" aria-hidden="true" />
      <div className="journey-rail" aria-hidden="true"><span /><em>SEMENTINHA</em></div>
      <aside className="chapter-dock" aria-hidden="true">
        <span className="chapter-index">01</span>
        <i />
        <span className="chapter-label">O começo</span>
      </aside>

      <header className="site-header" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Sementinha — início">
          <img src="/media/sementinha-feliz.webp" alt="" width="48" height="48" />
          <span>Sementinha</span>
        </a>
        <nav className="desktop-nav" aria-label="Seções do site">
          <a href="#proposito">Propósito</a>
          <a href="#universo">O universo</a>
          <a href="#missao">Nossa missão</a>
        </nav>
        <a className="header-cta" href="#universo">
          Conhecer <ArrowIcon />
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title" data-scroll-scene data-chapter="01" data-chapter-label="O começo">
        <div className="hero-stage">
          <div className="hero-title-ghost" aria-hidden="true">SEMENTINHA</div>
          <div className="hero-film-label" aria-hidden="true"><span>CAPÍTULO 01</span><i />O COMEÇO</div>
          <div className="hero-aurora hero-aurora-one" />
          <div className="hero-aurora hero-aurora-two" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-seeds" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => <span key={index} style={{ "--seed": index } as CSSProperties}>•</span>)}
          </div>

          <div className="hero-copy">
          <p className="eyebrow" data-reveal><span><LeafIcon /></span> Conteúdo cristão infantil</p>
          <h1 id="hero-title" data-reveal>
            Plantando Cristo no coração dos seus filhos. <em>🌱</em>
          </h1>
          <div className="hero-mobile-scene" aria-hidden="true">
            <div className="hero-mobile-halo" />
            <div className="hero-mobile-ring hero-mobile-ring-one" />
            <div className="hero-mobile-ring hero-mobile-ring-two" />
            <img src="/media/sementinha-feliz.webp" alt="" width="1024" height="1024" fetchPriority="high" />
            <span className="hero-mobile-tag hero-mobile-tag-one">Jesus</span>
            <span className="hero-mobile-tag hero-mobile-tag-two">Bíblia</span>
            <span className="hero-mobile-tag hero-mobile-tag-three">Família</span>
            <span className="hero-mobile-spark hero-mobile-spark-one">✦</span>
            <span className="hero-mobile-spark hero-mobile-spark-two">✦</span>
          </div>
          <p className="hero-description" data-reveal>
            Um universo cristão criado para ajudar crianças a conhecerem Jesus, aprenderem a Bíblia e se divertirem em um ambiente seguro, intuitivo e feito especialmente para elas.
          </p>
          <p className="hero-promise" data-reveal>Seu filho protegido e ensinado pela Palavra de Deus.</p>
          <p className="hero-support" data-reveal>
            Histórias, desenhos, atividades e experiências interativas que transformam o tempo diante da tela em uma oportunidade de crescimento espiritual.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#proposito">Conhecer a Sementinha <ArrowIcon /></a>
          </div>
          <div className="trust-line" data-reveal>
            <span>Conteúdo cristão infantil</span><i />
            <span>Ambiente seguro</span><i />
            <span>Aprendizado divertido</span>
          </div>
          </div>

          <div className="hero-art" aria-label="A personagem Sementinha feliz">
          <div className="hero-orbit orbit-a"><span>Jesus</span></div>
          <div className="hero-orbit orbit-b"><span>Bíblia</span></div>
          <div className="hero-orbit orbit-c"><span>Família</span></div>
          <div className="hero-image-wrap">
            <div className="hero-halo" />
            <img src="/media/sementinha-feliz.webp" alt="Sementinha, uma pequena semente feliz com duas folhas verdes" width="1024" height="1024" fetchPriority="high" />
          </div>
          <span className="hero-spark spark-one">✦</span>
          <span className="hero-spark spark-two">✦</span>
          <span className="hero-spark spark-three">✦</span>
          </div>

          <a className="scroll-cue" href="#proposito" aria-label="Continuar a leitura"><span>Descubra o propósito</span><i /></a>
        </div>
      </section>

      <section className="purpose" id="proposito" aria-labelledby="purpose-title" data-scroll-scene data-chapter="02" data-chapter-label="O propósito">
        <div className="scripture-band">
          <span aria-hidden="true">“</span>
          <blockquote>
            <p>Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.</p>
            <cite>Provérbios 22:6</cite>
          </blockquote>
        </div>

        <div className="purpose-layout">
          <div className="purpose-visual" data-reveal>
            <div className="purpose-ring" />
            <img src="/media/sementinha-biblia.webp" alt="Sementinha segurando uma Bíblia" width="1024" height="1024" loading="lazy" />
            <div className="purpose-chip"><LeafIcon /><span>Uma semente.<br /><strong>Um propósito eterno.</strong></span></div>
          </div>
          <div className="purpose-copy" data-reveal>
            <p className="section-kicker">Onde tudo começa</p>
            <h2 id="purpose-title">Tudo começa com uma pequena semente.</h2>
            <p>A infância é uma das fases mais importantes da formação de uma pessoa.</p>
            <p>É quando valores começam a ser construídos, referências são criadas e muitas das primeiras ideias sobre Deus, família, amor, certo e errado começam a ganhar forma.</p>
            <p>Foi por isso que nasceu a Sementinha.</p>
            <p>Para ajudar papais e mamães a apresentarem <strong>Cristo e a Palavra de Deus aos seus filhos desde pequenos</strong>, utilizando uma linguagem que eles conseguem entender e uma experiência que realmente desperta sua atenção.</p>
            <p className="emphasis-line">Porque nunca é cedo demais para começar a conhecer Jesus.</p>
            <a className="section-app-cta" href="#universo">Conhecer o aplicativo Sementinha <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="problem" aria-labelledby="problem-title" data-scroll-scene data-chapter="03" data-chapter-label="O que as telas plantam">
        <div className="problem-glow" aria-hidden="true" />
        <div className="problem-intro" data-reveal>
          <p className="section-kicker">Uma pergunta necessária</p>
          <h2 id="problem-title">O que está ensinando seu filho enquanto você não está olhando?</h2>
        </div>

        <div className="stats-stage">
          <div className="stats-copy" data-reveal>
            <div className="stat-row">
              <div className="stat-number" aria-label="78 por cento"><strong data-count="78">78</strong><span>%</span></div>
              <p>das crianças brasileiras de até 3 anos já são expostas a telas todos os dias.</p>
            </div>
            <div className="stat-divider" />
            <div className="stat-row">
              <div className="stat-number" aria-label="94 por cento"><strong data-count="94">94</strong><span>%</span></div>
              <p>das crianças entre 4 e 6 anos já têm exposição diária às telas.</p>
            </div>
            <p className="research-note">Uma pesquisa aponta uma média de 2 a 3 horas diárias de telas entre crianças de 0 a 6 anos, enquanto especialistas recomendam limites significativamente menores nos primeiros anos de vida.</p>
            <p className="source-note">Fonte: Fundação Maria Cecilia Souto Vidigal — Panorama da Primeira Infância, 2025.</p>
          </div>
          <div className="problem-visual" data-reveal>
            <div className="sad-card sad-card-back"><img src="/media/sementinha-triste-sentado.webp" alt="Sementinha triste olhando para um celular" width="1024" height="1024" loading="lazy" /></div>
            <div className="sad-card sad-card-front"><img src="/media/sementinha-triste.webp" alt="Sementinha chorando enquanto segura um celular" width="1024" height="1024" loading="lazy" /></div>
            <div className="algorithm-card"><span>Próximo vídeo</span><i /><i /><i /><strong>O algoritmo escolhe.</strong></div>
          </div>
        </div>

        <div className="algorithm-story">
          <div className="algorithm-copy" data-reveal>
            <p>Hoje, basta alguns segundos para uma criança ter acesso a milhares de vídeos.</p>
            <div className="sequence" aria-label="Sequência de recomendações de conteúdo">
              <span>Um conteúdo</span><i>→</i><span>outro conteúdo</span><i>→</i><span>o algoritmo decide</span>
            </div>
            <p>Um conteúdo leva para outro. Um personagem apresenta outro. E um algoritmo pode decidir aquilo que aparecerá em seguida.</p>
            <p>Nesse ambiente, nem sempre é possível para os pais saberem exatamente quais mensagens, comportamentos e valores estão chegando até seus filhos.</p>
          </div>
          <div className="learning-card" data-reveal>
            <p>Porque enquanto uma criança está assistindo...</p>
            <h3>ela também está aprendendo.</h3>
            <ul>
              <li>Palavras e comportamentos</li>
              <li>Valores e formas de tratar outras pessoas</li>
              <li>Formas de enxergar o mundo</li>
              <li>O que deve desejar, admirar ou considerar normal</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="big-idea" aria-labelledby="big-idea-title" data-scroll-scene data-chapter="04" data-chapter-label="Uma escolha diferente">
        <div className="idea-giant" aria-hidden="true"><span>TODA TELA</span><span>PLANTA</span></div>
        <div className="big-idea-sticky">
          <p className="section-kicker">A grande ideia</p>
          <h2 id="big-idea-title">Toda tela planta <span>alguma coisa.</span></h2>
          <p>Cada história que uma criança escuta. Cada personagem que admira. Cada música que repete. Cada vídeo que assiste.</p>
          <strong>Tudo isso pode deixar pequenas sementes.</strong>
        </div>
        <div className="seed-stack" data-reveal>
          <div className="question-card">
            <small>A pergunta é:</small>
            <h3>O que você gostaria que estivesse sendo plantado no coração do seu filho?</h3>
          </div>
          <div className="values-card">
            <p>Na Sementinha, queremos ajudar você a plantar:</p>
            <div className="value-cloud">{seedValues.map((value, index) => <span key={value} style={{ "--index": index } as CSSProperties}>{value}</span>)}</div>
            <p className="values-ending">E valores que possam acompanhá-lo enquanto cresce.</p>
          </div>
        </div>
      </section>

      <section className="quiz-demo" id="desafio" aria-labelledby="quiz-demo-title" data-scroll-scene>
        <div className="quiz-demo-bridge" data-reveal>
          <span>Então veja, na prática:</span>
          <strong>uma tela também pode plantar aprendizado.</strong>
        </div>
        <div className="quiz-demo-layout">
          <div className="quiz-demo-copy" data-reveal>
            <p className="section-kicker">Desafio da Sementinha</p>
            <h2 id="quiz-demo-title">Aprender sobre a Bíblia também pode ser divertido.</h2>
            <p>Responda ao desafio, ajude a Sementinha a crescer e descubra o quanto você conhece das histórias da Bíblia. 🌱</p>
            <strong>Que tal jogar uma rodada?</strong>
            <div className="quiz-character" aria-hidden="true">
              <div className="quiz-character-halo" />
              <img src="/media/sementinha-feliz.webp" alt="" width="1024" height="1024" loading="lazy" />
              <span>Vamos crescer juntos!</span>
            </div>
          </div>
          <div className="quiz-game-wrap" data-reveal>
            <BibleQuiz />
          </div>
        </div>
      </section>

      <section className="positioning" aria-labelledby="positioning-title" data-scroll-scene data-chapter="05" data-chapter-label="Tecnologia com propósito">
        <div className="positioning-art" data-reveal>
          <div className="screen-window">
            <div className="screen-top"><i /><i /><i /></div>
            <img src="/media/sementinha-cama.webp" alt="Sementinha assistindo a um conteúdo no celular, deitado na cama" width="1024" height="1024" loading="lazy" />
            <div className="safe-badge"><span>✓</span> Ambiente seguro</div>
          </div>
        </div>
        <div className="positioning-copy" data-reveal>
          <p className="section-kicker">Tecnologia com propósito</p>
          <h2 id="positioning-title">Não queremos simplesmente tirar as crianças das telas. <span>Queremos mudar aquilo que elas encontram nelas.</span></h2>
          <p>A tecnologia já faz parte da infância desta geração. Por isso, nosso propósito não é lutar contra ela. É utilizá-la para algo maior.</p>
          <p>Transformamos histórias bíblicas, ensinamentos sobre Jesus e princípios da Palavra em experiências <strong>visuais, divertidas e interativas.</strong></p>
          <div className="experience-pills" aria-label="Experiências disponíveis">
            {['Histórias', 'Personagens', 'Aventuras', 'Músicas', 'Jogos', 'Descobertas'].map(item => <span key={item}>{item}</span>)}
          </div>
          <p>Seu filho continua encontrando aquilo que uma criança ama, mas dentro de um universo construído para apontá-lo para Cristo.</p>
        </div>
      </section>

      <section className="universe" id="universo" aria-labelledby="universe-title" data-scroll-scene data-chapter="06" data-chapter-label="O universo Sementinha">
        <div className="universe-head" data-reveal>
          <p className="section-kicker">Bem-vindo</p>
          <h2 id="universe-title">Bem-vindo ao universo Sementinha. <span>🌱</span></h2>
          <p>Um ambiente digital criado especialmente para crianças conhecerem a Deus enquanto se divertem.</p>
          <div className="universe-manifesto"><span>As histórias da Bíblia ganham vida.</span><span>Os ensinamentos se tornam experiências.</span><span>E verdades importantes chegam de forma simples.</span></div>
        </div>

        <div className="universe-stage" data-reveal>
          <div className="portal-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="universe-device">
            <div className="device-top"><span /><span /><span /><em>Sementinha</em></div>
            <img src="/media/sementinha-seed.webp" alt="Sementinha brotando com uma cruz iluminada ao fundo" width="1024" height="1024" loading="lazy" />
          </div>
          <span className="universe-float universe-float-one">Histórias que ganham vida</span>
          <span className="universe-float universe-float-two">Fé que cresce junto</span>
          <span className="universe-float universe-float-three">Descobertas com propósito</span>
        </div>

        <div className="content-marquee" aria-hidden="true"><div>HISTÓRIAS • FÉ • MÚSICAS • JESUS • DESCOBERTAS • ORAÇÃO • BÍBLIA • AMOR • </div></div>

        <div className="content-list" data-reveal>
          {contentItems.map((item, index) => (
            <article key={item} style={{ "--index": index } as CSSProperties}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
              <i><ArrowIcon /></i>
            </article>
          ))}
        </div>
        <div className="universe-footer" data-reveal>
          <p>Tudo pensado para proporcionar uma experiência divertida para as crianças e mais tranquilidade para os pais.</p>
          <a className="button button-light" href="#protecao">Entrar no universo Sementinha <ArrowIcon /></a>
        </div>
      </section>

      <section className="protection" id="protecao" aria-labelledby="protection-title" data-scroll-scene data-chapter="07" data-chapter-label="Proteção e tranquilidade">
        <div className="protection-head" data-reveal>
          <p className="section-kicker">Para papais e mamães</p>
          <h2 id="protection-title">Seu filho protegido e ensinado pela Palavra de Deus.</h2>
        </div>
        <div className="protection-grid">
          <div className="protection-copy" data-reveal>
            <p>Ser pai ou mãe na era digital trouxe um desafio que nenhuma outra geração enfrentou da mesma maneira.</p>
            <p>Hoje, proteger uma criança não significa apenas saber onde ela está. Também significa prestar atenção:</p>
          </div>
          <div className="attention-list" data-reveal>
            <span>no que ela assiste.</span>
            <span>no que ela escuta.</span>
            <span>em quem ela admira.</span>
            <span>e no que está formando sua maneira de pensar.</span>
          </div>
        </div>
        <div className="protection-statement" data-reveal>
          <p>A Sementinha nasce como uma alternativa para famílias que querem oferecer aos filhos um ambiente de entretenimento alinhado com os valores ensinados dentro de casa.</p>
          <strong>Um lugar onde diversão e Palavra caminham juntas.</strong>
        </div>
        <div className="section-app-cta-wrap" data-reveal><a className="section-app-cta section-app-cta-dark" href="#universo">Conheça o aplicativo Sementinha <ArrowIcon /></a></div>
      </section>

      <section className="parents-connection" aria-labelledby="parents-title" data-scroll-scene data-chapter="08" data-chapter-label="Para toda a família">
        <div className="connection-orb" aria-hidden="true" />
        <div className="connection-copy" data-reveal>
          <p className="section-kicker">As duas coisas, juntas</p>
          <h2 id="parents-title">Para seu filho, diversão. <span>Para você, mais tranquilidade.</span></h2>
          <p>Não queremos que você precise escolher entre um conteúdo que seu filho gosta e um conteúdo que você considera bom para ele. Queremos unir as duas coisas.</p>
          <p>Uma experiência capaz de chamar a atenção da criança, sem abrir mão daquilo que realmente importa.</p>
          <p>Enquanto ela acompanha uma história, conhece um personagem ou completa uma atividade...</p>
          <strong>uma verdade bíblica também pode estar sendo plantada.</strong>
        </div>
        <div className="connection-visual" data-reveal>
          <img src="/media/sementinha-feliz.webp" alt="Sementinha sorrindo" width="1024" height="1024" loading="lazy" />
          <span className="bubble bubble-one">“Jesus me ama”</span>
          <span className="bubble bubble-two">“Eu posso orar”</span>
          <span className="bubble bubble-three">“A Bíblia me ensina”</span>
        </div>
      </section>

      <section className="learning" aria-labelledby="learning-title" data-scroll-scene data-chapter="09" data-chapter-label="A linguagem das crianças">
        <div className="learning-heading" data-reveal>
          <p className="section-kicker">A linguagem da infância</p>
          <h2 id="learning-title">Seu filho pode ser pequeno demais para entender um sermão inteiro. <span>Mas nunca é pequeno demais para conhecer Jesus.</span></h2>
        </div>
        <div className="learning-ticker" aria-label="Como as crianças aprendem">
          {['Histórias', 'Músicas', 'Imagens', 'Personagens', 'Perguntas', 'Exemplos', 'Repetição'].map((item, index) => <div key={item} data-reveal><span>{index + 1}</span>{item}</div>)}
        </div>
        <div className="learning-explanation" data-reveal>
          <p>Por isso, a Sementinha não foi criada simplesmente para pegar conteúdos adultos e torná-los “mais fáceis”.</p>
          <p>Todo o universo é pensado para <strong>falar a linguagem das crianças</strong>, apresentando verdades profundas de uma maneira simples, bonita e compreensível.</p>
        </div>
      </section>

      <section className="relationship" aria-labelledby="relationship-title" data-scroll-scene data-chapter="10" data-chapter-label="Conhecer o próprio Deus">
        <div className="relationship-art" data-reveal>
          <div className="prayer-rays" />
          <img src="/media/sementinha-orando.webp" alt="Sementinha de olhos fechados e mãos juntas em oração" width="1024" height="1024" loading="lazy" />
        </div>
        <div className="relationship-copy" data-reveal>
          <p className="section-kicker">Muito além das histórias</p>
          <h2 id="relationship-title">Não queremos apenas ensinar histórias sobre Deus. <span>Queremos ajudar seu filho a conhecer o próprio Deus.</span></h2>
          <p>Conhecer quem foi Davi, Moisés, Noé, José, Ester e tantos outros personagens bíblicos é importante. Mas existe algo ainda maior.</p>
          <ul>
            <li>Compreender quem Deus é.</li>
            <li>Descobrir que pode conversar com Ele e orar.</li>
            <li>Confiar que Jesus o ama.</li>
            <li>Entender que a Bíblia também foi escrita para ensiná-lo.</li>
          </ul>
          <p>Seguir a Cristo não precisa ser apenas algo que ele observa papai e mamãe fazendo.</p>
          <strong>Ele também pode começar a construir seu próprio relacionamento com Deus.</strong>
        </div>
      </section>

      <section className="roots" aria-labelledby="roots-title" data-scroll-scene data-chapter="11" data-chapter-label="Raízes que permanecem">
        <div className="roots-visual" aria-hidden="true"><div className="sprout"><i /><i /><span /></div><div className="root-lines"><i /><i /><i /><i /><i /></div></div>
        <div className="roots-copy" data-reveal>
          <p className="section-kicker">Formação para a vida</p>
          <h2 id="roots-title">A infância passa. <span>As raízes permanecem.</span></h2>
          <blockquote>“Ensina a criança no caminho em que deve andar...”<cite>Provérbios 22:6</cite></blockquote>
          <p>Você não conseguirá controlar tudo aquilo que seu filho encontrará durante a vida. Mas pode ajudá-lo a construir raízes profundas o suficiente para enfrentar aquilo que encontrará.</p>
          <div className="root-words"><span>Raízes na Palavra.</span><span>Raízes na verdade.</span><span>Raízes em Cristo.</span></div>
          <p>Para que, quando o mundo apresentar inúmeros caminhos...</p>
          <strong>ele já conheça Aquele que é o Caminho.</strong>
        </div>
      </section>

      <section className="impact" aria-labelledby="impact-title" data-scroll-scene data-chapter="12" data-chapter-label="Formação e influência">
        <div className="impact-copy" data-reveal>
          <p className="section-kicker">Pequenos olhos</p>
          <h2 id="impact-title">Pequenos olhos. <span>Grandes influências.</span></h2>
          <p>Às vezes parece ser apenas um desenho. Apenas uma música. Apenas alguns minutos no celular.</p>
          <p>Mas crianças absorvem muito mais do que imaginamos.</p>
        </div>
        <div className="impact-cards">
          <article data-reveal style={{ "--index": 0 } as CSSProperties}><span>01</span><h3>Elas repetem</h3><p>aquilo que escutam.</p></article>
          <article data-reveal style={{ "--index": 1 } as CSSProperties}><span>02</span><h3>Elas imitam</h3><p>aqueles que admiram.</p></article>
          <article data-reveal style={{ "--index": 2 } as CSSProperties}><span>03</span><h3>Elas aprendem</h3><p>através das histórias que consomem.</p></article>
        </div>
        <p className="impact-ending" data-reveal>Por isso, escolher bons conteúdos não é apenas uma decisão sobre entretenimento. <strong>É também uma decisão sobre formação.</strong></p>
        <div className="section-app-cta-wrap" data-reveal><a className="section-app-cta" href="#universo">Ver o que seu filho encontrará no aplicativo <ArrowIcon /></a></div>
      </section>

      <section className="mission" id="missao" aria-labelledby="mission-title" data-scroll-scene data-chapter="13" data-chapter-label="Uma geração para Jesus">
        <div className="mission-lines" aria-hidden="true" />
        <div className="mission-copy" data-reveal>
          <p className="section-kicker">Nossa missão</p>
          <h2 id="mission-title">Queremos ajudar a formar uma geração que conheça Jesus desde pequena.</h2>
          <div className="generation-grid">
            <span>Que conheça a Palavra.</span>
            <span>Que saiba orar.</span>
            <span>Que ame a Deus.</span>
            <span>Que aprenda a discernir aquilo que é bom.</span>
            <span>Que compreenda sua identidade em Cristo.</span>
            <span>Que leve os princípios do Reino para todas as fases da vida.</span>
          </div>
          <p className="brand-statement">Sementinha — Plantando Cristo no coração dos seus filhos.</p>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title" data-scroll-scene data-chapter="14" data-chapter-label="O que permanece">
        <div className="final-rays" aria-hidden="true" />
        <img src="/media/sementinha-biblia.webp" alt="Sementinha segurando a Bíblia" width="1024" height="1024" loading="lazy" />
        <div className="final-copy" data-reveal>
          <p className="section-kicker">Uma escolha que permanece</p>
          <h2 id="final-title">O que você está plantando hoje no coração do seu filho? <span>🌱</span></h2>
          <p>A infância passa rápido. Os brinquedos mudam. Os desenhos favoritos mudam. As fases passam. Mas algumas sementes permanecem.</p>
          <blockquote>“Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.”<cite>Provérbios 22:6</cite></blockquote>
          <p>Ajude seu filho a crescer conhecendo Jesus, aprendendo a Palavra de Deus e construindo desde cedo raízes firmes na fé.</p>
          <h3>Comece hoje a plantar aquilo que você deseja que permaneça por toda a vida.</h3>
          <a className="button button-primary button-large" href="#inicio">Quero apresentar a Sementinha ao meu filho <ArrowIcon /></a>
          <div className="final-signature"><strong>Sementinha — Plantando Cristo no coração dos seus filhos.</strong><span>Seu filho protegido e ensinado pela Palavra de Deus.</span></div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio"><img src="/media/sementinha-feliz.webp" alt="" width="48" height="48" loading="lazy" /><span>Sementinha</span></a>
        <p>Plantando Cristo no coração dos seus filhos.</p>
        <nav aria-label="Links do rodapé"><a href="#proposito">Propósito</a><a href="#universo">Universo</a><a href="#protecao">Proteção</a><a href="#missao">Missão</a></nav>
        <small>© 2026 Sementinha. Conteúdo cristão infantil.</small>
      </footer>
    </main>
  );
}
