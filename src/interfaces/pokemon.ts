import type { PokemonType } from "./pokemonsTypes"

export interface Pokemon {
    id : number,
    name : string,
    img_url : string,
    types : PokemonType[],
    weight : number,
    height : number
}
