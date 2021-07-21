import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

//Crer el context
export const CategoriasContext = createContext();

//Crear el provider (donde se encuentran las funciones y el state)
const CategoriasProvider = (props) => {

    //Crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la API
    useEffect(() => {
        const obtenerCategorias = async () => {
            const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(URL);
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriasProvider;