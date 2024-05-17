import React, { useState, useEffect } from "react";
import moment from "moment";
import EmpleadoBuscar from "./EmpleadoBuscar";
import EmpleadoListado from "./EmpleadoListado";
import EmpleadoRegistro from "./EmpleadoRegistro";
import { empleadoService } from "../../services/empleado.service";
import modalDialogService from "../../services/modalDialog.service";

function Empleado() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [DescripcionCargo, setDescripcionCargo] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])

  async function Buscar() {
    modalDialogService.BloquearPantalla(true);
    const data = await empleadoService.Buscar(DescripcionCargo, Activo);
    setItems(data.Items);
    modalDialogService.BloquearPantalla(false);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await empleadoService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      Legajo: null,
      FechaIngreso: null,
      DescripcionCargo: null,
      Activo: true,
    });
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {

    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await empleadoService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    await empleadoService.Grabar(item);
    await Buscar();
    Volver();

    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente.",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "success"
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Empleado <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <EmpleadoBuscar
          DescripcionCargo={DescripcionCargo}
          setDescripcionCargo={setDescripcionCargo}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <EmpleadoListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <EmpleadoRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Empleado };