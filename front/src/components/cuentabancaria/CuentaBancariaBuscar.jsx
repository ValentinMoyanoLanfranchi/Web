import React from "react";
export default function CuentaBancariaBuscar ({NombreBanco, setNombreBanco, Activo, setActivo, Buscar, Agregar}) {

    return (
    <form name="FormBusqueda" onSubmit={(e)=> e.preventDefault()}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">NombreBanco:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombreBanco(e.target.value)}
              value={NombreBanco}
            />
          </div>
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Activo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <select
              className="form-control"
              onChange={(e) => setActivo(e.target.value)}
              value={Activo}
            >
              <option value={null}></option>
              <option value={false}>NO</option>
              <option value={true}>SI</option>
            </select>
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };