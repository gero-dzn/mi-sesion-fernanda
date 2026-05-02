'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { toPng } from 'html-to-image';
import { PERSONAJES, PersonajeKey } from '@/lib/personajes';

interface Props {
  fraseIconica: string;
  personaje: PersonajeKey;
  descripcionPersonaje: string;
  numeroSesion: number;
  onVolver: () => void;
}

const WRAP_CLASS: Record<PersonajeKey, string> = {
  VICTORIA: 'wrap-victoria',
  MATIAS: 'wrap-matias',
  NICOLAS: 'wrap-nicolas',
  CAROLINA: 'wrap-carolina',
  LU: 'wrap-lu',
  DEBBIE: 'wrap-debbie',
  MELINA: 'wrap-melina',
  FERNANDA: 'wrap-fernanda',
};

// Path al sticker — minúsculas, sin tildes
const STICKER_PATH: Record<PersonajeKey, string> = {
  VICTORIA: '/stickers/sticker-victoria.png',
  MATIAS: '/stickers/sticker-matias.png',
  NICOLAS: '/stickers/sticker-nicolas.png',
  CAROLINA: '/stickers/sticker-carolina.png',
  LU: '/stickers/sticker-lu.png',
  DEBBIE: '/stickers/sticker-debbie.png',
  MELINA: '/stickers/sticker-melina.png',
  FERNANDA: '/stickers/sticker-fernanda.png',
};

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const SHARE_URL = 'mi-sesion-fernanda.vercel.app';

function useAutoFitText(text: string, maxFontSize = 280, minFontSize = 100, safetyMargin = 12) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useLayoutEffect(() => {
    let rafId: number;

    const fit = () => {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth - safetyMargin;
      if (containerWidth <= 0) {
        rafId = requestAnimationFrame(fit);
        return;
      }

      let size = maxFontSize;
      textRef.current.style.fontSize = `${size}px`;

      while (textRef.current.scrollWidth > containerWidth && size > minFontSize) {
        size -= 2;
        textRef.current.style.fontSize = `${size}px`;
      }

      setFontSize(size);
    };

    rafId = requestAnimationFrame(() => requestAnimationFrame(fit));
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(fit);
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [text, maxFontSize, minFontSize, safetyMargin]);

  return { containerRef, textRef, fontSize };
}

interface PosterContentProps {
  fraseIconica: string;
  numeroSesion: number;
  personajeNombre: string;
  stickerSrc: string;
  scale?: number;
}

