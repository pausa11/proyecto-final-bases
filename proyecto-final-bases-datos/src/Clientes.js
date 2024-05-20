import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Clientes() {
  const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [nombreEditar, setNombreEditar] = useState('');
  const [apellidoEditar, setApellidoEditar] = useState('');
  const [edadEditar, setEdadEditar] = useState('');
  const [telefonoEditar, setTelefonoEditar] = useState('');
  const [cedulaEditar, setCedulaEditar] = useState('');

  useEffect(() => {
    fetchClientes();
    // eslint-disable-next-line
  }, []); 

  const fetchClientes = async () => {
    try {
      const response = await axios.get(URL);
      setClientes(response.data.clientes);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const agregarClientes = async () => {
    console.log('agregarClientes');
    console.log(nombre, apellido, edad, telefono,cedula); 
    try {
      await axios.post(URL, {
        nombre,
        apellido,
        edad,
        telefono,
        cedula
      });
      fetchClientes();
      setNombre('');
      setApellido('');
      setEdad('');
      setTelefono('');
      setCedula('');
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const [clienteAEditar, setClienteAEditar] = useState({});

  const editarClientes = async () => {
    try {
      await axios.put(`${URL}/${clienteAEditar.id}`, {
        nombreEditar,
        apellidoEditar,
        edadEditar,
        telefonoEditar,
        cedulaEditar
      });
      fetchClientes();
      setNombreEditar('');
      setApellidoEditar('');
      setEdadEditar('');
      setTelefonoEditar('');
      setCedulaEditar('');
    } catch (error) {
      console.error('Error al editar cliente:', error);
    }
  };

  //-----------------------------------

  return (
    <div className="App" style={{background:'#E6E4D5',minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily:'calibri',alignItems:'center'}}>

      <div style={{display: 'flex', width:'100%', alignItems: 'center',marginBottom:'5vh',background:'black',height:'10vh',color:'white'}}>
        <img src="homeIcon.png" style={{width:'5vh',marginLeft:'2vw',color:'white',filter:'invert(1)',height:'4vh'}} onClick={() => window.location.href='/'} alt='homeIcon'/>{' '}
        <text style={{marginLeft:'41vw', fontSize:'4vh',letterSpacing:'.4vh',fontWeight:'700'}}>Clientes </text>
      </div>

      <div style={{width:'100vw',display:'flex',justifyContent:'center'}}>
        <div style={{display: 'flex',justifyContent: 'center',flexDirection:'column', alignItems: 'center',borderRadius: '3vw',background:'white', height:'45vh',width:'20%',marginBottom:'5vh'}}>
            <input
              type="text"
              value={nombre}
              placeholder="Nombre de cliente"
              onChange={(e) => setNombre(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />
            <input
              type="text"
              value={apellido}
              placeholder="Apellido de cliente"
              onChange={(e) => setApellido(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />
            <input
              type="number"
              value={edad}
              placeholder="Edad de cliente"
              onChange={(e) => setEdad(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <input
              type="text"
              value={telefono}
              placeholder="Telefono de cliente"
              onChange={(e) => setTelefono(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <input
              type="text"
              value={cedula}
              placeholder="Cedula de cliente"
              onChange={(e) => setCedula(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <button onClick={agregarClientes} style={{height:'6vh',background:'black',color:'white'}}>Agregar cliente</button>
        </div>

        <div style={{display: 'flex',justifyContent: 'center',flexDirection:'column', alignItems: 'center',borderRadius: '3vw',background:'white', height:'45vh',width:'20%',marginBottom:'5vh',marginLeft:'3vw'}}>

            <text style={{fontSize:'2vh',fontWeight:'700',marginBottom:'1vh'}}>Editar cliente con cedula:</text>
            <text style={{fontSize:'2vh',fontWeight:'700',marginBottom:'1vh'}}>{clienteAEditar.cedula}</text>
            <input
              type="text"
              value={nombreEditar}
              placeholder="Nombre de cliente"
              onChange={(e) => setNombreEditar(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />
            <input
              type="text"
              value={apellidoEditar}
              placeholder="Apellido de cliente"
              onChange={(e) => setApellidoEditar(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />
            <input
              type="number"
              value={edadEditar}
              placeholder="Edad de cliente"
              onChange={(e) => setEdadEditar(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <input
              type="text"
              value={telefonoEditar}
              placeholder="Telefono de cliente"
              onChange={(e) => setTelefonoEditar(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <input
              type="text"
              value={cedulaEditar}
              placeholder="Cedula de cliente"
              onChange={(e) => setCedulaEditar(e.target.value)}
              style={{marginBottom:'1vh',textAlign:'center'}}
            />

            <button onClick={editarClientes} style={{height:'6vh',background:'black',color:'white'}}>Editar cliente</button>

        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', width: '80%', color: 'black', padding: '1vh',marginBottom:'5vh'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', color: 'black', borderRadius: '1vh', overflow: 'hidden'}}>
          <thead>
            <tr>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>Nombre</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>Apellido</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>Edad</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>Telefono</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>Cedula</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray',textAlign:'left'}}>ID cliente</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} style={{background: 'black', color: 'white'}}>
                <td style={{padding: '1vh', borderBottom: '1px solid gray',display:'flex',alignItems:'center'}}>{cliente.nombre}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{cliente.apellido}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{cliente.edad}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{cliente.telefono}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{cliente.cedula}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{cliente.id}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray',cursor:'pointer'}} onClick={() => window.location.href=`/transacciones/${cliente.id}`}>ver transacciones</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray',cursor:'pointer'}} onClick={() => eliminarCliente(cliente.id)}>Eliminar</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray',cursor:'pointer'}} onClick={() => {clienteAEditar.cedula === cliente.cedula ? setClienteAEditar({}) : setClienteAEditar(cliente);window.scrollTo({ top: 0, behavior: 'smooth' })}}>Editar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
