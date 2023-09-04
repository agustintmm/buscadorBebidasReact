import { Row } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida"

const ListadoBebidas = () => {
  
    const { bebidas } = useBebidas()

    const handleBebidas = bebidas => {
        if(typeof(bebidas) == 'string'){
            return (
                <p
                    className="text-center h3 secondary text-primary"
                >
                    No se encontraron bebidas con ese ingrediente, por favor intente denuevo
                </p>
            )
        }else{
            return (bebidas.drinks?.map( bebida => (
                <Bebida
                    key={bebida.idDrink}
                    bebida={bebida}
                />
            )))
        }
    }

    return (
        <Row className="mt-5">
            {handleBebidas(bebidas)}
            {/* {bebidas.map( bebida => (
                <Bebida
                    key={bebida.idDrink}
                    bebida={bebida}
                />
            ))} */}
        </Row>
    )
}

export default ListadoBebidas