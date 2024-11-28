import { Fakemon, Stats } from "../types/fakemon.type";

export interface Interval {
    min: number;
    max: number;
}

interface StatsFakemon {
    hp:      Interval;
    attack:  Interval;
    defense: Interval;
    spAtk:   Interval;
    spDef:   Interval;
    speed:   Interval;
}



const nameComponents:Record<string, {prefixes: string[], suffixes: string[]}> = {
    fire: {
        prefixes: ['Flam', 'Pyro', 'Blaz', 'Ember', 'Scorch', 'Ash', 'Magm'],
        suffixes: ['zard', 'burn', 'fire', 'nix', 'stor', 'rage', 'flame']
    },
    water: {
        prefixes: ['Aqua', 'Hydro', 'Splash', 'Wave', 'Tide', 'Ocean'],
        suffixes: ['fin', 'splash', 'storm', 'dive', 'pod', 'marine']
    },
    grass: {
        prefixes: ['Leaf', 'Herb', 'Flora', 'Branch', 'Root', 'Bloom'],
        suffixes: ['seed', 'sprout', 'leaf', 'wood', 'grass', 'bloom']
    },
    electric: {
        prefixes: ['Volt', 'Thunder', 'Spark', 'Zap', 'Static', 'Shock', 'Lightning', 'Amp'],
        suffixes: ['tron', 'zap', 'volt', 'spark', 'bolt', 'charge', 'storm', 'shocks']
    },
    rock: {
        prefixes: ['Rock', 'Stone', 'Geo', 'Boulder', 'Crystal', 'Pebble', 'Mount', 'Quartz'],
        suffixes: ['lite', 'stone', 'rock', 'rex', 'shard', 'ore', 'mite', 'crag']
    }
};

const typeBaseStats:Record<string, StatsFakemon> = {
    fire: {
        hp: { min: 45, max: 78 },
        attack: { min: 65, max: 100 },
        defense: { min: 45, max: 75 },
        spAtk: { min: 70, max: 110 },
        spDef: { min: 50, max: 80 },
        speed: { min: 70, max: 105 }
    },
    water: {
        hp: { min: 50, max: 85 },
        attack: { min: 55, max: 85 },
        defense: { min: 60, max: 95 },
        spAtk: { min: 65, max: 95 },
        spDef: { min: 65, max: 90 },
        speed: { min: 45, max: 85 }
    },
    grass: {
        hp: { min: 55, max: 90 },
        attack: { min: 50, max: 85 },
        defense: { min: 65, max: 95 },
        spAtk: { min: 60, max: 90 },
        spDef: { min: 65, max: 95 },
        speed: { min: 40, max: 80 }
    },
    electric: {
        hp: { min: 40, max: 75 },
        attack: { min: 55, max: 85 },
        defense: { min: 40, max: 75 },
        spAtk: { min: 75, max: 110 },
        spDef: { min: 50, max: 85 },
        speed: { min: 85, max: 115 }
    },
    rock: {
        hp: { min: 55, max: 90 },
        attack: { min: 70, max: 105 },
        defense: { min: 85, max: 120 },
        spAtk: { min: 45, max: 75 },
        spDef: { min: 55, max: 85 },
        speed: { min: 30, max: 70 }
    }
}

function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName(type: string): string {
    const components = nameComponents[type.toLowerCase()];
    if (!components) return 'Unknown';
    
    const prefix = components.prefixes[Math.floor(Math.random() * components.prefixes.length)];
    const suffix = components.suffixes[Math.floor(Math.random() * components.suffixes.length)];
    
    return prefix + suffix;
}


function generateStats(type: string): Stats {
    const baseStats = typeBaseStats[type.toLowerCase()];
    if (!baseStats) {
        return {
            hp: 50,
            attack: 50,
            defense: 50,
            spAtk: 50,
            spDef: 50,
            speed: 50
        };
    }

    return {
        hp: randomInRange(baseStats.hp.min, baseStats.hp.max),
        attack: randomInRange(baseStats.attack.min, baseStats.attack.max),
        defense: randomInRange(baseStats.defense.min, baseStats.defense.max),
        spAtk: randomInRange(baseStats.spAtk.min, baseStats.spAtk.max),
        spDef: randomInRange(baseStats.spDef.min, baseStats.spDef.max),
        speed: randomInRange(baseStats.speed.min, baseStats.speed.max)
    };
}
const usedNames = new Set<string>();
// Función para generar un nombre único
function generateUniqueName(type: string, maxAttempts = 100): string {
    let attempts = 0;
    let name = generateName(type);
    
    while (usedNames.has(name) && attempts < maxAttempts) {
        name = generateName(type);
        attempts++;
    }
    
    if (usedNames.has(name)) {
        const baseName = name;
        let counter = 1;
        while (usedNames.has(`${baseName}${counter}`)) {
            counter++;
        }
        name = `${baseName}${counter}`;
    }
    
    usedNames.add(name);
    return name;
}

export function generateFakemon(type: string): Partial<Fakemon> {
    const name = generateUniqueName(type)
    const stats = generateStats(type);
    
    
    return {
        name,
        stats,
        height: randomInRange(0.3, 2.5),
        weight: randomInRange(3, 100),
        abilities: [], // Esto debería completarse con una lista de habilidades posibles
        generation: 1
    };
}