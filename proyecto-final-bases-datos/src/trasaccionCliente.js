import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function TransaccionesCliente() {
  // Toma de la URL el id para hacer la consulta
  const id = window.location.pathname.split('/')[2];
  const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/transacciones';

  const [transacciones, setTransacciones] = useState([]);
  const [idTransaccion, setIdTransaccion] = useState('');
  const [idLibro, setIdLibro] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    fetchTransacciones();
    // eslint-disable-next-line
  }, []);

  const fetchTransacciones = async () => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      setTransacciones(response.data.transacciones);
    } catch (error) {
      console.error('Error al obtener las transacciones:', error);
    }
  };

  const editarTransacciones = async () => {
    try {
      await axios.put(`${URL}/${idTransaccion}`, {
        idTransaccion,
        idLibro,
        cantidad,
        precio
      });
      fetchTransacciones();
      setIdTransaccion('');
      setIdLibro('');
      setCantidad('');
      setPrecio('');
    } catch (error) {
      console.error('Error al editar la transacción:', error);
    }
  };

  return (
    <div className="App" style={{ background: '#E6E4D5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Calibri', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '5vh', background: 'black', height: '10vh', color: 'white' }}>
        <img src="../homeIcon.png" style={{ width: '5vh', marginLeft: '2vw', filter: 'invert(1)', height: '4vh' }} onClick={() => window.location.href = '/'} alt='homeIcon' />{' '}
        <span style={{ marginLeft: '33.5vw', fontSize: '4vh', letterSpacing: '.4vh', fontWeight: '700' }}> Detalles Transacciones</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', background: 'white', height: '35vh', width: '20%', marginBottom: '5vh' }}>
        <input
          type="text"
          value={idTransaccion}
          placeholder='ID Transacción'
          onChange={(e) => setIdTransaccion(e.target.value)}
          style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <input
          type="text"
          value={idLibro}
          placeholder='ID Libro'
          onChange={(e) => setIdLibro(e.target.value)}
          style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <input
          type="number"
          value={cantidad}
          placeholder='Cantidad'
          onChange={(e) => setCantidad(e.target.value)}
          style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <input
          type="number"
          value={precio}
          placeholder='Precio'
          onChange={(e) => setPrecio(e.target.value)}
          style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <button onClick={editarTransacciones} style={{ height: '6vh', background: 'black', color: 'white' }}>Editar Transacción</button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', width: '80%', color: 'black', padding: '1vh', marginBottom: '5vh' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', color: 'black', borderRadius: '1vh', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>ID Cliente</th>
              <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>Nombre Cliente</th>
                <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>Apellido CLiente </th>
              <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>ID transaccion</th>
              <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>Fecha</th>
              <th style={{ padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left' }}>venta</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((transaccion) => (
              <tr key={transaccion.id} style={{ background: 'black', color: 'white' }}>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.id_cliente}</td>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.nombre_cliente}</td>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.apellido_cliente}</td>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.id_transaccion}</td>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.fechaventa}</td>
                <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>{transaccion.totalventa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransaccionesCliente;
