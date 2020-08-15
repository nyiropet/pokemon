import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import {
	fetchPokemonTypes,
	fetchPokemonsByType,
	fetchPokemonDetailsByName,
	catchPokemon,
	releasePokemon,
} from '../../store/actions/actions';

import Pokemons from '../Pokemons/Pokemons';
import Pokemon from '../Pokemon/Pokemon';

const App = ({
	pokemons,
	pokemonTypes,
	pokemonDetails,
	fetchPokemonTypes,
	fetchPokemonsByType,
	fetchPokemonDetailsByName,
	catchedPokemons,
	catchPokemon,
	releasePokemon,
	selectedPokemonType,
	isFetchPokemonTypesLoading,
	isFetchPokemonsByTypeLoading,
	isFetchPokemonDetailsByNameLoading,
}) => {
	useEffect(() => {
		fetchPokemonTypes();
	}, []);

	if (isFetchPokemonTypesLoading) {
		return <Spinner animation="border" />;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Redirect to="/pokemons" />
				</Route>
				<Route path="/pokemons">
					<Pokemons
						fetchPokemonTypes={fetchPokemonTypes}
						pokemons={pokemons}
						fetchPokemonsByType={fetchPokemonsByType}
						pokemonTypes={pokemonTypes}
						selectedPokemonType={selectedPokemonType}
						catchedPokemons={catchedPokemons}
						isFetchPokemonsByTypeLoading={isFetchPokemonsByTypeLoading}
					/>
				</Route>
				<Route path={`/:pokemonName`}>
					<Pokemon
						pokemonDetails={pokemonDetails}
						isFetchPokemonDetailsByNameLoading={isFetchPokemonDetailsByNameLoading}
						fetchPokemonDetailsByName={fetchPokemonDetailsByName}
						catchedPokemons={catchedPokemons}
						catchPokemon={catchPokemon}
						releasePokemon={releasePokemon}
					/>
				</Route>
				<Route path="*">
					<p>No match.</p>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

const mapStateToProps = (state) => ({
	pokemonTypes: state.pokemon.pokemonTypes,
	pokemons: state.pokemon.pokemons,
	pokemonDetails: state.pokemon.pokemonDetails,
	catchedPokemons: state.pokemon.catchedPokemons,
	selectedPokemonType: state.pokemon.selectedPokemonType,
	isFetchPokemonTypesLoading: state.pokemon.isFetchPokemonTypesLoading,
	isFetchPokemonsByTypeLoading: state.pokemon.isFetchPokemonsByTypeLoading,
	isFetchPokemonDetailsByNameLoading: state.pokemon.isFetchPokemonDetailsByNameLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPokemonTypes: () => dispatch(fetchPokemonTypes()),
	fetchPokemonsByType: (type) => dispatch(fetchPokemonsByType(type)),
	fetchPokemonDetailsByName: (pokemonName) => dispatch(fetchPokemonDetailsByName(pokemonName)),
	catchPokemon: (pokemon) => dispatch(catchPokemon(pokemon)),
	releasePokemon: (pokemonName) => dispatch(releasePokemon(pokemonName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
