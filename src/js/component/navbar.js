import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import SWLogo from "../../img/SWLogo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [favorite, setFavorite] = useState(store.favorites)
	useEffect(() => {
		setFavorite(store.favorites)
	}, [store.favorites])
	console.log(store.favorites)

	function remove(index) {
		actions.removeFavorite(index) 
	}

	return (
		<div className="container">
		<nav className="navbar navbar-dark bg-dark mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img src={SWLogo} /></span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						<strong>Favoritos</strong> <span className="badge rounded-pill bg-dark">{favorite.length}</span>
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						{favorite.map((favorite, index) => (
							<li key={index}>
								{favorite.name}
								<button className="btn btn-dark btn-sm" onClick={() => { remove(index) }}><i className="fas fa-trash-alt"></i></button></li>
						))}
					</ul>
				</div>
			</div>
		</nav>
		</div>
	);
};
