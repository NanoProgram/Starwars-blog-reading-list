import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import SWRlogo from "../../img/SWRlogo.jpg";

export const Person = () => {
    const { store, actions } = useContext(Context);
    const { personId } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [person, setPerson] = useState({})

    useEffect(() => { 
        getPersonFetch(personId) 
    }, [personId])

    async function getPersonFetch(id) {
        setIsLoading(true)
        try {
            const response = await fetch(`https://www.swapi.tech/api/people/${id}`)
            const data = await response.json()
            setPerson(data.result.properties)
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
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`} className="card-img-top" alt={person.name} />
                    <div className="card-body">
                        <h5 className="card-title">{person.name}</h5>
                        <p className="card-text">Genero: {person.gender} <br /> Cumpleaños: {person.birth_year} <br /> Altura: {person.height} <br />
                        Peso: {person.mass} <br /> Color de ojos: {person.eye_color}</p>
                        <button onClick={() => actions.addFavorite(person)} className="btn btn-primary">Add Favorite</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
};

Person.propTypes = {
    match: PropTypes.object
};