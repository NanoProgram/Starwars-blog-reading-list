import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Person = () => {
    const { store, actions } = useContext(Context);
    const { personId } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [person, setPerson] = useState([])


    useEffect(() => { getPersonFetch(personId) }, [])

    async function getPersonFetch(id) {
        setIsLoading(true)
        try {
            await fetch(`https://www.swapi.tech/api/people/${id}`)
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
                <p className="card-text">Genero: {person.gender} <br /> Cumpleaños: {person.birth_year} <br /> Altura: {person.height} <br />
                Peso: {person.mass} <br /> Color de ojos: {person.eye_color}</p>
                <a href="#" className="btn btn-primary">Add Favorite</a>
            </div>
        </div>
        </div>
    )
};