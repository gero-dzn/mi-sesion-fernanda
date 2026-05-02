export type PersonajeKey =
  | 'VICTORIA'
  | 'MATIAS'
  | 'NICOLAS'
  | 'CAROLINA'
  | 'LU'
  | 'DEBBIE'
  | 'MELINA'
  | 'FERNANDA';

export interface Personaje {
  nombre: string;
  fraseIconica: string;
  descripcion: string;
}

export const PERSONAJES: Record<PersonajeKey, Personaje> = {
  VICTORIA: {
    nombre: 'VICTORIA',
    fraseIconica: 'Querés lo que tienen los demás. Incluso cuando ya lo tenés.',
    descripcion: 'La envidia como brújula invertida. Sabés exactamente lo que querés y hacés exactamente lo contrario. Te comparás con todo el mundo, incluso con quienes te envidian a vos.',
  },
  MATIAS: {
    nombre: 'MATÍAS',
    fraseIconica: 'Te quedás cuando los demás se van. Eso también es una decisión.',
    descripcion: 'Sos el que aguanta. Estás cuando hace falta y cuando no. Pero "estar" no siempre es lo mismo que querer estar — y eso a veces te lo ocultás incluso a vos.',
  },
  NICOLAS: {
    nombre: 'NICOLÁS',
    fraseIconica: 'Lo que mostrás brilla. Lo que escondés también.',
    descripcion: 'Aparentás éxito y lo tenés. Pero esa imagen impecable cansa de mantenerla. La perfección es la coraza que te eligió antes que vos.',
  },
  CAROLINA: {
    nombre: 'CAROLINA',
    fraseIconica: 'Sostener todo es una forma de no soltar nada.',
    descripcion: 'Sos la que parece tenerlo bajo control. Llevás el peso de los demás porque es más fácil que llevar el propio. Pero el control y la libertad no son lo mismo.',
  },
  LU: {
    nombre: 'LU',
    fraseIconica: 'Juzgás a los demás para no mirarte. Pero igual te ven.',
    descripcion: 'Sos crítica con todos — y eso lo aprendiste en algún lado. Proyectás una vida ordenada que requiere mucha energía mantener. Tu juicio sobre los demás es el espejo donde no querés mirarte.',
  },
  DEBBIE: {
    nombre: 'DEBBIE',
    fraseIconica: 'Decís lo que nadie dice. Y después no sabés qué hacer con el silencio.',
    descripcion: 'Sos directa, frontal, sin filtro. Tu honestidad es virtud y arma a la vez. Decidís y deshacés con la misma rapidez. Lo que más te cuesta es quedarte quieta con lo que sentís.',
  },
  MELINA: {
    nombre: 'MELINA',
    fraseIconica: 'Lo querés ya. Y si no es ya, lo cambiás.',
    descripcion: 'Vivís en velocidad de impulso. Te enamorás rápido, te desencantás más rápido. La urgencia es tu forma de habitar el deseo. Pero todo lo que se elige rápido pide atención lenta después.',
  },
  FERNANDA: {
    nombre: 'FERNANDA',
    fraseIconica: 'Mirar no es lo mismo que estar afuera.',
    descripcion: 'Observás todo y decís poco. Los demás confunden tu silencio con sabiduría — pero a veces es solo distancia. Ver al otro es más fácil que dejarte ver.',
  },
};
