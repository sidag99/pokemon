import {Pokemon} from "@/models/Pokemon";

export abstract class PokemonApi {
    static async fetchPokemon(pokemonID: number): Promise<Pokemon> {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`).then(response => response.json()).then(data => data as Pokemon);
    }
}