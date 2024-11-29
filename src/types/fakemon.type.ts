export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}
export interface Type {
  name: string;
  weaknesses: string[];
  resistances: string[];
}

export interface Fakemon {
  id: number;
  name: string;
  types: Type[];
  stats: Stats;
  height: number;
  weight: number;
  description: string;
  abilities: {
    normal: {
      name: string;
      description: string;
    };
    hidden: {
      name: string;
      description: string;
    };
  };
  imageUrl: string;
  generation: number;
}
