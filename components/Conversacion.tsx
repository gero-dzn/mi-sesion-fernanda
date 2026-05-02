'use client';

import { useState, useRef, useEffect } from 'react';
import { MensajeHistorial } from '@/lib/prompts';

interface Props {
  onCerrar: (historial: MensajeHistorial[]) => void;
  numeroSesion: number;
}

const MAX_TURNOS = 6;

export default function Conversacion({ onCerrar, numeroSesion }: Props) {
  const [historial, setHistorial] = useState<MensajeHistorial[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const [sesionFinalizada, setSesionFinalizada] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [historial, loading, sesionFinalizada]);

  useEffect(() => {
    if (primeraVez) {
      setHistorial([{ rol: 'fernanda', texto: '¿Cómo llegás hoy a sesión?' }]);
      setPrimeraVez(false);
    }
  }, [primeraVez]);

  const turnosPaciente = historial.filter((m) => m.rol === 'paciente').length;
  const puedeCerrar = turnosPaciente >= 2;
  const turnosRestantes = MAX_TURNOS - turnosPaciente;

  const handleEnviar = async () => {
    if (input.trim().length < 3 || loading || sesionFinalizada) return;

    const texto = input.trim();
    const nuevoHistorial: MensajeHistorial[] = [...historial, { rol: 'paciente', texto }];
    setHistorial(nuevoHistorial);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/sesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modo: 'continuar',
          historial: nuevoHistorial.slice(0, -1),
          mensaje: texto,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();

      const conRespuesta: MensajeHistorial[] = [...nuevoHistorial, { rol: 'fernanda', texto: data.mensaje }];
      setHistorial(conRespuesta);

      if (data.esUltimoTurno) {
        setSesionFinalizada(true);
      }
    } catch (e) {
      console.error(e);
      alert('Hubo un error. Probá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cinema flex flex-col">
      {/* Header con safe-area-top para notch */}
      <header
        className="sticky top-0 z-30 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-3"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
          paddingBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div className="min-w-0 flex-1">
          <div className="t-caption text-white/40">En sesión</div>
          <div className="t-subhead text-white/80 mt-0.5 truncate">Sesión #{numeroSesion}</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="t-footnote text-white/40">{turnosPaciente}/{MAX_TURNOS}</div>
          <div className="flex gap-1">
            {Array.from({ length: MAX_TURNOS }).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < turnosPaciente ? 'bg-[#CC0055]' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>
      </header>

      {/* Conversación scroll */}
      <div ref={scrollRef} className="conversation flex-1 overflow-y-auto overflow-x-hidden px-4 py-8">
        <div className="max-w-xl mx-auto space-y-8">
          {historial.map((m, idx) => (
            <div key={idx} className="fade-up w-full">
              <div className={`t-caption mb-2 ${m.rol === 'paciente' ? 'text-[#CC0055]/70 text-right' : 'text-white/40'}`}>
                {m.rol === 'paciente' ? 'VOS' : 'FERNANDA'}
              </div>
              <p
                className={`whitespace-pre-line break-words ${
                  m.rol === 'fernanda'
                    ? 't-body-lg text-white italic font-light'
                    : 't-body text-white/70 text-right'
                }`}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {m.texto}
              </p>
            </div>
          ))}

          {loading && (
            <div className="w-full fade-in">
              <div className="t-caption text-white/40 mb-2">FERNANDA</div>
              <div className="flex gap-1.5 items-center">
                <span className="pulse-dot bg-white/40 rounded-full" style={{ width: 6, height: 6, animationDelay: '0s' }} />
                <span className="pulse-dot bg-white/40 rounded-full" style={{ width: 6, height: 6, animationDelay: '0.2s' }} />
                <span className="pulse-dot bg-white/40 rounded-full" style={{ width: 6, height: 6, animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {/* CTA grande cuando la sesión terminó */}
          {sesionFinalizada && !loading && (
            <div className="fade-up-slow pt-4">
              <div className="border-t border-white/10 pt-8">
                <div className="t-caption text-[#CC0055] mb-3 text-center">SESIÓN CERRADA</div>
                <h3 className="t-title-1 text-white italic font-light text-center mb-2 leading-snug">
                  Fernanda tiene<br/>algo que decirte.
                </h3>
                <p className="t-body text-white/55 text-center mb-8 max-w-sm mx-auto px-4">
                  Pensó lo que trajiste. Tu diagnóstico está listo.
                </p>
                <button
                  onClick={() => onCerrar(historial)}
                  className="w-full max-w-sm mx-auto block bg-[#CC0055] hover:bg-[#FF1A6E] text-white t-headline py-4 transition-all"
                >
                  Recibir diagnóstico →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input footer (solo si la sesión sigue activa) */}
      {!sesionFinalizada && (
        <div
          className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent"
          style={{
            paddingTop: '24px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
          }}
        >
          <div className="max-w-xl mx-auto">
            {puedeCerrar && (
              <button
                onClick={() => onCerrar(historial)}
                disabled={loading}
                className="block mx-auto mb-3 t-footnote text-[#CC0055] hover:text-[#FF1A6E] transition-colors uppercase tracking-widest disabled:opacity-30"
              >
                ⏸ Cerrar sesión y recibir diagnóstico
              </button>
            )}

            <div className="bg-white/5 backdrop-blur-md border border-white/10 focus-within:border-[#CC0055] transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                placeholder={historial.length <= 1 ? 'Escribí lo que sea...' : 'Seguí contándole a Fernanda...'}
                rows={2}
                disabled={loading}
                className="w-full bg-transparent text-white p-3 resize-none disabled:opacity-50"
                style={{ fontSize: '16px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleEnviar();
                  }
                }}
              />
              <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
                <div className="t-footnote text-white/30">{500 - input.length}</div>
                <button
                  onClick={handleEnviar}
                  disabled={input.trim().length < 3 || loading}
                  className="bg-[#CC0055] hover:bg-[#FF1A6E] text-white t-subhead px-4 py-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {loading ? '...' : 'Responder →'}
                </button>
              </div>
            </div>

            <div className="t-footnote text-white/25 text-center mt-2">
              {turnosRestantes > 0
                ? `Te quedan ${turnosRestantes} ${turnosRestantes === 1 ? 'turno' : 'turnos'}`
                : 'Último turno'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
