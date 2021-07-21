import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

//Crear el context
export const ModalContext = createContext();

const MovalProvider = (props) => {

    //State del provider
    const [idreceta, guardarIdreceta] = useState(null);
    const [infoReceta, guardarReceta] = useState({});

    //Llamar API para traer datos de la receta

    useEffect(() => {
        const obtenerReceta = async() => {
            if (!idreceta)
                return;
            const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(URL);
            guardarReceta(resultado.data.drinks[0]);
        };
        obtenerReceta();
    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                infoReceta,
                guardarIdreceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default MovalProvider;