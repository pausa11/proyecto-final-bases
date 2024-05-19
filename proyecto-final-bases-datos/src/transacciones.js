import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Transacciones() {
    const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/transacciones';

    const [transacciones, setTransacciones] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [fechaVenta, setFechaVenta] = useState('');
    const [totalVenta, setTotalVenta] = useState('');

    useEffect(() => {
        fetchTransacciones();
        // eslint-disable-next-line
    }, []);

    const fetchTransacciones = async () => {
        try {
        const response = await axios.get(URL);
        setTransacciones(response.data.transacciones);
        } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        }
    };

    const agregarTransacciones = async () => {
        try {
            await axios.post(URL, {
                idCliente,
                fechaVenta,
                totalVenta
            });
            fetchTransacciones();
            setIdCliente('');
            setFechaVenta('');
            setTotalVenta('');
        } catch (error) {
            console.error('Error al agregar la transacción:', error);
        }
  };

    const [transaccionAEditar, setTransaccionAEditar] = useState({});
  
    const EditarTransacciones = async () => {
    try {
        await axios.put(`${URL}/${transaccionAEditar.id}` ,{
            idCliente,
            fechaVenta,
            totalVenta
        });
        fetchTransacciones();
        setIdCliente('');
        setFechaVenta('');
        setTotalVenta('');
        setTransaccionAEditar({});
    } catch (error) {
        console.error('Error al editar la transacción:', error);
    }
    };

  return (
    <div className="App" style={{ background: '#E6E4D5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Calibri', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '5vh', background: 'black', height: '10vh', color: 'white' }}>
        <img src="homeIcon.png" style={{ width: '5vh', marginLeft: '2vw', filter: 'invert(1)', height: '4vh' }} onClick={() => window.location.href = '/'} alt='homeIcon' />{' '}
        <span style={{ marginLeft: '37.5vw', fontSize: '4vh', letterSpacing: '.4vh', fontWeight: '700' }}>Transacciones</span>
      </div>

    <div style={{display:'flex',width:'100vw',justifyContent:'center'}}>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', background: 'white', height: '35vh', width: '20%', marginBottom: '5vh',marginRight:'3vw'}}>
            <input
            type="text"
            value={idCliente}
            placeholder="ID de cliente"
            onChange={(e) => setIdCliente(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
            type='date'
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
            type='text'
            value={totalVenta}
            placeholder="Total de venta"
            onChange={(e) => setTotalVenta(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <button onClick={agregarTransacciones} style={{ height: '6vh', background: 'black', color: 'white' }}>Agregar Transacción</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', background: 'white', height: '35vh', width: '20%', marginBottom: '5vh' }}>
            <text>transaccion a editar:</text>
            <text>{transaccionAEditar.id}</text>
            <input
            type="text"
            value={idCliente}
            placeholder="ID de cliente"
            onChange={(e) => setIdCliente(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
            type='date'
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
            type='number'
            value={totalVenta}
            placeholder="Total de venta"
            onChange={(e) => setTotalVenta(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <button onClick={ transaccionAEditar !== null ? EditarTransacciones : null} style={{ height: '6vh', background: 'black', color: 'white' }}>Editar Transacción</button>
        </div>

    </div>
      
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', width: '80%', color: 'black', padding: '1vh', marginBottom: '5vh'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', color: 'black', borderRadius: '1vh', overflow: 'hidden'}}>
          <thead>
            <tr>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>ID Transaccion</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>ID Cliente</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Fecha de Venta</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Total de Venta</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((transaccion) => (
              <tr key={transaccion.id} style={{background: 'black', color: 'white'}}>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.id}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.id_cliente}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.fechaventa}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.totalventa}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}><button onClick={() => { transaccionAEditar.id === transaccion.id ? setTransaccionAEditar({}) : setTransaccionAEditar(transaccion);window.scrollTo({ top: 0, behavior: 'smooth' })}}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transacciones;
