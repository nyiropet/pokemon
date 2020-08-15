import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';

import PokemonTypes from '../PokemonTypes/PokemonTypes';
import PokemonList from '../PokemonList/PokemonList';

const Pokemons = ({
	pokemonTypes,
	pokemons,
	selectedPokemonType,
	fetchPokemonsByType,
	isFetchPokemonsByTypeLoading,
	catchedPokemons,
}) => {
	const [filteredPokemonList, setFilteredPokemonList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const pokemonListToDisplay =
		filteredPokemonList && filteredPokemonList.length > 0 ? filteredPokemonList : pokemons;

	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (searchValue.length > 0) {
			const filteredPokemonNamesBySearchValue = pokemons.filter((pokemon) =>
				pokemon.pokemon.name.includes(searchValue)
			);

			setFilteredPokemonList(filteredPokemonNamesBySearchValue);
		} else {
			setFilteredPokemonList([]);
		}
	}, [searchValue]);

	useEffect(() => {
		setSearchValue('');
	}, [pokemons]);

	return (
		<>
			<Navbar bg="light" variant="light">
				<Navbar.Brand>Pokemons</Navbar.Brand>
				<Nav className="mr-auto">
					{pokemonTypes && pokemonTypes.length > 0 && (
						<PokemonTypes
							types={pokemonTypes}
							selectedPokemonType={selectedPokemonType}
							onSelectType={fetchPokemonsByType}
						/>
					)}
				</Nav>
				<Form.Check
					type="checkbox"
					label="Only catched pokemons"
					id="only-catched"
					checked={isShow}
					onChange={() => setIsShow(!isShow)}
				/>
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						className="mr-sm-2"
					/>
				</Form>
			</Navbar>
			<Container fluid>
				<Row>
					{pokemons &&
						pokemons.length > 0 &&
						(isFetchPokemonsByTypeLoading ? (
							<Spinner animation="border" />
						) : (
							<PokemonList
								pokemons={
									isShow
										? catchedPokemons.map((name) => ({
												pokemon: { name },
										  }))
										: pokemonListToDisplay
								}
								catchedPokemons={catchedPokemons}
							/>
						))}
				</Row>
			</Container>
		</>
	);
};

export default Pokemons;
