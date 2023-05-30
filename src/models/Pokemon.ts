export interface Pokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: Sprite,
    types: Type[],
    favourite?: boolean,
    style?: any,
    abilities: Ability[],
    moves: Move[],
    species: {name: string}
}

export interface Sprite {
    front_default: string,
    back_default: string
}

export interface Type {
    type: {
        name: string,
    }
}
export interface Ability {
    ability: {
        name: string,
    }
}
export interface Move {
    move: {
        name: string,
    }
}