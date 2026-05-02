'use client';

import { PERSONAJES, PersonajeKey } from '@/lib/personajes';

interface Props {
  fraseIconica: string;
  personaje: PersonajeKey;
  descripcionPersonaje: string;
  numeroSesion: number;
  onVerTarjeta: () => void;
  onNueva: () => void;
}

export default function Diagnostico({
  fraseIconica,
  personaje,
  descripcionPersonaje,
  numeroSesion,
  onVerTarjeta,
  onNueva,
}: Props) {
  const p = PERSONAJES[personaje];

  return (
    <div className="min-h-screen bg-cinema flex items-center justify-center px-5 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-md fade-up">
        <div className="text-center mb-10 sm:mb-12">
          <div className="t-caption text-white/35 mb-2">Sesión #{numeroSesion} · cerrada</div>
          <div className="h-px w-12 bg-[#CC0055] mx-auto" />
        </div>

        <div className="mb-12 sm:mb-16">
          <div className="t-caption text-[#CC0055]/80 mb-4 sm:mb-5 text-center">FERNANDA DICE</div>
          <p className="t-title-1 text-white italic font-light leading-snug text-center px-2">
            &ldquo;{fraseIconica}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="h-px flex-1 bg-white/10" />
          <div className="t-footnote text-white/40">DIAGNÓSTICO</div>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <div className="t-caption text-white/40 mb-2">ERES UNA</div>
          <h1 className="font-display t-display text-white mb-5 sm:mb-6">
            {p.nombre}
          </h1>
          <p className="t-body text-white/60 max-w-sm mx-auto leading-relaxed px-2">
            {descripcionPersonaje || p.descripcion}
          </p>
        </div>

        <div className="space-y-3 mt-10 sm:mt-12">
          <button
            onClick={onVerTarjeta}
            className="w-full bg-[#CC0055] hover:bg-[#FF1A6E] active:bg-[#FF1A6E] text-white t-headline py-3.5 sm:py-4 transition-all"
          >
            Ver tarjeta para compartir →
          </button>
          <button
            onClick={onNueva}
            className="w-full text-white/40 hover:text-white/80 t-footnote transition-colors py-2"
          >
            ↺ Nueva sesión
          </button>
        </div>
      </div>
    </div>
  );
}
