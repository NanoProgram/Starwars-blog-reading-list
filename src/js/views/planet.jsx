import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planet = () => {
    const { store, actions } = useContext(Context);
    const { planetId } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [person, setPerson] = useState([])


    useEffect(() => { getPersonFetch(planetId) }, [])

    async function getPersonFetch(id) {
        setIsLoading(true)
        try {
            await fetch(`https://www.swapi.tech/api/planets/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPerson(data.result.properties)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log('NO, HAY PROBLEMA:' + error.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="container-sm d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">Clima: {person.climate} <br /> Diametro: {person.diameter} <br /> Gravedad: {person.gravity} <br />
                Poblacion: {person.population} <br /> Terreno: {person.terrain}</p>
                <a href="#" className="btn btn-primary">Add Favorite</a>
            </div>
        </div>
        </div>
    )
};