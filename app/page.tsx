'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Conversacion from '@/components/Conversacion';
import Diagnostico from '@/components/Diagnostico';
import TarjetaWrapped from '@/components/TarjetaWrapped';
import { PersonajeKey } from '@/lib/personajes';
import { MensajeHistorial } from '@/lib/prompts';

type Estado = 'hero' | 'conversacion' | 'cerrando' | 'diagnostico' | 'tarjeta';

interface CierreData {
  fraseIconica: string;
  personaje: PersonajeKey;
  descripcionPersonaje: string;
  numeroSesion: number;
}

export default function Home() {
  const [estado, setEstado] = useState<Estado>('hero');
  const [cierre, setCierre] = useState<CierreData | null>(null);
  const [numeroSesion] = useState(() => Math.floor(Math.random() * 81) + 40);

  const handleCerrar = async (historial: MensajeHistorial[]) => {
    setEstado('cerrando');
    try {
      const res = await fetch('/api/sesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modo: 'cerrar', historial }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('[handleCerrar] API respondió con error:', res.status, errorText);
        throw new Error(`API error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log('[handleCerrar] Datos recibidos:', data);

      setCierre({
        fraseIconica: data.frase_iconica,
        personaje: data.personaje,
        descripcionPersonaje: data.descripcion_personaje,
        numeroSesion: data.numero_sesion,
      });
      setEstado('diagnostico');
    } catch (e) {
      console.error('[handleCerrar] Error completo:', e);
      alert('Error cerrando sesión. Mirá la consola del navegador (F12) y la terminal del server para ver el detalle. Probá de nuevo.');
      setEstado('conversacion');
    }
  };

  const handleNueva = () => {
    setCierre(null);
    setEstado('hero');
  };

  return (
    <main>
      {estado === 'hero' && <Hero onEmpezar={() => setEstado('conversacion')} />}
      {estado === 'conversacion' && (
        <Conversacion onCerrar={handleCerrar} numeroSesion={numeroSesion} />
      )}
      {estado === 'cerrando' && (
        <div className="min-h-screen bg-cinema flex items-center justify-center px-6">
          <div className="text-center fade-in">
            <div className="t-caption text-white/40 mb-4">PREPARANDO DIAGNÓSTICO</div>
            <p className="t-body-lg italic text-white/80">Fernanda está pensándolo bien...</p>
            <div className="flex gap-1.5 justify-center mt-6">
              <span className="pulse-dot bg-[#CC0055] rounded-full" style={{ width: 8, height: 8, animationDelay: '0s' }} />
              <span className="pulse-dot bg-[#CC0055] rounded-full" style={{ width: 8, height: 8, animationDelay: '0.2s' }} />
              <span className="pulse-dot bg-[#CC0055] rounded-full" style={{ width: 8, height: 8, animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}
      {estado === 'diagnostico' && cierre && (
        <Diagnostico
          {...cierre}
          fraseIconica={cierre.fraseIconica}
          descripcionPersonaje={cierre.descripcionPersonaje}
          numeroSesion={cierre.numeroSesion}
          onVerTarjeta={() => setEstado('tarjeta')}
          onNueva={handleNueva}
        />
      )}
      {estado === 'tarjeta' && cierre && (
        <TarjetaWrapped
          {...cierre}
          fraseIconica={cierre.fraseIconica}
          descripcionPersonaje={cierre.descripcionPersonaje}
          numeroSesion={cierre.numeroSesion}
          onVolver={() => setEstado('diagnostico')}
        />
      )}
    </main>
  );
}
