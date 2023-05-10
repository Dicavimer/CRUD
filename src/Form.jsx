import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

const Form = () => {
    const [nombre, setNombre] = React.useState()
    const [apellido, setApellido] = React.useState()
    const [id, setid] = React.useState()
    const [user, setuser] = React.useState({ id: 0, nombre: '', apellido: '' })
    const [modal, setmodal] = React.useState(false)
    const [lista, setLista] = React.useState([])
    const RegistrarDatos = (e) => {
        e.preventDefault();

        // nuevo usuario
        if (!nombre.trim()) {
            alert("Ingrese su nombre")
            return
        }
        if (!apellido.trim()) {
            alert("Ingrese su apellido")
            return
        }
        if (!id.trim()) {
            alert("Ingrese su ID")
            return
        }

        if (CheckID() == true) {
            Swal.fire({
                icon: 'error',
                text: 'La ID ingresada ya existe, escriba otra ID!'
            })
        } else {
            setLista([
                ...lista,
                { nombre, apellido, id }
            ])
            Swal.fire({
                icon: 'success',
                text: 'Usuario agregado exitosamente!',
                timer: 1500,
                showConfirmButton: false
            })
        }

        //Clean inputs
        e.target.reset()
        setApellido("")
        setNombre("")
        setid("")
    }

    const CheckID = () => {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == id) {
                return true
            }
        }
        return false
    }

    const eliminarUsuario = () => {
        Swal.fire({
            icon: 'question',
            text: 'Ingrese la ID del usuario a eliminar',
            input: 'number',
            showCancelButton: true
        }).then((result) => {
            let resultado = result.value
            if (result.isConfirmed && result.value != '') {
                Swal.fire({
                    icon: 'warning',
                    text: `¿Está seguro de eliminar el usuario con la id ${result.value}?`,
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLista(lista.filter(u => u.id !== resultado));
                        Swal.fire({
                            icon: 'success',
                            text: `Usuario eliminado correctamente`,
                            showCancelButton: false,
                            timer: 1500,
                            showConfirmButton: false
                        })
                    } else {
                        return false
                    }
                }
                )
            }

        })

    }
    const Cambio = e => {
        const { name, value } = e.target;
        setuser((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const Manipulador_Eventos = (elemento, estado) => {
        setLista(elemento)
        if (estado == 'editar') {
            setmodal(true)
        }
    }

    return (
        <div className='container'>
            <h2>Formulario<a href='https://emojitool.com/memo'>📝</a></h2>
            <form onSubmit={RegistrarDatos}>
                <div>
                    <input type="text"
                        placeholder='Ingrese su nombre'
                        className='form-control mb-3'
                        onChange={(e) => setNombre(e.target.value.trim())}
                    />
                </div>
                <div>
                    <input type="text"
                        placeholder='Ingrese su apellido'
                        className='form-control mb-3'
                        onChange={(e) => setApellido(e.target.value.trim())}
                    />
                </div>
                <div>
                    <input type="number"
                        placeholder='ID'
                        className='form-control mb-3'
                        onChange={(e) => setid(e.target.value)}
                    />
                </div>
                <div className='d-grid gap-2'>
                    <button className='btn btn-info' type='submit'>Agregar Usuario</button>
                </div>
            </form>
            <div className='d-grid gap-2 mt-3'>

                <button className='ml-2 btn btn-danger' onClick={eliminarUsuario}>Eliminar</button>
            </div>
            <hr />
            <h2>Lista de usuarios registrados</h2>

            <div className="tabla">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map((elemento, i) => (
                                <tr key={i}>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.nombre}</td>
                                    <td>{elemento.apellido}</td>
                                    <td><button className='mr-2 btn btn-success' onClick={() => Manipulador_Eventos(elemento, "editar")}>Editar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <Modal isOpen={modal}>
                <ModalHeader>
                    <div>
                        <h3>Editar Usuario</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id"
                            value={user && user.id}
                        />
                        <br />

                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            value={user && user.nombre}
                            onChange={Cambio}
                        />
                        <br />
                        <label>Apellido</label>
                        <input
                            className="form-control"
                            type="text"
                            name="apellido"
                            value={user && user.apellido}
                            onChange={Cambio}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => editar()}>
                        Actualizar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setmodal(false)}
                    >Cancelar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Form