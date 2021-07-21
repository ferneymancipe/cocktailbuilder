import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [buscar, buscarRecetas] = useState({
        ingredient: '',
        category: ''
    });
    const [consultar, guardarConsultar] = useState(false);

    const { ingredient, category } = buscar;

    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async() => {
                const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
                const resultado = await axios.get(URL);
                guardarRecetas(resultado.data.drinks);
            };
            obtenerRecetas();
        }
        // eslint-disable-next-line
    }, [buscar])

    return (
        <RecetasContext.Provider
            value={{
                recetas, buscarRecetas, guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetasProvider;