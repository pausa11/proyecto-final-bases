import React from 'react';                                               
import { Routes, Route } from 'react-router-dom';

import Clientes from './Clientes';
import Home from './home';
import Transacciones from './transacciones';
import Libros from './libros';
import TransaccionesCliente from './trasaccionCliente';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/transacciones" element={<Transacciones />} />
      <Route path="/libros" element={<Libros />} />
      <Route path="/transacciones/:id" element={<TransaccionesCliente />} />
    </Routes>
  );
}

export default App;   