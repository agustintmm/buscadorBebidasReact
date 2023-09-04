import { Modal, Button, Image } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const ModalBebida = () => {
    
    const { modal, handleCloseModal, bebida, setBebida } = useBebidas()

    const mostrarIngredientes = () => {
        let ingredientes = []

        for(let i = 1; i < 16; i++){
            if(bebida[`strIngredient${i}`] != null){
                ingredientes.push(`${bebida[`strIngredient${i}`]} - ${bebida[`strMeasure${i}`]}`)
            }
        }
        return(
            ingredientes.map( ingrediente => <p className="fw-bold">{ingrediente}</p>)  
        )
    }


    return (
        <Modal 
            show={modal} 
            onHide={() => {
                handleCloseModal()
                setBebida({})
            }}> 
            <Image
                src={bebida.strDrinkThumb}
            />
            <Modal.Header>
                <Modal.Title className="m-auto">{bebida.strDrink}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h2 className="fw-light">Categoria:</h2>
                <p className="fw-bold">{bebida.strCategory}</p>
                <h2 className="fw-light">Instrucciones:</h2>
                <p className="fw-bold">{bebida.strInstructions}</p>
                <h2 className="fw-light">Ingredientes</h2>
                {mostrarIngredientes()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalBebida