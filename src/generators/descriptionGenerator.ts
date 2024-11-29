interface DescriptionTemplates {
  [key: string]: {
    prefix: string[];
    habitat: string[];
    behavior: string[];
    appearance: string[];
    specialAbility: string[];
    filler: string[];
  };
}

const TARGET_LENGTH = 30;
const LENGTH_TOLERANCE = 20;

const typeDescriptions: DescriptionTemplates = {
  fire: {
    prefix: [
      "Este fascinante Pokémon de fuego",
      "Como criatura de naturaleza ardiente",
      "Siendo un poderoso ser de las llamas",
    ],
    habitat: [
      "ha establecido su territorio cerca de volcanes activos",
      "prefiere habitar en cuevas con géiseres burbujeantes",
      "ha adaptado su cuerpo para sobrevivir en desiertos ardientes",
    ],
    behavior: [
      "cuando se emociona, expulsa llamaradas de intenso calor",
      "mantiene una temperatura corporal capaz de derretir rocas",
      "busca lugares cálidos para dormir entre brasas ardientes",
    ],
    appearance: [
      "Su piel resplandece como carbones recién encendidos",
      "Su cuerpo está cubierto de marcas que brillan al calentarse",
      "Todo su ser emite un característico resplandor rojizo",
    ],
    specialAbility: [
      "puede regular la temperatura de su cuerpo a voluntad",
      "sus llamas son tan potentes que ni el agua puede extinguirlas",
      "puede detectar fuentes de calor a gran distancia",
    ],
    filler: [
      "Los investigadores continúan estudiando sus peculiares características",
      "Su presencia es muy apreciada por los entrenadores expertos",
      "Se dice que su poder aumenta en días soleados",
      "Los habitantes locales lo consideran un guardián de la región",
      "Su comportamiento fascina a los científicos Pokémon",
    ],
  },
  water: {
    prefix: [
      "Esta majestuosa criatura acuática",
      "Como ejemplar único entre los Pokémon de agua",
      "Adaptado perfectamente al medio acuático",
    ],
    habitat: [
      "ha encontrado su hogar en las profundidades oceánicas",
      "prospera en los lagos más cristalinos de la región",
      "habita en intrincados sistemas de ríos subterráneos",
    ],
    behavior: [
      "se comunica mediante elaborados patrones de burbujas",
      "ha desarrollado la capacidad de respirar eternamente bajo el agua",
      "genera poderosas corrientes con sus elegantes movimientos",
    ],
    appearance: [
      "Su piel reluce con un brillo similar a escamas preciosas",
      "Su cuerpo emite un sereno resplandor azulado hipnótico",
      "Posee una estructura parcialmente transparente para camuflarse",
    ],
    specialAbility: [
      "posee la habilidad de purificar aguas contaminadas",
      "puede crear y manipular esferas de agua flotantes",
      "controla con precisión la presión del agua a su alrededor",
    ],
    filler: [
      "Los marineros lo consideran un presagio de buena suerte",
      "Su presencia indica la pureza de las aguas donde habita",
      "Es admirado por su gracia al nadar",
      "Los científicos estudian sus métodos de navegación",
      "Su comportamiento influye en las corrientes marinas locales",
    ],
  },
  grass: {
    prefix: [
      "Este armonioso Pokémon de planta",
      "Como ser vinculado a la naturaleza",
      "Siendo una criatura del bosque",
    ],
    habitat: [
      "ha creado su hogar en los bosques más antiguos",
      "prospera en jardines centenarios llenos de vida",
      "ha encontrado refugio en las selvas más densas",
    ],
    behavior: [
      "realiza fotosíntesis mientras descansa plácidamente",
      "esparce esporas luminiscentes durante sus paseos nocturnos",
      "desarrolla un vínculo simbiótico con las plantas a su alrededor",
    ],
    appearance: [
      "Su cuerpo está adornado con hojas que cambian según la estación",
      "Su piel está cubierta por un suave musgo que brilla con el rocío",
      "Sus patrones naturales imitan perfectamente el follaje del bosque",
    ],
    specialAbility: [
      "puede acelerar el crecimiento de las plantas a su alrededor",
      "se mimetiza completamente con la vegetación cuando lo necesita",
      "absorbe energía solar para potenciar sus habilidades naturales",
    ],
    filler: [
      "Los botánicos estudian sus propiedades curativas con gran interés",
      "Su presencia revitaliza los ecosistemas deteriorados",
      "Las plantas florecen con más vigor en su territorio",
      "Los jardineros buscan su bendición para sus cultivos",
      "Su conexión con la naturaleza inspira a los conservacionistas",
    ],
  },
  electric: {
    prefix: [
      "Este energético Pokémon eléctrico",
      "Como maestro de la electricidad",
      "Siendo una fuente de poder electromagnético",
    ],
    habitat: [
      "frecuenta áreas donde abundan las tormentas eléctricas",
      "ha establecido su territorio cerca de campos electromagnéticos naturales",
      "prefiere las alturas donde los rayos son más frecuentes",
    ],
    behavior: [
      "genera campos electromagnéticos mientras duerme profundamente",
      "atrae pequeños objetos metálicos con su campo energético",
      "resplandece con mayor intensidad durante las tormentas",
    ],
    appearance: [
      "Su pelaje se eriza constantemente debido a la electricidad estática",
      "Su cuerpo está marcado con patrones que brillan como relámpagos",
      "Emite destellos y chispas con cada movimiento rápido",
    ],
    specialAbility: [
      "puede recargar dispositivos electrónicos con solo tocarlos",
      "genera campos de fuerza eléctricos para su protección",
      "se comunica a través de pulsos electromagnéticos precisos",
    ],
    filler: [
      "Los ingenieros estudian su capacidad de generar energía limpia",
      "Su presencia puede interferir con equipos electrónicos cercanos",
      "Las tormentas se intensifican cuando está presente",
      "Los científicos analizan su sistema de almacenamiento de energía",
      "Su poder podría revolucionar la tecnología energética",
    ],
  },
  rock: {
    prefix: [
      "Este resistente Pokémon de roca",
      "Como guardián de las montañas",
      "Siendo una antigua criatura mineral",
    ],
    habitat: [
      "reside en las cordilleras más antiguas del mundo",
      "ha convertido antiguas cavernas de cristal en su hogar",
      "habita en formaciones rocosas que datan de eras prehistóricas",
    ],
    behavior: [
      "entra en largos períodos de hibernación para fortalecerse",
      "consume minerales específicos para mantener su dureza",
      "se camufla perfectamente entre las formaciones rocosas",
    ],
    appearance: [
      "Su cuerpo está formado por una rara variedad de minerales pulidos",
      "Su superficie está decorada con cristales de diversos colores",
      "Su piel tiene patrones que reflejan los minerales que consume",
    ],
    specialAbility: [
      "puede cristalizar su cuerpo hasta volverse prácticamente indestructible",
      "detecta vetas de minerales valiosos en las profundidades",
      "crea túneles perfectos a través de la roca más dura",
    ],
    filler: [
      "Los geólogos estudian su composición única con fascinación",
      "Su presencia indica la existencia de minerales raros",
      "Las montañas guardan secretos de su antiguo origen",
      "Los mineros respetan su rol como guardián de la tierra",
      "Su conocimiento de las rocas supera cualquier tecnología actual",
    ],
  },
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function adjustLength(
  text: string,
  targetLength: number,
  fillerSentences: string[]
): string {
  let currentLength = text.length;
  let adjustedText = text;

  while (
    currentLength < targetLength - LENGTH_TOLERANCE &&
    fillerSentences.length > 0
  ) {
    const filler = fillerSentences.pop();
    if (filler && !adjustedText.includes(filler)) {
      adjustedText += ` ${filler}.`;
      currentLength = adjustedText.length;
    }
  }

  if (currentLength > targetLength + LENGTH_TOLERANCE) {
    const sentences = adjustedText.split(". ").filter((s) => s.length > 0);
    while (
      sentences.length > 3 &&
      adjustedText.length > targetLength + LENGTH_TOLERANCE
    ) {
      sentences.pop();
      adjustedText = sentences.join(". ") + ".";
      currentLength = adjustedText.length;
    }
  }

  return adjustedText;
}

export function generateDescription(type: string, name: string): string {
  const templates = typeDescriptions[type.toLowerCase()];
  if (!templates) {
    return `${name} es un misterioso Pokémon que requiere más investigación.`;
  }

  const mainDescription = [
    `${getRandomElement(templates.prefix)} ${getRandomElement(
      templates.habitat
    )}. `,
    `${getRandomElement(templates.appearance)}. `,
    `De manera fascinante, ${getRandomElement(templates.behavior)}. `,
    `${getRandomElement(templates.specialAbility)}. `,
  ].join("");

  return adjustLength(mainDescription, TARGET_LENGTH, [...templates.filler]);
}
