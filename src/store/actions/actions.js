import api from '../../api';
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
} from './actionTypes';

const setPokemonTypes = (pokemonTypes) => ({
	type: SET_POKEMON_TYPES,
	pokemonTypes,
});

const setPokemonsByType = (pokemons) => ({
	type: SET_POKEMONS_BY_TYPE,
	pokemons,
});

const setPokemonByName = (pokemonDetails) => ({
	type: SET_POKEMON_DETAILS,
	pokemonDetails,
});

export const saveSelectedPokemonType = (selectedPokemonType) => ({
	type: SAVE_SELECTED_POKEMON_TYPE,
	selectedPokemonType,
});

export const catchPokemon = (pokemon) => ({
	type: CATCH_POKEMON,
	pokemon,
});

export const releasePokemon = (pokemonName) => ({
	type: RELEASE_POKEMON,
	pokemonName,
});

export const fetchPokemonsByTypeLoading = (isFetchPokemonsByTypeLoading) => ({
	type: FETCH_POKEMONS_BY_TYPE_LOADING,
	isFetchPokemonsByTypeLoading,
});

export const fetchPokemonTypesLoading = (isFetchPokemonTypesLoading) => ({
	type: FETCH_POKEMON_TYPES_LOADING,
	isFetchPokemonTypesLoading,
});

export const fetchPokemonDetailsByNameLoading = (isFetchPokemonDetailsByNameLoading) => ({
	type: FETCH_POKEMON_DETAILS_BY_NAME_LOADING,
	isFetchPokemonDetailsByNameLoading,
});

export const fetchPokemonsByType = (type) => {
	return async (dispatch) => {
		dispatch(fetchPokemonsByTypeLoading(true));
		dispatch(saveSelectedPokemonType(type));
		api.get(`/type/${type}`)
			.then((response) => {
				dispatch(setPokemonsByType(response.data.pokemon));
				dispatch(fetchPokemonsByTypeLoading(false));
			})
			.catch((error) => {
				console.log('Error fetching pokemons by type', error);
				dispatch(fetchPokemonsByTypeLoading(false));
			});
	};
};

export const fetchPokemonTypes = () => {
	return async (dispatch) => {
		dispatch(fetchPokemonTypesLoading(true));
		api.get('/type')
			.then((response) => {
				dispatch(setPokemonTypes(response.data.results));
				dispatch(fetchPokemonTypesLoading(false));
				dispatch(fetchPokemonsByType(response.data.results[0].name));
			})
			.catch((error) => {
				console.log('Error fetching pokemon types', error);
				dispatch(fetchPokemonTypesLoading(false));
			});
	};
};

export const fetchPokemonDetailsByName = (pokemonName) => {
	return async (dispatch) => {
		dispatch(fetchPokemonDetailsByNameLoading(true));
		api.get(`/pokemon/${pokemonName}`)
			.then((response) => {
				dispatch(setPokemonByName(response.data));
				dispatch(fetchPokemonDetailsByNameLoading(false));
			})
			.catch((error) => {
				console.log('Error fetching pokemon details', error);
				dispatch(fetchPokemonDetailsByNameLoading(false));
			});
	};
};
