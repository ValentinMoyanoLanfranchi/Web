import React from "react";
import moment from "moment";

export default function MonederoVirtualListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Buscar,
}) {

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
          <th className="text-center">IdMonedero:</th>
            <th className="text-center">FechaAlta</th>
            <th className="text-center">Moneda</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdMonedero}>
                <td>{Item.IdMonedero}</td>
                <td>{Item.FechaAlta}</td>
                <td>{Item.Moneda}</td>
                <td>{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Activo ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}