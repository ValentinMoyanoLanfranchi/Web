import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceMonederoVirtual;

async function Buscar(Moneda, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Moneda, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdMonedero);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdMonedero);
}

async function Grabar(item) {
  const myvar = await BuscarPorId(item);
  if (myvar === null) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdMonedero, item);
  }
}

export const monederovirtualService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};