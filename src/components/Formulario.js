import React, { useContext, useState }from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    const [busqueda, guardarBusqueda] = useState({
        ingredient: '',
        category: ''
    });

    const [error, guardarError] = useState(false);

    const obtenerDatos = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const submitForm =  e => {
        e.preventDefault();
        
        if(busqueda.ingredient === '' || busqueda.category === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        buscarRecetas(busqueda);
        guardarConsultar(true);
    }

    return (
        <form
            className="col-12"
            onSubmit={submitForm}
        >
            <fieldset>
                <legend>Search cocktails by ingredients and categories</legend>
            </fieldset>
            <div className="row mt-4">
                {error ?
                    <div className="col-md-12">
                        <div className="alert alert-danger text-center" role="alert">
                            Please complete all required fields
                        </div>
                    </div>
                    :
                    null
                }
                <div className="col-md-4">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Search by ingredient"
                        onChange={obtenerDatos}
                        value={busqueda.ingredient}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="category"
                        className="form-control"
                        onChange={obtenerDatos}
                        vaue={busqueda.category}
                    >
                        <option value="">--Select category--</option>
                        {categorias.map(categoria => (
                            <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Search Cocktails"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Formulario;