import {
	SET_POKEMON_TYPES,
	SET_POKEMONS_BY_TYPE,
	SET_POKEMON_DETAILS,
	CATCH_POKEMON,
	RELEASE_POKEMON,
	SAVE_SELECTED_POKEMON_TYPE,
	FETCH_POKEMON_TYPES_LOADING,
	FETCH_POKEMONS_BY_TYPE_LOADING,
	FETCH_POKEMON_DETAILS_BY_NAME_LOADING,
} from '../actions/actionTypes';

const initalState = {
	pokemonTypes: null,
	pokemons: null,
	pokemonDetails: null,
	catchedPokemons: [],
	selectedPokemonType: '',
	isFetchPokemonTypesLoading: false,
	isFetchPokemonsByTypeLoading: false,
	isFetchPokemonDetailsByNameLoading: false,
};

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case SET_POKEMON_TYPES:
			return {
				...state,
				pokemonTypes: action.pokemonTypes,
			};
		case SET_POKEMONS_BY_TYPE:
			return {
				...state,
				pokemons: action.pokemons,
			};
		case SET_POKEMON_DETAILS:
			return {
				...state,
				pokemonDetails: action.pokemonDetails,
			};
		case CATCH_POKEMON:
			return {
				...state,
				catchedPokemons: [...state.catchedPokemons, action.pokemon],
			};
		case RELEASE_POKEMON:
			const indexOfPokemonName = state.catchedPokemons.indexOf(action.pokemonName);
			const newCatchedPokemons = [
				...state.catchedPokemons.slice(0, indexOfPokemonName),
				...state.catchedPokemons.slice(indexOfPokemonName + 1),
			];
			return {
				...state,
				catchedPokemons: newCatchedPokemons,
			};
		case FETCH_POKEMON_TYPES_LOADING:
			return {
				...state,
				isFetchPokemonTypesLoading: action.isFetchPokemonTypesLoading,
			};
		case FETCH_POKEMONS_BY_TYPE_LOADING:
			return {
				...state,
				isFetchPokemonsByTypeLoading: action.isFetchPokemonsByTypeLoading,
			};
		case FETCH_POKEMON_DETAILS_BY_NAME_LOADING:
			return {
				...state,
				isFetchPokemonDetailsByNameLoading: action.isFetchPokemonDetailsByNameLoading,
			};

		case SAVE_SELECTED_POKEMON_TYPE:
			return {
				...state,
				selectedPokemonType: action.selectedPokemonType,
			};
		default:
			return state;
	}
};

export default reducer;
