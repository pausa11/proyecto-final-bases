import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD,PORT } from './config.js';

const app = express();
// const pool = new pg.Pool({
//   database: DB_NAME,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   port: DB_PORT,
//   host: DB_HOST
// });

//conectarse a bases de datos de render en la nube
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://proyecto_bases_user:UF5t1fO1hwYqu17Z2sZCuoJAqMUtOBEK@dpg-cp3t2rfsc6pc73fvet5g-a.oregon-postgres.render.com/proyecto_bases',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json()); // Agrega este middleware para analizar el cuerpo de las solicitudes JSON

//--------------------------------------------------------------------------

// Obtener todos los clientes
app.get('/', async(req, res) => {
  const result = await pool.query('SELECT * FROM clientes');
  console.log(result);
  res.send(
    {
      clientes: result.rows
    }
  );
});

// Obtener todas las transacciones
app.get('/transacciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transaccion');
    res.send({ transacciones: result.rows });
  } catch (error) {
    console.error('Error al obtener las transacciones:', error);
    res.status(500).send('Error al obtener las transacciones');
  }
});

//obtener los libros
app.get('/libros', async(req, res) => {
  const result = await pool.query('SELECT * FROM libros');
  console.log(result);
  res.send(
    {
      libros: result.rows
    }
  );
});

//onbtener un libro por id
app.get('/libros/:id', async(req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
  console.log(result);
  res.send(
    {
      libro: result.rows[0]
    }
  );
});

// // Obtener las transacciones por ID de cliente
// app.get('/transacciones/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       `SELECT 
//         c.id AS id_cliente, 
//         c.nombre AS nombre_cliente, 
//         c.apellido AS apellido_cliente, 
//         t.id AS id_transaccion, 
//         t.fechaventa, 
//         t.totalventa, 
//         dt.id_libro, 
//         dt.cantidad, 
//         dt.preciounitario 
//       FROM 
//         clientes c 
//       INNER JOIN 
//         transaccion t 
//       ON 
//         c.id = t.id_cliente 
//       INNER JOIN 
//         detalletranzaccion dt 
//       ON 
//         t.id = dt.id_transaccion 
//       WHERE 
//         c.id = $1`,
//       [id]
//     );
//     res.send({
//       transacciones: result.rows
//     });
//   } catch (error) {
//     console.error('Error al obtener las transacciones del cliente:', error);
//     res.status(500).send('Error en el servidor');
//   }
// });

// Obtener las transacciones por ID de cliente
app.get('/transacciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        c.id AS id_cliente, 
        c.nombre AS nombre_cliente, 
        c.apellido AS apellido_cliente, 
        t.id AS id_transaccion, 
        t.fechaventa, 
        t.id_libro,
        t.cantidad
      FROM 
        clientes c 
      INNER JOIN 
        transaccion t 
      ON 
        c.id = t.id_cliente 
      WHERE 
        c.id = $1`,
      [id]
    );
    res.send({
      transacciones: result.rows
    });
  } catch (error) {
    console.error('Error al obtener las transacciones del cliente:', error);
    res.status(500).send('Error en el servidor');
  }
});

//---------------------------------------------------------------------------

// Agregar un cliente
app.post('/', async(req, res) => {
  console.log('en post');
  const { nombre, apellido, edad, telefono, cedula } = req.body;
  console.log(nombre, apellido, edad, telefono, cedula);
  const result = await pool.query(
    'INSERT INTO clientes (nombre, apellido, edad, telefono, cedula) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, apellido, edad, telefono, cedula]
  );
  console.log(result);
  res.send(
    {
      clientes: result.rows
    }
  );
});

// Agregar un libro
app.post('/libros', async(req, res) => {
  const { titulo, autor, precio, stock, editorial } = req.body;
  const result = await pool.query(
    'INSERT INTO libros (titulo, autor, precio, stock, editorial) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [titulo, autor, precio, stock, editorial]
  );
  console.log(result);
  res.send(
    {
      libros: result.rows
    }
  );
});

// Agregar una transacción
app.post('/transacciones', async (req, res) => {
  const { idCliente, fechaVenta, id_libro, cantidad } = req.body;
  console.log(idCliente, fechaVenta, id_libro, cantidad);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertResult = await client.query(
      'INSERT INTO transaccion (id_cliente, fechaventa, id_libro, cantidad) VALUES ($1, $2, $3, $4) RETURNING *',
      [idCliente, fechaVenta, id_libro, cantidad]
    );

    const updateStockResult = await client.query(
      'UPDATE libros SET stock = stock - $1 WHERE id = $2 RETURNING *',
      [cantidad, id_libro]
    );

    await client.query('COMMIT');

    res.send({ transacciones: insertResult.rows, libro: updateStockResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al agregar la transacción:', error);
    res.status(500).send('Error al agregar la transacción');
  } finally {
    client.release();
  }
});

//--------------------------------------------------------------------------

// Editar un cliente
app.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { nombreEditar, apellidoEditar, edadEditar, telefonoEditar, cedulaEditar } = req.body;
  const result = await pool.query(
    'UPDATE clientes SET nombre = $1, apellido = $2, edad = $3, telefono = $4, cedula = $5 WHERE id = $6 RETURNING *',
    [nombreEditar, apellidoEditar, edadEditar, telefonoEditar, cedulaEditar, id]
  );
  console.log(result);
  res.send(
    {
      clientes: result.rows
    }
  );
});

// Editar un libro
app.put('/libros/:id', async(req, res) => {
  const { id } = req.params;
  const { tituloEditar, autorEditar, precioEditar, stockEditar, editorialEditar } = req.body;
  console.log(tituloEditar, autorEditar, precioEditar, stockEditar, editorialEditar);
  const result = await pool.query(
    'UPDATE libros SET titulo = $1, autor = $2, precio = $3, stock = $4, editorial = $5 WHERE id = $6 RETURNING *',
    [tituloEditar, autorEditar, precioEditar, stockEditar, editorialEditar, id]
  );
  console.log(result);
  res.send(
    {
      libros: result.rows
    }
  );
});

// Editar una transacción
app.put('/transacciones/:id', async (req, res) => {
  const { id } = req.params;
  const { idClienteEditar, fechaVentaEditar, id_libroEditar, cantidadEditar } = req.body;
  try {
    const result = await pool.query(
      'UPDATE transaccion SET id_cliente = $1, fechaventa = $2, id_libro = $3, cantidad = $4 WHERE id = $5 RETURNING *',
      [idClienteEditar, fechaVentaEditar, id_libroEditar, cantidadEditar, id]
    );
    res.send({ transacciones: result.rows });
  } catch (error) {
    console.error('Error al editar la transacción:', error);
    res.status(500).send('Error al editar la transacción');
  }
});

//---------------------------------------------------------------------------

// Eliminar un cliente
app.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
  console.log(result);
  res.send(
    {
      clientes: result.rows
    }
  );
});

// Eliminar un libro
app.delete('/libros/:id', async(req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM libros WHERE id = $1', [id]);
  console.log(result);
  res.send(
    {
      libros: result.rows
    }
  );
});

// Eliminar una transacción
app.delete('/transacciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM transaccion WHERE id = $1', [id]);
    res.send({ id });
  } catch (error) {
    console.error('Error al eliminar la transacción:', error);
    res.status(500).send('Error al eliminar la transacción');
  }
});

//---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Server is running on port 3001');
});