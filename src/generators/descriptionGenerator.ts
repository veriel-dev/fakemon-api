import { Stats } from "../types/fakemon.type";

interface DescriptionTemplates {
  [key: string]: {
    habitat: string[];
    behavior: string[];
    appearance: string[];
    specialAbility: string[];
  };
}

const typeDescriptions: DescriptionTemplates = {
  fire: {
    habitat: [
      "vive cerca de volcanes activos",
      "habita en cuevas con géiseres",
      "se encuentra en desiertos ardientes",
    ],
    behavior: [
      "expulsa llamas cuando se emociona",
      "su temperatura corporal puede derretir rocas",
      "duerme rodeado de brasas ardientes",
    ],
    appearance: [
      "su piel brilla como carbones encendidos",
      "tiene marcas que se iluminan al calentarse",
      "emite un suave resplandor rojizo",
    ],
    specialAbility: [
      "puede regular la temperatura de su cuerpo a voluntad",
      "sus llamas nunca se apagan bajo el agua",
      "puede detectar fuentes de calor a distancia",
    ],
  },
  water: {
    habitat: [
      "habita en las profundidades oceánicas",
      "vive en lagos cristalinos",
      "se encuentra en ríos subterráneos",
    ],
    behavior: [
      "crea burbujas para comunicarse",
      "puede respirar indefinidamente bajo el agua",
      "genera corrientes de agua al nadar",
    ],
    appearance: [
      "su piel tiene un brillo similar a las escamas",
      "emite un suave resplandor azulado",
      "su cuerpo es parcialmente transparente",
    ],
    specialAbility: [
      "puede purificar agua contaminada",
      "crea esferas de agua flotantes",
      "controla la presión del agua a su alrededor",
    ],
  },
  grass: {
    habitat: [
      "vive en bosques frondosos",
      "habita en jardines antiguos",
      "se encuentra en selvas tropicales",
    ],
    behavior: [
      "florece durante la luna llena",
      "esparce esporas luminosas al caminar",
      "realiza fotosíntesis mientras duerme",
    ],
    appearance: [
      "tiene hojas que cambian con las estaciones",
      "su cuerpo está cubierto de musgo suave",
      "emite un dulce aroma floral",
    ],
    specialAbility: [
      "puede hacer crecer plantas instantáneamente",
      "se camufla perfectamente entre la vegetación",
      "regenera su energía bajo la luz solar",
    ],
  },
  electric: {
    habitat: [
      "habita en zonas de tormentas eléctricas",
      "vive cerca de plantas de energía",
      "se encuentra en nubes cargadas de electricidad",
    ],
    behavior: [
      "genera campos electromagnéticos al dormir",
      "atrae pequeños objetos metálicos",
      "brilla intensamente durante las tormentas",
    ],
    appearance: [
      "su pelaje se eriza con la electricidad estática",
      "tiene patrones que destellan como relámpagos",
      "emite chispas al moverse rápidamente",
    ],
    specialAbility: [
      "puede recargar dispositivos electrónicos",
      "genera campos de fuerza eléctricos",
      "se comunica a través de impulsos electromagnéticos",
    ],
  },
  rock: {
    habitat: [
      "vive en antiguas cordilleras montañosas",
      "habita en cavernas de cristal",
      "se encuentra en formaciones rocosas milenarias",
    ],
    behavior: [
      "hiberna durante largos períodos de tiempo",
      "consume minerales para fortalecerse",
      "se mimetiza con las formaciones rocosas",
    ],
    appearance: [
      "su piel tiene la textura de granito pulido",
      "está cubierto de cristales preciosos",
      "cambia de color según los minerales que consume",
    ],
    specialAbility: [
      "puede endurecer su cuerpo hasta ser indestructible",
      "detecta depósitos de minerales valiosos",
      "crea túneles a través de la roca sólida",
    ],
  },
};

const statDescriptors = {
  highHp: [
    "es conocido por su extraordinaria resistencia",
    "puede soportar golpes que derribarían a otros Fakemon",
    "posee una vitalidad incomparable",
  ],
  highAttack: [
    "sus golpes son devastadores",
    "posee una fuerza física excepcional",
    "puede derribar árboles de un solo golpe",
  ],
  highDefense: [
    "su cuerpo es prácticamente impenetrable",
    "pocos ataques logran dañarlo",
    "su defensa natural es extraordinaria",
  ],
  highSpAtk: [
    "sus ataques especiales son temibles",
    "canaliza energía con gran poder",
    "sus poderes elementales son devastadores",
  ],
  highSpDef: [
    "resiste ataques energéticos con facilidad",
    "tiene una resistencia mística excepcional",
    "los ataques especiales apenas lo afectan",
  ],
  highSpeed: [
    "se mueve más rápido que el ojo puede seguir",
    "su velocidad es legendaria",
    "pocos pueden igualar su agilidad",
  ],
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getStatStrengths(stats: Stats): string[] {
  const strengths: string[] = [];

  if (stats.hp > 80) strengths.push(getRandomElement(statDescriptors.highHp));
  if (stats.attack > 90)
    strengths.push(getRandomElement(statDescriptors.highAttack));
  if (stats.defense > 85)
    strengths.push(getRandomElement(statDescriptors.highDefense));
  if (stats.spAtk > 90)
    strengths.push(getRandomElement(statDescriptors.highSpAtk));
  if (stats.spDef > 85)
    strengths.push(getRandomElement(statDescriptors.highSpDef));
  if (stats.speed > 90)
    strengths.push(getRandomElement(statDescriptors.highSpeed));

  return strengths;
}

export function generateDescription(
  type: string,
  stats: Stats,
  name: string
): string {
  const templates = typeDescriptions[type.toLowerCase()];
  if (!templates) return "Un misterioso Fakemon.";

  const habitat = getRandomElement(templates.habitat);
  const behavior = getRandomElement(templates.behavior);
  const appearance = getRandomElement(templates.appearance);
  const specialAbility = getRandomElement(templates.specialAbility);
  const statStrengths = getStatStrengths(stats);

  const description = [`${name} ${habitat}.`, appearance, behavior];

  if (statStrengths.length > 0) {
    description.push(getRandomElement(statStrengths));
  }

  description.push(specialAbility);

  return description.join(" ");
}

// Función para generar descripciones más complejas para Fakemon de tipos duales
export function generateDualTypeDescription(
  types: string[],
  stats: Stats,
  name: string
): string {
  if (types.length !== 2) return generateDescription(types[0], stats, name);

  const type1 = typeDescriptions[types[0].toLowerCase()];
  const type2 = typeDescriptions[types[1].toLowerCase()];

  if (!type1 || !type2) return generateDescription(types[0], stats, name);

  const description = [
    `Este peculiar ${name} combina características de sus dos tipos.`,
    getRandomElement(type1.appearance),
    getRandomElement(type2.behavior),
    getRandomElement(getStatStrengths(stats)),
  ];

  return description.join(" ");
}
