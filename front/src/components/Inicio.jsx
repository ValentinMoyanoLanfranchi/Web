import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
      <div className="mt-4 p-5 rounded" style={{backgroundColor:"lightgray"}} >
        <h1>Grupo 8 3k7</h1>
        <p>Este trabajo está desarrollado con las siguientes tecnologías:</p>
        <p>
          Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite y 
          multiples capas en Javascript.
        </p>
        <p>
          Frontend: Single Page Aplication, HTML, CSS, Bootstrap, NodeJs,
          Javascript y React.
        </p>
        <Link to="/personas" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Personas
        </Link>
        <Link to="/monederovirtual" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver MonederoVirtual
        </Link>
        <Link to="/empleado" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Empleado
        </Link>
        <Link to="/telefono" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Telefono
        </Link>
        <Link to="/cuentabancaria" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver CuentaBancaria
        </Link>
      </div>
  );
}

export { Inicio };
