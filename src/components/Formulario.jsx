import { useState, useEffect } from "react"
import { Button, ToggleButton, ToggleButtonGroup, Form, Row, Col, Alert, Container } from "react-bootstrap"
import useCategorias from "../hooks/useCategorias"
import useBebidas from "../hooks/useBebidas"

const Formulario = () => {
    
    // States
    const [ busqueda, setBusqueda ] = useState({
        nombre: '',
        categoria: ''
    })
    const [ alerta, setAlerta ] = useState('')
    const [ searchBy, setSearchBy ] = useState('ingrediente')


    // Context
    const { categorias } = useCategorias()
    const { consultarBebidasIngrediente, consultarBebidasCategoria } = useBebidas()


    // HandleForm
    const handleSubmit = e => {
        e.preventDefault()

        if(searchBy === 'ingrediente'){
            consultarBebidasIngrediente(busqueda)
        } else {
            consultarBebidasCategoria(busqueda)
        }
    }

    // Effects
    useEffect( () => {
        const inputCategoria = document.getElementById('categoria')
        const inputIngrediente = document.getElementById('ingrediente')

        if(searchBy === 'ingrediente'){
            inputCategoria.disabled = true
            busqueda.categoria = ''
            inputIngrediente.disabled = false
        } else{
            inputIngrediente.disabled = true
            inputIngrediente.value = ''
            inputCategoria.disabled = false
        }
        
    }, [searchBy])


    return (
        <>
            <Container className="d-flex justify-content-center mb-4">
                <ToggleButtonGroup type="radio" name="options" defaultValue={'ingrediente'}>
                    <ToggleButton id="tbg-radio-1" value={'ingrediente'} onChange={e => setSearchBy(e.target.value)}>
                        Buscar por ingrediente
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={'categoria'} onChange={e => setSearchBy(e.target.value)}>
                        Buscar por categoria    
                    </ToggleButton>
                </ToggleButtonGroup>
            </Container>
            <Form className="my-10" onSubmit={handleSubmit}>
                { alerta && <Alert className="text-center">{alerta}</Alert> }
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="ingrediente" className="mb-2">Nombre del ingrediente:</Form.Label>
                            <Form.Control
                                id="ingrediente"
                                type="text"
                                placeholder="ej: Vodka, Rum, etc"
                                name="ingrediente"
                                size="lg"
                                onChange={e => setBusqueda({
                                    ...busqueda,
                                    [e.target.name]:e.target.value
                                })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="categoria" className="mb-2">Nombre de la categoria:</Form.Label>
                            <Form.Select
                                id="categoria"
                                name="categoria"
                                size="lg"
                                value={busqueda.categoria}
                                onChange={e => setBusqueda({
                                    ...busqueda,
                                    [e.target.name]: e.target.value
                                })}
                                
                            >
                                <option value={''}>Seleciona una categoria</option>
                                {categorias.map( categoria => (
                                    <option 
                                        key={categoria.strCategory}
                                        value={categoria.strCategory}
                                    >
                                            {categoria.strCategory}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-end">
                    <Col md={3}>
                        <Button
                            size="lg"
                            className="text-uppercase"
                            variant="dark"
                            type="submit"
                        >
                            Buscar bebidas
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Formulario