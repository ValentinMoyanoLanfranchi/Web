import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceEmpleado;

async function Buscar(DescripcionCargo, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { DescripcionCargo, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Legajo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Legajo);
}

async function Grabar(item) {
  const myvar = await BuscarPorId(item);
  if (myvar === null) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Legajo, item);
  }
}

export const empleadoService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};