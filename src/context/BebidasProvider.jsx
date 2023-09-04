import axios from "axios";
import { useState, useEffect, createContext } from "react";

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {


    // Configuración modal de bebidas
    const [ modal, setModal ] = useState(false)
    const handleSetModal = () => setModal(true)
    const handleCloseModal = () => setModal(false)

    // consultar una bebida
    const [ bebida, setBebida ] = useState({})

    const consultarBebida = async id => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
            const { data } = await axios(url)
            setBebida(data.drinks[0])

        } catch (error) {
            console.log(error)
        }
     }

    // Consultar bebidas
    const [ bebidas, setBebidas ] = useState([])

    const consultarBebidasCategoria = async datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${datos.categoria}`
            const { data } = await axios(url)
            setBebidas(data)   
        } catch (error) {
            console.log(error)  
        }
    }

    const consultarBebidasIngrediente = async datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.ingrediente}`
            const { data } = await axios(url)
            setBebidas(data)
        } catch (error) {
            console.log(error)  
        }
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebidasIngrediente,
                consultarBebidasCategoria,
                bebidas,
                consultarBebida,
                bebida,
                setBebida,
                modal,
                handleCloseModal,
                handleSetModal
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext