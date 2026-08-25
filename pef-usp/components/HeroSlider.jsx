"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Cada slide agora tem imagem, texto próprio e um link de destino.
// Ajuste os campos abaixo (título, descrição, cta, href) conforme o conteúdo real.
const SLIDES = [
  {
    image: "/img/slide1.jpg",
    title: "Departamento de Engenharia de Estruturas e Geotécnica",
    description:
      "O PEF-EPUSP é um dos quatro departamentos responsáveis pela formação de alunos de graduação na habilitação em Engenharia Civil da Escola Politécnica. Ademais, é um dos quatro principais, dentre dezesseis departamentos da Universidade de São Paulo, responsáveis pela formação de alunos de graduação na habilitação em Engenharia Ambiental da Escola Politécnica. Também oferece disciplinas obrigatórias para todas as habilitações de graduação da Escola Politécnica, assim como habilitações do Instituto de Geociências e da Faculdade de Arquitetura e Urbanismo da USP.",
    href: "/quem-somos",
  },
  {
    image: "/img/slide2.jpg",
    title: "Pesquisa",
    description:
      "Laboratórios e projetos que impactam a construção civil no Brasil.",
    href: "/pesquisa",
  },
  {
    image: "/img/slide3.jpg",
    title: "Corpo Docente",
    description: "Conheça os docentes que integram o departamento",
    href: "/professores",
  },
  {
    image: "/img/slide4.jpg",
    title: "Extensão universitária",
    description: "Projetos desenvolvidos por docentes e pesquisadores do PEF que integram a USP com a sociedade.",
    href: "/extensao",
  },
  {
    image: "/img/slide5.jpg",
    title: "Fale com a gente",
    description: "Tire suas dúvidas e entre em contato com o departamento.",
    href: "/#contato",
  },
];

const AUTO_INTERVAL = 5000;

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const router = useRouter();

  function stopAutoPlay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_INTERVAL);
  }

  useEffect(() => {
    startAutoPlay();

    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        startAutoPlay();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      stopAutoPlay();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handlePrev(e) {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startAutoPlay();
  }

  function handleNext(e) {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    startAutoPlay();
  }

  function handleDotClick(e, index) {
    e.stopPropagation();
    setCurrentIndex(index);
    startAutoPlay();
  }

  function handleSlideClick() {
    const href = SLIDES[currentIndex].href;
    if (href) router.push(href);
  }

  return (
    <div className="hero-wrapper">
      <div
        className="hero"
        aria-label="Destaque"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div
          className="hero-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.image}
              className="hero-slide"
              style={{
                backgroundImage: `url('${slide.image}')`,
                cursor: slide.href ? "pointer" : "default",
              }}
              role={slide.href ? "link" : undefined}
              tabIndex={slide.href ? 0 : undefined}
              onClick={i === currentIndex ? handleSlideClick : undefined}
              onKeyDown={(e) => {
                if (i === currentIndex && slide.href && e.key === "Enter") {
                  handleSlideClick();
                }
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1>{SLIDES[currentIndex].title}</h1>
          <div className="hero-actions">
            <p>{SLIDES[currentIndex].description}</p>
            {SLIDES[currentIndex].href && (
              <a
                href={SLIDES[currentIndex].href}
                className="btn"
                onClick={(e) => e.stopPropagation()}
              >
                Saiba mais
              </a>
            )}
          </div>
        </div>

        <button
          className="hero-nav-btn hero-nav-btn--prev"
          aria-label="Slide anterior"
          onClick={handlePrev}
        >
          ‹
        </button>
        <button
          className="hero-nav-btn hero-nav-btn--next"
          aria-label="Próximo slide"
          onClick={handleNext}
        >
          ›
        </button>

        <div className="hero-dots" aria-hidden="true">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={i === currentIndex ? "is-active" : ""}
              aria-label={`Slide ${i + 1}`}
              onClick={(e) => handleDotClick(e, i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
