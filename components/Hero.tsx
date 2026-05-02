'use client';

interface Props {
  onEmpezar: () => void;
}

export default function Hero({ onEmpezar }: Props) {
  return (
    <div className="min-h-screen bg-cinema relative flex flex-col">
      <header className="relative z-20 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/5">
        <div className="font-display font-black text-xl sm:text-2xl text-[#E50914] leading-none">N</div>
        <div className="t-caption text-white/30">Fan Project</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-6 py-10 sm:py-16 fade-up">
        <div className="w-full max-w-md text-center">
          <div className="t-caption text-white/35 mb-4 sm:mb-5">Una experiencia de</div>

          <h1 className="font-display t-display text-white mb-3">
            ENVIDIOSA
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            <div className="h-px w-8 sm:w-12 bg-white/15" />
            <div className="t-footnote text-white/40 whitespace-nowrap">TEMPORADA 4 · DISPONIBLE</div>
            <div className="h-px w-8 sm:w-12 bg-white/15" />
          </div>

          <h2 className="t-title-1 text-white/95 mb-1 sm:mb-2 font-body font-light">
            Tu sesión
          </h2>
          <h2 className="t-title-1 text-white font-body font-bold mb-6 sm:mb-7">
            con Fernanda.
          </h2>

          <p className="t-body text-white/55 max-w-sm mx-auto mb-10 sm:mb-12 leading-relaxed px-2">
            Una conversación con la psicoanalista de Vicky.
            Ella escucha. Vos hablás. Después te dice quién sos.
          </p>

          <button
            onClick={onEmpezar}
            className="bg-[#CC0055] hover:bg-[#FF1A6E] active:bg-[#FF1A6E] text-white t-headline px-8 sm:px-10 py-3.5 sm:py-4 transition-all flex items-center gap-3 mx-auto"
          >
            <span className="text-sm">▶</span>
            <span>Empezar sesión</span>
          </button>

          <div className="t-footnote text-white/25 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
            fan project · no afiliado a Netflix · @gero.dzn
          </div>
        </div>
      </div>
    </div>
  );
}
