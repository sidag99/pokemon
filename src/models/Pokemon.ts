export interface Pokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: Sprite,
    types: Type[]
}

export interface Sprite {
    front_default: string
}

export interface Type {
    type: {
        name: string,
    }
}