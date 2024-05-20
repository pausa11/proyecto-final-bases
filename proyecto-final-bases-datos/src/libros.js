import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Libros() {
  const URL = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/libros`
    : 'http://localhost:3001/libros';

  const [libros, setLibros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [editorial, setEditorial] = useState('');

  useEffect(() => {
    fetchLibros();
    // eslint-disable-next-line
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await axios.get(URL);
      setLibros(response.data.libros);
    } catch (error) {
      console.error('Error al obtener las libros:', error);
    }
  };

  const agregarLibros = async () => {
        try {
        await axios.post(URL, {
            titulo,
            autor,
            precio,
            stock,
            editorial
        });
        fetchLibros();
        setTitulo('');
        setAutor('');
        setPrecio('');
        setStock('');
        setEditorial('');
    } catch (error) {
      console.error('Error al agregar la transacción:', error);
    }
  };

  return (
    <div className="App" style={{ background: '#E6E4D5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Calibri', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '5vh', background: 'black', height: '10vh', color: 'white' }}>
        <img src="homeIcon.png" style={{ width: '5vh', marginLeft: '2vw', filter: 'invert(1)', height: '4vh' }} onClick={() => window.location.href = '/'} alt='homeIcon' />{' '}
        <span style={{ marginLeft: '41.5vw', fontSize: '4vh', letterSpacing: '.4vh', fontWeight: '700' }}>Libros</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', background: 'white', height: '35vh', width: '20%', marginBottom: '5vh' }}>
        <input
          type="text"
          value={titulo}
            placeholder="Título"
            onChange={(e) => setTitulo(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <input
            type="text"
            value={autor}
            placeholder="Autor"
            onChange={(e) => setAutor(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <input
            type="number"
            value={precio}
            placeholder="Precio"
            onChange={(e) => setPrecio(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' ,marginLeft: '1vw'}}
        />

        <input
            type="number"
            value={stock}
            placeholder="Stock"
            onChange={(e) => setStock(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' ,marginLeft: '1vw'}}
        />

        <input
            type="text"
            value={editorial}
            placeholder="Editorial"
            onChange={(e) => setEditorial(e.target.value)}
            style={{ marginBottom: '1vh', textAlign: 'center' }}
        />

        <button onClick={agregarLibros} style={{ height: '6vh', background: 'black', color: 'white' }}>Agregar Libro</button>
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: '3vw', width: '80%', color: 'black', padding: '1vh', marginBottom: '5vh'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', color: 'black', borderRadius: '1vh', overflow: 'hidden'}}>
          <thead>
            <tr>
              <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Título</th>
                <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Autor</th>
                <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Precio</th>
                <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Stock</th>
                <th style={{padding: '1vh', borderBottom: '2px solid gray', textAlign: 'left'}}>Editorial</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libros) => (
              <tr key={libros.id} style={{background: 'black', color: 'white'}}>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{libros.titulo}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{libros.autor}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{libros.precio}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{libros.stock}</td>
                <td style={{padding: '1vh', borderBottom: '1px solid gray'}}>{libros.editorial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Libros;
