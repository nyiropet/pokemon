import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const PokemonList = ({ pokemons, catchedPokemons }) => (
	<>
		{pokemons.map((pokemon) => (
			<Col key={pokemon.pokemon.name} lg="2">
				<Link
					className={
						catchedPokemons.filter((catchedPokemon) =>
							catchedPokemon.includes(pokemon.pokemon.name)
						).length > 0
							? 'catched'
							: ''
					}
					to={`/${pokemon.pokemon.name}`}>
					{pokemon.pokemon.name}
				</Link>
			</Col>
		))}
	</>
);
export default PokemonList;
