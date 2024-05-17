import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceTelefono;

async function Buscar(Descripcion, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Descripcion, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Numero);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Numero);
}

async function Grabar(item) {
  const myvar = await BuscarPorId(item);
  if (myvar === null) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Numero, item);
  }
}

export const telefonoService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};