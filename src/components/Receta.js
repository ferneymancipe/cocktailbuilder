import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({ receta }) => {

    //Configuracion del Modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    
    const handleModal = () => {
        setOpen(!open);
    }

    //Extraer los valores del context
    const { infoReceta, guardarIdreceta, guardarReceta } = useContext(ModalContext);

    //Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if (informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={informacion[`strIngredient${i}`]}>{informacion[`strIngredient${i}`]} - {informacion[`strMeasure${i}`]}</li>
                );
            }
        }
        return ingredientes;
    }
    
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img
                    className="card-img-top" 
                    src={receta.strDrinkThumb}
                    alt={receta.strDrink}
                />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdreceta(receta.idDrink);
                            handleModal();
                        }}
                    >
                        See recipe
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdreceta(null);
                            guardarReceta({})
                            handleModal();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoReceta.strDrink}</h2>
                            <h4 className="mt-4">Ingredients</h4>
                            <ul>
                                { mostrarIngredientes(infoReceta) }
                            </ul>
                            <h4>How to prepare</h4>
                            <p>{infoReceta.strInstructions}</p>
                            <img 
                                className="img-fluid p-5" 
                                src={infoReceta.strDrinkThumb} 
                                alt={infoReceta.strGlass}
                            />
                            
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;