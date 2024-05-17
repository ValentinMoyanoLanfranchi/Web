import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourcePersonas;

async function Buscar(Nombre, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Dni);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Dni);
}

async function Grabar(item) {
  const myvar = await BuscarPorId(item);
  if (myvar === null) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Dni, item);
  }
}

export const personasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};