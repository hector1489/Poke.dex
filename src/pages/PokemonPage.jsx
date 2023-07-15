import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { PokemonContext } from '../context/PokemonContext';
import { primerMayuscula } from '../helper/helper';

export const PokemonPage = () => {
	const { getPokemonByID } = useContext(PokemonContext);
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const data = await getPokemonByID(id);
				setPokemon(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching pokemon:', error);
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [getPokemonByID, id]);

	if (loading) {
		return <Loader />;
	}

	if (!pokemon) {
		return <div>Pokemon not found.</div>;
	}

	const {
		id: pokemonId,
		name,
		sprites,
		types,
		height,
		weight,
		stats,
	} = pokemon;

	return (
		<main className='container main-pokemon'>
			<div className='header-main-pokemon'>
				<span className='number-pokemon'>#{pokemonId}</span>
				<div className='container-img-pokemon'>
					<img src={sprites.front_default} alt={`Pokemon ${name}`} />
				</div>

				<div className='container-info-pokemon'>
					<h1>{primerMayuscula(name)}</h1>
					<div className='card-types info-pokemon-type'>
						{types.map(type => (
							<span key={type.type.name} className={`${type.type.name}`}>
								{type.type.name}
							</span>
						))}
					</div>
					<div className='info-pokemon'>
						<div className='group-info'>
							<p>Height</p>
							<span>{height}</span>
						</div>
						<div className='group-info'>
							<p>Weight</p>
							<span>{weight}KG</span>
						</div>
					</div>
				</div>
			</div>

			<div className='container-stats'>
				<h1>Statistics</h1>
				<div className='stats'>
					{stats.map(stat => (
						<div className='stat-group' key={stat.stat.name}>
							<span>{stat.stat.name}</span>
							<div className='progress-bar'></div>
							<span className='container-stat'>{stat.base_stat}</span>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};


