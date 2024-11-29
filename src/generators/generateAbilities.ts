interface AbilityEffect {
  name: string;
  description: string;
  type: "normal" | "hidden";
}

const typeAbilities: Record<string, AbilityEffect[]> = {
  fire: [
    {
      name: "Llamarada Interior",
      description:
        "Aumenta el poder de los movimientos de tipo fuego cuando el HP está bajo",
      type: "normal",
    },
    {
      name: "Cuerpo Ardiente",
      description: "Puede quemar al contacto físico",
      type: "normal",
    },
    {
      name: "Combustión Solar",
      description: "Aumenta el Ataque Especial bajo luz solar intensa",
      type: "hidden",
    },
    {
      name: "Calor Residual",
      description:
        "Los movimientos de tipo fuego tienen probabilidad de quemar",
      type: "hidden",
    },
  ],
  water: [
    {
      name: "Hidratación",
      description: "Recupera HP bajo la lluvia",
      type: "normal",
    },
    {
      name: "Piel Húmeda",
      description: "Reduce el daño de movimientos de tipo fuego",
      type: "normal",
    },
    {
      name: "Corriente Marina",
      description: "Aumenta la velocidad bajo la lluvia",
      type: "hidden",
    },
    {
      name: "Hidrodefensa",
      description: "Los movimientos de agua aumentan la defensa",
      type: "hidden",
    },
  ],
  grass: [
    {
      name: "Fotosíntesis",
      description: "Recupera HP bajo luz solar",
      type: "normal",
    },
    {
      name: "Esporas Curativas",
      description: "Puede curar estados alterados",
      type: "normal",
    },
    {
      name: "Clorofila Plus",
      description: "Aumenta todos los stats bajo luz solar",
      type: "hidden",
    },
    {
      name: "Raíces Profundas",
      description: "No puede ser forzado a cambiar",
      type: "hidden",
    },
  ],
  electric: [
    {
      name: "Sobrecarga",
      description: "Los movimientos eléctricos pueden paralizar",
      type: "normal",
    },
    {
      name: "Conductividad",
      description: "Aumenta la velocidad al ser golpeado por electricidad",
      type: "normal",
    },
    {
      name: "Campo Magnético",
      description: "Atrae objetos metálicos y aumenta la precisión",
      type: "hidden",
    },
    {
      name: "Electroboost",
      description: "Los movimientos eléctricos tienen prioridad aumentada",
      type: "hidden",
    },
  ],
  rock: [
    {
      name: "Armadura Pétrea",
      description: "Aumenta la defensa cuando recibe un golpe crítico",
      type: "normal",
    },
    {
      name: "Núcleo Rocoso",
      description: "Reduce el daño de ataques super efectivos",
      type: "normal",
    },
    {
      name: "Mineralización",
      description: "Puede recuperar HP al contacto con rocas",
      type: "hidden",
    },
    {
      name: "Presión Tectónica",
      description: "Aumenta el ataque cuando la defensa sube",
      type: "hidden",
    },
  ],
};
function getRandomAbility(
  abilities: AbilityEffect[],
  type: "normal" | "hidden"
): AbilityEffect {
  const filteredAbilities = abilities.filter(
    (ability) => ability.type === type
  );
  return filteredAbilities[
    Math.floor(Math.random() * filteredAbilities.length)
  ];
}

export function generateAbilities(type: string): {
  normalAbility: AbilityEffect;
  hiddenAbility: AbilityEffect;
} {
  const abilities = typeAbilities[type.toLowerCase()] || [];

  if (abilities.length === 0) {
    return {
      normalAbility: {
        name: "Habilidad Desconocida",
        description: "Esta habilidad aún no ha sido documentada",
        type: "normal",
      },
      hiddenAbility: {
        name: "Habilidad Oculta Desconocida",
        description: "Esta habilidad oculta aún no ha sido documentada",
        type: "hidden",
      },
    };
  }

  return {
    normalAbility: getRandomAbility(abilities, "normal"),
    hiddenAbility: getRandomAbility(abilities, "hidden"),
  };
}
