import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
		<div className="container-md ">
			<h1>Personajes</h1>
			<div className=" row d-flex justify-content-center">
				{characters.map((characters) => (
					<div key={characters.uid} className="card m-3 col-4 " style={{ width: "18rem" }}>
						<div className="card-body">
							<h5 className="card-title">{characters.name}</h5>
							<p className="card-text"></p>
							<Link to={`/person/${characters.uid}`} className="btn btn-primary" key={characters.uid}>
								Mas Info
							</Link>
							<button onClick={() => { addFavorite(characters) }} className="btn btn-warning"><i className="fas fa-heart"></i></button>

						</div>
					</div>
				))}
			</div>
			<h1> Planetas</h1>
			<div className=" row d-flex justify-content-center">
				{planets.map((planets) => (
					<div key={planets.uid} className="card m-3 col-4" style={{ width: "18rem" }}>
						<div className="card-body">
							<h5 className="card-title">{planets.name}</h5>
							<p className="card-text"></p>
							<Link to={`/planet/${planets.uid}`} className="btn btn-primary" key={characters.uid}>
								Mas Info
							</Link>
							<button onClick={() => { addFavorite(planets) }} className="btn btn-warning"><i className="fas fa-heart"></i></button>
						</div>
					</div>
				))}
			</div>

			{/*<ul className="list-group mt-5">
				{characters.map((characters, index) => (
					<li className="list-group-item d-flex justify-content-between" key={index}>{characters.name}</li>
				))}
			</ul>*/}

		</div>
	);
};