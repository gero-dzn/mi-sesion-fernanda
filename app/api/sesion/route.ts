import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import {
  SYSTEM_PROMPT_CONVERSACION,
  SYSTEM_PROMPT_CIERRE,
  buildHistorialString,
  MensajeHistorial,
} from '@/lib/prompts';
import { PersonajeKey } from '@/lib/personajes';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TURNOS = 6;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { modo, historial, mensaje } = body as {
      modo: 'continuar' | 'cerrar';
      historial: MensajeHistorial[];
      mensaje?: string;
    };

    if (!modo || !['continuar', 'cerrar'].includes(modo)) {
      return NextResponse.json({ error: 'Modo inválido' }, { status: 400 });
    }
    if (!Array.isArray(historial)) {
      return NextResponse.json({ error: 'Historial requerido' }, { status: 400 });
    }

    if (modo === 'continuar') {
      if (!mensaje || mensaje.length > 500) {
        return NextResponse.json({ error: 'Mensaje inválido' }, { status: 400 });
      }

      // Detectar si este es el último turno (turno 6 del paciente)
      const turnosPacientePrevios = historial.filter((m) => m.rol === 'paciente').length;
      const esUltimoTurno = turnosPacientePrevios + 1 >= MAX_TURNOS;

      const historialStr = buildHistorialString(historial);
      const contextoBase = historialStr
        ? `Historial de la sesión hasta ahora:\n\n${historialStr}\n\nÚltimo mensaje de la paciente: "${mensaje}"`
        : `Primera intervención de la paciente: "${mensaje}"`;

      const userContent = esUltimoTurno
        ? `${contextoBase}\n\nESTE ES EL ÚLTIMO TURNO ANTES DEL CIERRE. Respondé con una despedida in-character como te indica el system prompt: cerrás la sesión, no hacés más preguntas, marcás que tenés algo para devolverle pero no se lo decís ahora. JSON exacto.`
        : `${contextoBase}\n\nRespondé como Fernanda, JSON exacto.`;

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM_PROMPT_CONVERSACION,
        messages: [{ role: 'user', content: userContent }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      if (!textBlock || textBlock.type !== 'text') throw new Error('Respuesta inválida');

      const cleaned = textBlock.text.trim()
        .replace(/^```json\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.mensaje) throw new Error('Falta campo mensaje');

      return NextResponse.json({
        mensaje: parsed.mensaje,
        emergencia: parsed.emergencia === true,
        esUltimoTurno,
      });
    }

    if (modo === 'cerrar') {
      const historialStr = buildHistorialString(historial);

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1200,
        system: SYSTEM_PROMPT_CIERRE,
        messages: [{
          role: 'user',
          content: `Historial completo de la sesión:\n\n${historialStr}\n\nAplicá el método: detectá patrones, mapealos a personajes con citas, elegí el personaje más justificado, generá frase icónica UNIVERSAL del personaje (no específica a la sesión) y descripción. JSON exacto.`,
        }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      if (!textBlock || textBlock.type !== 'text') throw new Error('Respuesta inválida');

      const cleaned = textBlock.text.trim()
        .replace(/^```json\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      const parsed = JSON.parse(cleaned);

      const personajesValidos: PersonajeKey[] = ['VICTORIA', 'MATIAS', 'NICOLAS', 'CAROLINA', 'LU', 'DEBBIE', 'MELINA', 'FERNANDA'];
      if (!personajesValidos.includes(parsed.personaje)) parsed.personaje = 'VICTORIA';

      if (parsed.razonamiento_interno) {
        console.log('[CIERRE] Razonamiento:', parsed.razonamiento_interno);
        console.log('[CIERRE] Personaje:', parsed.personaje);
        console.log('[CIERRE] Frase:', parsed.frase_iconica);
      }

      const numero_sesion = Math.floor(Math.random() * 81) + 40;

      return NextResponse.json({
        frase_iconica: parsed.frase_iconica || 'Caso complejo. Más sesiones requeridas.',
        personaje: parsed.personaje,
        descripcion_personaje: parsed.descripcion_personaje || '',
        numero_sesion,
      });
    }

    return NextResponse.json({ error: 'Modo no manejado' }, { status: 400 });
  } catch (error) {
    console.error('Error en /api/sesion:', error);
    return NextResponse.json({ error: 'Error procesando la sesión' }, { status: 500 });
  }
}
