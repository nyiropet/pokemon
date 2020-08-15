import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PokemonDetails = ({
	pokemonName,
	pokemonDetails,
	catchPokemon,
	catchedPokemons,
	releasePokemon,
}) => (
	<Card style={{ width: '18rem' }}>
		<Card.Img variant="top" src={pokemonDetails.sprites.front_default} />
		<Card.Body>
			<Card.Title>{pokemonName}</Card.Title>
			<p>{`Weight: ${pokemonDetails.weight}`}</p>
			<p>{`Height: ${pokemonDetails.height}`}</p>
			{pokemonDetails.abilities && (
				<div>
					<h4>Abilities</h4>
					<ul>
						{pokemonDetails.abilities
							.filter((ability) => !ability.is_hidden)
							.map((ability) => (
								<li key={ability.ability.name}>{ability.ability.name}</li>
							))}
					</ul>
				</div>
			)}
			{catchedPokemons.filter((catchedPokemon) => catchedPokemon.includes(pokemonName))
				.length > 0 ? (
				<Button variant="warning" onClick={() => releasePokemon(pokemonName)}>
					Release
				</Button>
			) : (
				<Button variant="success" onClick={() => catchPokemon(pokemonName)}>
					Catch
				</Button>
			)}
		</Card.Body>
	</Card>
);

export default PokemonDetails;
