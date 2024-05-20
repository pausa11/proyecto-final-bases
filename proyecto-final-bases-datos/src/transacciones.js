import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Transacciones() {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/transacciones`|| 'http://localhost:3001/transacciones';

    const [transacciones, setTransacciones] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [fechaVenta, setFechaVenta] = useState('');
    const [id_libro, setIdLibro] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [idClienteEditar, setIdClienteEditar] = useState('');
    const [fechaVentaEditar, setFechaVentaEditar] = useState('');
    const [id_libroEditar, setIdLibroEditar] = useState('');
    const [cantidadEditar, setCantidadEditar] = useState('');

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

    const obtenerStock = async (id_libro) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/libros/${id_libro}`);
            return response.data.libro.stock;
        } catch (error) {
            console.error('Error al obtener el stock:', error);
        }
    }


    const agregarTransacciones = async () => {
        try {

            const stock = await obtenerStock(id_libro);


            if (stock < cantidad) {
                alert('No hay suficiente stock');
                return;
            }
            await axios.post(URL, {
                idCliente,
                fechaVenta,
                id_libro,
                cantidad
            });
            fetchTransacciones();
            setIdCliente('');
            setFechaVenta('');
            setIdLibro('');
            setCantidad('');
        } catch (error) {
            console.error('Error al agregar la transacción:', error);
        }
  };

    const [transaccionAEditar, setTransaccionAEditar] = useState({});
  
    const EditarTransacciones = async () => {
    try {
        await axios.put(`${URL}/${transaccionAEditar.id}` ,{
            idClienteEditar,
            fechaVentaEditar,
            id_libroEditar,
            cantidadEditar
        });
        fetchTransacciones();
        setIdClienteEditar('');
        setFechaVentaEditar('');
        setIdLibroEditar('');
        setCantidadEditar('');
        setTransaccionAEditar({});
    } catch (error) {
        console.error('Error al editar la transacción:', error);
    }
    };

    const eliminarTransaccion = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            fetchTransacciones();
        } catch (error) {
            console.error('Error al eliminar la transacción:', error);
        }
    }

    const obtenerTotal = async (id_libro,cantidad) => {
      console.log(id_libro,cantidad);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/libros/${id_libro}`);
            return response.data.libro.precio*cantidad;
        } catch (error) {
            console.error('Error al obtener el total:', error);
        }
    }

    const TotalVenta = ({ id_libro, cantidad }) => {
      const [total, setTotal] = useState(null);
    
      useEffect(() => {
        let isMounted = true;
    
        obtenerTotal(id_libro, cantidad).then(result => {
          if (isMounted) {
            setTotal(result);
          }
        });
    
        return () => {
          isMounted = false;
        };
      }, [id_libro, cantidad]);
    
      return (
        <td style={{ padding: '1vh', borderBottom: '1px solid gray' }}>
          {total !== null ? total : 'Cargando...'}
        </td>
      );
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
              type='number'
              value={id_libro}
              placeholder="ID de libro"
              onChange={(e) => setIdLibro(e.target.value)}
              style={{ marginBottom: '1vh', textAlign: 'center' }}
            />

            <input
              type='number'
              value={cantidad}
              placeholder="Cantidad"
              onChange={(e) => setCantidad(e.target.value)}
              style={{ marginBottom: '1vh', textAlign: 'center' }}
            />

            <button onClick={agregarTransacciones} style={{ height: '6vh', background: 'black', color: 'white' }}>Agregar Transacción</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', background: 'white', height: '35vh', width: '20%', marginBottom: '5vh' }}>
            <text>ID de transaccion a editar:</text>
            <text>{transaccionAEditar.id}</text>
            <input
              type="text"
              value={idClienteEditar}
              placeholder="ID de cliente"
              onChange={(e) => setIdClienteEditar(e.target.value)}
              style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
              type='date'
              value={fechaVentaEditar}
              onChange={(e) => setFechaVentaEditar(e.target.value)}
              style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
              type='number'
              value={id_libroEditar}
              placeholder="ID de libro"
              onChange={(e) => setIdLibroEditar(e.target.value)}
              style={{ marginBottom: '1vh', textAlign: 'center' }}
            />
            <input
              type='number'
              value={cantidadEditar}
              placeholder="Cantidad"
              onChange={(e) => setCantidadEditar(e.target.value)}
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
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>ID Libro</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Cantidad</th>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>total venta</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((transaccion) => (
              <tr key={transaccion.id} style={{background: 'black', color: 'white'}}>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.id}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.id_cliente}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.fechaventa}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.id_libro}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{transaccion.cantidad}</td>
                <TotalVenta id_libro={transaccion.id_libro} cantidad={transaccion.cantidad} />
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}><button onClick={() => { transaccionAEditar.id === transaccion.id ? setTransaccionAEditar({}) : setTransaccionAEditar(transaccion);window.scrollTo({ top: 0, behavior: 'smooth' })}}>Editar</button></td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}><button onClick={() => eliminarTransaccion(transaccion.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transacciones;
