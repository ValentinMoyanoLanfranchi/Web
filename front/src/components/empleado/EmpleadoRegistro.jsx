import React from "react";
import { useForm } from "react-hook-form";

export default function EmpleadoRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };
  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Legajo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Legajo">
                Legajo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Legajo", {
                  required: { value: true, message: "Legajo es requerido" },
                })}
              />
              {errors?.Legajo && touchedFields.Legajo && (
                <div className="invalid-feedback">
                  {errors?.Legajo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaIngreso */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaIngreso">
                FechaIngreso<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("FechaIngreso", {
                  required: { value: true, message: "FechaIngreso es requerido" },
                })}
              />
              {errors?.FechaIngreso && touchedFields.FechaIngreso && (
                <div className="invalid-feedback">
                  {errors?.FechaIngreso?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo DescripcionCargo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="DescripcionCargo">
              DescripcionCargo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("DescripcionCargo", {
                  required: { value: true, message: "DescripcionCargo es requerido" },
                })}
              />
              {errors?.DescripcionCargo && touchedFields.DescripcionCargo && (
                <div className="invalid-feedback">
                  {errors?.DescripcionCargo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}