import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SWRlogo from "../../img/SWRlogo.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [characters, setCharacters] = useState(store.characters)
	const [planets, setPlanets] = useState(store.planets)
	const [favorite, setFavorite] = useState([])

	useEffect(() => {
		setCharacters(store.characters);
		setPlanets(store.planets);
	}, [store.characters, store.planets, store.person])


	function addFavorite(character) {
		const existingFavorite = favorite.find(favorite => favorite.name === character.name|| favorite.uid === planets.uid );
		if (existingFavorite) {
			return;
		}
		setFavorite([...favorite, character]);
		actions.addFavorite(character);
	}


	return (
		<div className="container-md image-back">
		  <h1 className="color"><span className="navbar-brand mb-0 h1"><img src={SWRlogo} /></span><strong>Personajes</strong></h1>
		  <div className="row d-flex justify-content-center">
			{characters.map((character) => (
			  <div key={character.uid} className="card m-3 col-4 " style={{ width: "18rem" }}>
				<img src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} className="card-img-top" alt={character.name} />
				<div className="card-body">
				  <h5 className="card-title">{character.name}</h5>
				  <p className="card-text"></p>
				  <Link to={`/person/${character.uid}`} className="btn btn-primary">
					Mas Info
				  </Link>
				  <button onClick={() => addFavorite(character)} className="btn btn-warning">
					<i className="fas fa-heart"></i>
				  </button>
				</div>
			  </div>
			))}
		  </div>
		  <br></br>
		  <br></br>
		  <br></br>
		  
		  <h1 className="color"><span className="navbar-brand mb-0 h1"><img src={SWRlogo} /></span><strong>Planetas</strong></h1>
		  <div className="row d-flex justify-content-center">
			{planets.map((planet) => (
			  <div key={planet.uid} className="card m-3 col-4" style={{ width: "18rem" }}>
				<img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} className="card-img-top" alt={planet.name} />
				<div className="card-body">
				  <h5 className="card-title">{planet.name}</h5>
				  <p className="card-text"></p>
				  <Link to={`/planet/${planet.uid}`} className="btn btn-primary">
					Mas Info
				  </Link>
				  <button onClick={() => addFavorite(planet)} className="btn btn-warning">
					<i className="fas fa-heart"></i>
				  </button>
				</div>
			  </div>
			))}
		  </div>
		</div>
	  );
	};