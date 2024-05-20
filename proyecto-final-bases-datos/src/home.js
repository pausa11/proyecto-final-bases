import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="App" style={{background:'#E6E4D5',minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily:'calibri',alignItems:'center'}}>

        <div style={{display: 'flex',justifyContent: 'center', width:'100%', alignItems: 'center',marginBottom:'5vh',background:'black',height:'10vh',color:'white'}}>
            <text style={{margin:'0', fontSize:'4vh',letterSpacing:'.4vh',fontWeight:'700'}}>LibroGest </text>
        </div>

        <div style={{display:'flex',flexDirection: 'column',justifyContent:'center'}}>
            <text style={{fontSize:'2vh',fontWeight:'700',marginBottom:'1vh'}}>Bienvenido a la gestión de la librería</text>
            
            {/*navega a clientes con un boton*/}
            <button style={{background:'black',color:'white',border:'none',padding:'1vh',cursor:'pointer',borderRadius:'5px',marginBottom:'2vh'}} onClick={() => window.location.href='/clientes'}>Clientes</button>
            {/*navega a libros con un boton*/}
            <button style={{background:'black',color:'white',border:'none',padding:'1vh',cursor:'pointer',borderRadius:'5px',marginBottom:'2vh'}} onClick={() => window.location.href='/libros'}>Libros</button>
            {/*navega a transacciones con un boton*/}
            <button style={{background:'black',color:'white',border:'none',padding:'1vh',cursor:'pointer',borderRadius:'5px',marginBottom:'2vh'}} onClick={() => window.location.href='/transacciones'}>Transacciones</button>
        </div>

        <footer style={{fontWeight: '100', width: '30%', display: 'flex', justifyContent: 'center', borderRadius: '1vh',fontSize:'3vh', position: 'fixed', bottom: 10}}>
          Jannin Ramirez, Javier Parra, Daniel Toro
        </footer>


    </div>
  );
}

export default Home;
