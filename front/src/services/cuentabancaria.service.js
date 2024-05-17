import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceCuentaBancaria;

async function Buscar(NombreBanco, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { NombreBanco, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Cbu);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Cbu);
}

async function Grabar(item) {
  const myvar = await BuscarPorId(item);
  if (myvar === null) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Cbu, item);
  }
}

export const cuentabancariaService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};