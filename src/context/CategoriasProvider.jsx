import axios from "axios";
import { useState, useEffect, createContext } from "react";

const CategoriasContext = createContext()

const CategoriasProvider = ({children}) => {

    // States
    const [ categorias, setCategorias ] = useState([])


    const obenerCategorias = async () => {
        try { 
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const { data } = await axios(url)
            setCategorias(data.drinks)

        } catch(error){
            console.log(error)
        }
    }

    useEffect( () => {
        obenerCategorias()
    }, [])


    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export {
    CategoriasProvider
}

export default CategoriasContext