// FRASE ICÓNICA DEL PERSONAJE — la pieza viral
function PosterContent({
  fraseIconica,
  numeroSesion,
  personajeNombre,
  stickerSrc,
  scale = 1,
}: PosterContentProps) {
  const { containerRef, textRef, fontSize } = useAutoFitText(
    personajeNombre,
    Math.round(280 * scale),
    Math.round(100 * scale),
    Math.round(12 * scale),
  );

  const px = (n: number) => `${Math.round(n * scale)}px`;

  return (
    <div
      className="relative z-10 h-full flex flex-col"
      style={{ padding: px(72) }}
    >
      {/* Header */}
      <div className="flex items-start justify-between" style={{ marginBottom: px(20) }}>
        <div
          className="font-display font-black text-white leading-none tracking-tight"
          style={{ fontSize: px(72) }}
        >
          ENVIDIOSA
        </div>
        <div
          className="font-display font-black text-white leading-none"
          style={{ fontSize: px(64) }}
        >
          N
        </div>
      </div>

      <div
        className="text-white/70"
        style={{
          fontSize: px(26),
          letterSpacing: '0.22em',
          fontWeight: 500,
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        TEMPORADA 4 · NETFLIX · SESIÓN #{numeroSesion}
      </div>

      {/* STICKER del personaje — protagonista visual */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ minHeight: px(60), width: '100%' }}
      >
        <img
          src={stickerSrc}
          alt={personajeNombre}
          style={{
            width: '100%',
            height: px(900),
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Diagnóstico */}
      <div>
        <div
          style={{
            height: '2px',
            background: 'rgba(255,255,255,0.30)',
            marginBottom: px(40),
          }}
        />

        <div
          className="text-white/75"
          style={{
            fontSize: px(24),
            letterSpacing: '0.26em',
            fontWeight: 600,
            marginBottom: px(20),
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          DIAGNÓSTICO DE PERSONAJE
        </div>

        <div
          className="text-white italic"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: px(38),
            fontWeight: 400,
            marginBottom: px(12),
            opacity: 0.95,
          }}
        >
          sos una
        </div>

        <div ref={containerRef} className="w-full" style={{ marginBottom: px(40) }}>
          <div
            ref={textRef}
            className="font-display font-black text-white leading-[0.86] tracking-tight"
            style={{
              fontSize: `${fontSize}px`,
              whiteSpace: 'nowrap',
            }}
          >
            {personajeNombre}
          </div>
        </div>

        <div
          className="glass-card"
          style={{ padding: px(40), borderRadius: px(8), marginBottom: px(48) }}
        >
          <p
            className="text-white italic"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: px(40),
              lineHeight: 1.32,
              fontWeight: 400,
              letterSpacing: '-0.015em',
            }}
          >
            &ldquo;{fraseIconica}&rdquo;
          </p>
        </div>

        <div
          style={{
            paddingTop: px(28),
            borderTop: '2px solid rgba(255,255,255,0.30)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="text-white"
            style={{
              fontSize: px(28),
              fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {SHARE_URL}
          </div>
          <div
            className="text-white/65"
            style={{
              fontSize: px(24),
              fontWeight: 500,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            @gero.dzn
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TarjetaWrapped({
  fraseIconica,
  personaje,
  descripcionPersonaje,
  numeroSesion,
  onVolver,
}: Props) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [working, setWorking] = useState(false);
  const p = PERSONAJES[personaje];
  const wrapClass = WRAP_CLASS[personaje];
  const stickerSrc = STICKER_PATH[personaje];

  const fraseFinal = fraseIconica || p.fraseIconica;

  const generar = async (): Promise<string | null> => {
    if (!exportRef.current) return null;
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);

    return await toPng(exportRef.current, {
      cacheBust: true,
      pixelRatio: 1,
      width: STORY_WIDTH,
      height: STORY_HEIGHT,
      backgroundColor: '#CC0055',
    });
  };

  const handleDescargar = async () => {
    if (working) return;
    setWorking(true);
    try {
      const dataUrl = await generar();
      if (!dataUrl) return;
      const link = document.createElement('a');
      link.download = `mi-sesion-fernanda-${numeroSesion}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setWorking(false);
    }
  };

  const handleCompartir = async () => {
    if (working) return;
    setWorking(true);
    try {
      const dataUrl = await generar();
      if (!dataUrl) return;
      if (typeof navigator !== 'undefined' && navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `mi-sesion-${numeroSesion}.png`, { type: 'image/png' });
        try {
          await navigator.share({
            files: [file],
            title: 'Mi Sesión con Fernanda',
            text: `Tuve sesión con Fernanda. Soy una ${p.nombre}.`,
          });
        } catch { handleDescargar(); }
      } else {
        handleDescargar();
      }
    } finally {
      setWorking(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cinema flex flex-col items-center justify-center px-4 fade-up"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 32px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)',
      }}
    >
      <div className="w-full max-w-[360px] sm:max-w-sm">
        <div className="text-center mb-6">
          <div className="t-caption text-[#CC0055] mb-2">TU DIAGNÓSTICO ESTÁ LISTO</div>
          <p className="t-body-lg text-white italic font-light leading-snug">
            Compartilo en tu story.<br/>
            Que tus amigas se reconozcan también.
          </p>
        </div>

        <div
          className={`${wrapClass} relative overflow-hidden`}
          style={{ aspectRatio: '9/16', width: '100%' }}
        >
          <div className="noise-overlay" />
          <PosterContent
            fraseIconica={fraseFinal}
            numeroSesion={numeroSesion}
            personajeNombre={p.nombre}
            stickerSrc={stickerSrc}
            scale={0.32}
          />
        </div>

        <div
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            opacity: 0,
            zIndex: -1,
            transform: 'translateX(-200vw)',
          }}
        >
          <div
            ref={exportRef}
            className={`${wrapClass} relative overflow-hidden`}
            style={{ width: STORY_WIDTH, height: STORY_HEIGHT }}
          >
            <div className="noise-overlay" />
            <PosterContent
              fraseIconica={fraseFinal}
              numeroSesion={numeroSesion}
              personajeNombre={p.nombre}
              stickerSrc={stickerSrc}
              scale={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-5">
          <button
            onClick={handleCompartir}
            disabled={working}
            className="bg-[#CC0055] hover:bg-[#FF1A6E] active:bg-[#FF1A6E] text-white py-3 transition-all disabled:opacity-50 t-headline border-2 border-white/40"
          >
            {working ? '...' : '↑ Compartir'}
          </button>
          <button
            onClick={handleDescargar}
            disabled={working}
            className="border border-white/25 hover:border-white/60 active:bg-white/5 text-white py-3 transition-all disabled:opacity-50 t-headline"
          >
            {working ? '...' : '↓ Guardar'}
          </button>
        </div>

        <button
          onClick={onVolver}
          className="block mx-auto mt-3 text-white/35 hover:text-white/80 transition-colors py-2"
          style={{ fontSize: '11px', letterSpacing: '0.05em' }}
        >
          ← Volver al diagnóstico
        </button>
      </div>
    </div>
  );
}
