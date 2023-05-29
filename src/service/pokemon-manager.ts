import {PokemonApi} from "@/api/pokemon-api";
import {Pokemon} from "@/models/Pokemon";

export function usePokemonManager() {
    const totalExistingPokemon = 100;
    // const totalExistingPokemon = 100;
    async function getPokemon(pokemonID: number): Promise<Pokemon> {
        return PokemonApi.fetchPokemon(pokemonID);
    }

    function getNRandomNumbers(n: number) {
        const uniqueNumbers: Set<number> = new Set();
        while(uniqueNumbers.size < n) {
            uniqueNumbers.add(1 + Math.floor(Math.random()*(totalExistingPokemon - 1)));
        }
        return Array.from(uniqueNumbers);
    }

    async function getAllPokemon() {
        const pokemons: Pokemon[] = [];
        const promises: Promise<Pokemon>[] = [];

        for (let pokemonID = 1; pokemonID <= totalExistingPokemon; pokemonID++) {
            promises.push(getPokemon(pokemonID));
        }
        await Promise.all(promises).then((responses: Pokemon[]) => pokemons.push(...responses));
        return pokemons;
    }

    return {
        getAllPokemon, getNRandomNumbers
    }
}