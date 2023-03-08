import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import SWRlogo from "../../img/SWRlogo.jpg";

export const Planet = () => {
    const { store, actions } = useContext(Context);
    const { planetId } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [planet, setPlanet] = useState({})

    useEffect(() => { 
        getPlanetFetch(planetId) 
    }, [planetId])

    async function getPlanetFetch(id) {
        setIsLoading(true)
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${id}`)
            const data = await response.json()
            setPlanet(data.result.properties)
            setIsLoading(false)
        } catch (error) {
            console.log('NO, HAY PROBLEMA:' + error.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="container-sm d-flex justify-content-center">
            {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <span className="justify-content-center"><img src={SWRlogo} /></span>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} className="card-img-top" alt={planet.name} />
                    <div className="card-body">
                        <h5 className="card-title">{planet.name}</h5>
                        <p className="card-text">Clima: {planet.climate} <br /> Diametro: {planet.diameter} <br /> Gravedad: {planet.gravity} <br />
                        Poblacion: {planet.population} <br /> Terreno: {planet.terrain}</p>
                        <button onClick={() => actions.addFavorite(planet)} className="btn btn-primary">Add Favorite</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
};

Planet.propTypes = {
    match: PropTypes.object
};