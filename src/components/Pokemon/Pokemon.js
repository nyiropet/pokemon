import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams, useHistory } from 'react-router-dom';

import PokemonDetails from '../PokemonDetails/PokemonDetails';

const Pokemon = ({
	fetchPokemonDetailsByName,
	pokemonDetails,
	catchPokemon,
	catchedPokemons,
	releasePokemon,
	isFetchPokemonDetailsByNameLoading,
}) => {
	const { pokemonName } = useParams();
	const history = useHistory();

	useEffect(() => {
		fetchPokemonDetailsByName(pokemonName);
	}, []);

	return (
		<Container>
			<Row>
				<Col lg="1">
					<Button variant="primary" onClick={() => history.goBack()}>
						Back
					</Button>
				</Col>
				<Col lg="11">
					{isFetchPokemonDetailsByNameLoading ? (
						<Spinner animation="border" />
					) : (
						pokemonDetails && (
							<PokemonDetails
								pokemonName={pokemonName}
								pokemonDetails={pokemonDetails}
								catchPokemon={catchPokemon}
								catchedPokemons={catchedPokemons}
								releasePokemon={releasePokemon}
							/>
						)
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Pokemon;
