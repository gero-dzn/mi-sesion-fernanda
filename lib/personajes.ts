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
  descripcion: string;
  fraseIconica: string;
  frasesIconicas: string[];
}

export const PERSONAJES: Record<PersonajeKey, Personaje> = {

  VICTORIA: {
    nombre: 'VICTORIA',
    descripcion: 'Querés lo que tienen los demás, hacés lo opuesto a lo que decís querer, y todavía esperás que esta vez sí, esta vez te toque.',
    fraseIconica: 'Estoy buscando que alguien me analice, pero que no me juzgue.',
    frasesIconicas: [
      'Estoy buscando que alguien me analice, pero que no me juzgue.',
      'A los 45 te dicen "te vino a buscar la abuela", ¿entendés?',
      'No es que sea envidiosa, lo que pasa es que ellas tienen suerte y a mí me pasan cosas.',
      'Yo no estoy mal, es que el universo está mal organizado.',
      'Si me ven feliz, ¿qué van a tener para envidiar?',
      'Tengo todo bajo control. Lo único que me falta es bajar la velocidad y dormir.',
      'No es competencia. Es que no me banco que les salga primero.',
    ],
  },

  MATIAS: {
    nombre: 'MATÍAS',
    descripcion: 'El que se queda. El que aguanta. El que te banca cuando ni vos te bancás. Y un día, sin avisar, también se cansa.',
    fraseIconica: 'No me hagas elegir entre entenderte y querer estar bien.',
    frasesIconicas: [
      'No me hagas elegir entre entenderte y querer estar bien.',
      'Yo te banco. Pero "bancar" no es lo mismo que "elegir".',
      'No me enojo. Me canso, que es peor.',
      'Hace rato que dejé de pedirte cosas porque ya sabía la respuesta.',
      'Vos te complicás. Yo te miro complicarte y trato de no opinar.',
      'Estoy esperando algo que vos todavía no decidiste.',
      'Te quiero, posta. Pero querer no alcanza para tanto.',
    ],
  },

  NICOLAS: {
    nombre: 'NICOLÁS',
    descripcion: 'Lo tuyo afuera brilla, lo tuyo adentro pesa. Mostrás éxito porque mostrar otra cosa te resulta inadmisible.',
    fraseIconica: 'No es que sea perfecto. Es que aprendí a mostrar lo mejor.',
    frasesIconicas: [
      'No es que sea perfecto. Es que aprendí a mostrar lo mejor.',
      'No tengo problemas, tengo proyectos en curso.',
      'No vuelvo al pasado. El pasado vuelve solo cuando le conviene.',
      'No soy frío, soy selectivo con dónde pongo la energía.',
      'Si me ves bien es porque sabés mirar.',
      'No me hago el galán. Soy. Es distinto.',
      'No vine a competir. Vine a ganar tranquilo.',
    ],
  },

  CAROLINA: {
    nombre: 'CAROLINA',
    descripcion: 'Sostenés a todo el mundo. La pregunta no es cómo. La pregunta es desde cuándo nadie te preguntó si querías.',
    fraseIconica: 'Estoy bien, en serio. Es que estar bien también cansa.',
    frasesIconicas: [
      'Estoy bien, en serio. Es que estar bien también cansa.',
      'No es que me haga cargo de todo. Es que si no lo hago yo no lo hace nadie.',
      'Si yo me caigo, se cae todo. Y todavía no aprendí a caerme.',
      'No estoy cansada, estoy administrando.',
      'A mí decime qué hay que hacer, sentirlo lo hace otro.',
      'No pido ayuda. Aviso cuando ya no se puede más.',
      'Yo soy la fuerte. Es un trabajo full time, sin vacaciones.',
    ],
  },

  LU: {
    nombre: 'LU',
    descripcion: 'Tenés todo bien hecho. Demasiado bien hecho. Tan bien hecho que no se nota cuándo dejaste de elegirlo.',
    fraseIconica: 'Ay, ¿por la plata? Ay gorda, pero eso se soluciona en un segundo.',
    frasesIconicas: [
      'Ay, ¿por la plata? Ay gorda, pero eso se soluciona en un segundo.',
      'Quiero tener plata en la cuenta y poder sacarle la etiqueta a una prenda.',
      'No los critico, los observo. Es distinto.',
      'Yo no juzgo. Tengo estándares y los aplico.',
      'No, posta, no entiendo cómo viven así.',
      'Mi vida no es perfecta, es ordenada. Que es mejor.',
      'Yo nunca haría eso. Por eso me sale tan natural decirlo.',
    ],
  },

  DEBBIE: {
    nombre: 'DEBBIE',
    descripcion: 'Decís lo que nadie dice. Tenés razón. Y a la noche te preguntás por qué nadie te llama.',
    fraseIconica: 'No es que sea cruda. Es que ustedes son tibias.',
    frasesIconicas: [
      'No es que sea cruda. Es que ustedes son tibias.',
      'Yo digo lo que pienso. Que ustedes no lo digan es un tema suyo.',
      'No me arrepiento de lo que dije, me arrepiento del momento que elegí.',
      'Si querían que sea suave no me hubieran preguntado a mí.',
      'No filtro nada. Edito en vivo, pero apenas.',
      'Lo que dije es verdad. Lo que pasa es que nadie quería oírlo.',
      'Pienso una cosa y digo esa misma cosa. Es un sistema, ¿sabés?',
    ],
  },

  MELINA: {
    nombre: 'MELINA',
    descripcion: 'Te enamorás rápido y te desenamorás más rápido. La velocidad es la única forma que conocés de sentir intensidad.',
    fraseIconica: 'Si tarda en pasar, ya pasó.',
    frasesIconicas: [
      'Si tarda en pasar, ya pasó.',
      'Cuando lo sentís, lo sentís. Cuando no, también.',
      'No estoy buscando algo serio. Estoy buscando algo ya.',
      'Lo decidí en un segundo. Al segundo siguiente lo dudé. Al otro ya lo había hecho.',
      'No soy intensa, soy entusiasta con consecuencias.',
      'Yo no me apuro. Es que el tiempo me apura a mí.',
      'Me enamoré ayer. Hoy ya estamos viendo qué onda.',
    ],
  },

  FERNANDA: {
    nombre: 'FERNANDA',
    descripcion: 'Mirás a todos. Analizás a todos. Y cuando te toca a vos, te quedás callada como si la analizada fuera otra.',
    fraseIconica: 'Vamos a agregar una sesión más por semana, ¿sí?',
    frasesIconicas: [
      'Vamos a agregar una sesión más por semana, ¿sí?',
      'Si vos te vieras como yo te veo, no dejarías que nadie te trate así.',
      'No es que no hable. Es que escucho mejor que ustedes.',
      'No vine a darte respuestas. Vine a que las descubras.',
      'Tu silencio es lo más interesante que dijiste hoy.',
      'Las palabras importantes no se dicen, se eligen.',
      'Si tengo cara de juzgarte, perdón. Es mi cara.',
    ],
  },

};
