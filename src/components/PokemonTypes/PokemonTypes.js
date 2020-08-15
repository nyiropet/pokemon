import React from 'react';

const PokemonTypes = ({ types, selectedPokemonType, onSelectType }) => (
	<select value={selectedPokemonType} onChange={(event) => onSelectType(event.target.value)}>
		{types.map((pokemonType) => (
			<option key={pokemonType.name}>{pokemonType.name}</option>
		))}
	</select>
);
export default PokemonTypes;
