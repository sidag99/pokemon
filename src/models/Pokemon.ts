export interface Pokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: Sprite,
    types: Type[],
    favourite?: boolean,
    style?: any
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