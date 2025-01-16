import { useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Button } from "../../components/tremor/Button";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { DonutChart } from "../../components/tremor/DonutChart";

import { SelectNative } from "../../components/tremor/SelectNative";
import { CalloutMessage } from "../callOut/CallOut";
import IRPFData from "../../assets/IRPF/IRPF.json";
import "./ChartCardIRPF.css";

type Discapacidad =
  | "SinDiscapacidad"
  | "Entre33y65"
  | "Entre33y65ConAsistencia"
  | "Mas65";

interface FormData {
  salarioBruto: number;
  pagasAnuales: number;
  comunidadAutonoma: keyof typeof IRPFData.IRPF_Autonomico;
  grupo: number;
  movilidadGeografica: boolean;
  discapacidad: Discapacidad;
  edad: number;
}

interface IRPFResult {
  salarioNeto: number;
  retencionIRPF: number;
  seguridadSocial: number;
  cuotaSolidaridad: number;
  salarioNetoMensual: number;
}

interface Deduccion {
  Tipo: string;
  Importes?: Partial<Record<Discapacidad, number>>;
  Importe?: number;
}

export const ChartCardIRPF: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    salarioBruto: 30000,
    pagasAnuales: 12,
    comunidadAutonoma: "Madrid",
    grupo: 1,
    movilidadGeografica: false,
    discapacidad: "SinDiscapacidad",
    edad: 30,
  });

  const [result, setResult] = useState<IRPFResult>({
    salarioNeto: 0,
    retencionIRPF: 0,
    seguridadSocial: 0,
    cuotaSolidaridad: 0,
    salarioNetoMensual: 0,
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getDeduccionByType = (tipo: string): Deduccion | undefined => {
    return IRPFData.DeduccionesIRPF.find((d) => d.Tipo === tipo);
  };

  const calculateIRPF = () => {
    let { salarioBruto, comunidadAutonoma, discapacidad, edad } = formData;
    const salarioBrutoInicial = salarioBruto;

    // Calculate Seguridad Social
    const seguridadSocial = (salarioBrutoInicial * 6.47) / 100;

    salarioBruto -= seguridadSocial;
    if (salarioBruto > 14852 && salarioBruto <= 17673.52) {
      salarioBruto -= 7302 - 1.75 * (salarioBruto - 14852);
    }
    if (salarioBruto < 19747.5 && salarioBruto > 17673.52) {
      salarioBruto -= 2364.34 - 1.14 * (salarioBruto - 17673.52);
    } else if (salarioBruto <= 14852) {
      salarioBruto -= 7302;
    }
    salarioBruto -= 2000;

    const movilidadDeduccion = formData.movilidadGeografica ? 2000 : 0;
    const discapacidadDeduccion =
      getDeduccionByType("Discapacidad")?.Importes?.[
        discapacidad as Discapacidad
      ] ?? 0;

    salarioBruto -= movilidadDeduccion + discapacidadDeduccion;

    // Calculate IRPF estatal
    let irpfEstatal = 0;
    let tramosIRPF;
    if (edad > 75) {
      tramosIRPF = IRPFData.IRPF_Estatal_75;
    } else if (edad > 65) {
      tramosIRPF = IRPFData.IRPF_Estatal_65;
    } else {
      tramosIRPF = IRPFData.IRPF_Estatal;
    }

    // Calculate IRPF using selected table
    for (const tramo of tramosIRPF) {
      if (salarioBruto > tramo.desde) {
        if (salarioBruto > tramo.hasta) {
          irpfEstatal += (tramo.tipo * (tramo.hasta - tramo.desde)) / 100;
        } else {
          irpfEstatal += (tramo.tipo * (salarioBruto - tramo.desde)) / 100;
          break;
        }
      }
    }

    // Calculate IRPF autonómico
    let irpfAutonomico = 0;
    let tramosAutonomicosAge;
    if (edad > 75) {
      tramosAutonomicosAge = IRPFData.IRPF_Autonomico_75;
    } else if (edad > 65) {
      tramosAutonomicosAge = IRPFData.IRPF_Autonomico_65;
    } else {
      tramosAutonomicosAge = IRPFData.IRPF_Autonomico;
    }
    const tramosAutonomicos = tramosAutonomicosAge[comunidadAutonoma];
    for (const tramo of tramosAutonomicos) {
      if (salarioBruto > tramo.desde) {
        if (salarioBruto > tramo.hasta) {
          irpfAutonomico += (tramo.tipo * (tramo.hasta - tramo.desde)) / 100;
        } else {
          irpfAutonomico += (tramo.tipo * (salarioBruto - tramo.desde)) / 100;
          break;
        }
      }
    }

    setResult({
      salarioNeto:
        salarioBrutoInicial - irpfEstatal - irpfAutonomico - seguridadSocial,
      retencionIRPF: irpfEstatal + irpfAutonomico,
      seguridadSocial,
      cuotaSolidaridad: 0,
      salarioNetoMensual:
        (salarioBrutoInicial - irpfEstatal - irpfAutonomico - seguridadSocial) /
        formData.pagasAnuales,
    });
  };

  const IRPF_MESSAGE = (
    <>
      Salario neto anual:{" "}
      <strong style={{ fontSize: "2em" }}>
        {formatCurrency(result.salarioNeto)}
      </strong>
      <br />
      <br />
      Salario neto mensual:{" "}
      <strong style={{ fontSize: "2em" }}>
        {formatCurrency(result.salarioNetoMensual)}
      </strong>
      <br />
      <br />
      Retención IRPF:{" "}
      <strong style={{ fontSize: "1.2em" }}>
        {formatCurrency(result.retencionIRPF)}
      </strong>
      <br />
      Tipo de retención:{" "}
      <strong style={{ fontSize: "1.2em" }}>
        {((result.retencionIRPF / formData.salarioBruto) * 100).toFixed(2)}%
      </strong>
      <br />
      Seguridad Social:{" "}
      <strong style={{ fontSize: "1.2em" }}>
        {formatCurrency(result.seguridadSocial)}
      </strong>
    </>
  );

  return (
    <div className="irpf-card-container">
      <Card className="irpf-card">
        <div className="input-container-wrapper">
          <div className="input-container">
            <Label className="label-item">Salario Bruto Anual</Label>
            <Input
              className="input-item"
              placeholder="Introduce salario bruto"
              value={formData.salarioBruto}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salarioBruto: parseFloat(e.target.value) || 0,
                })
              }
              type="number"
            />
          </div>

          <div className="input-container">
            <Label className="label-item">Edad</Label>
            <Input
              className="input-item"
              placeholder="Introduce tu edad"
              value={formData.edad}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  edad: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              min="16"
              max="100"
            />
          </div>
        </div>
        <div className="input-container-wrapper">
          <div className="input-container">
            <Label className="label-item">Nº de Pagas Anuales</Label>
            <SelectNative
              value={formData.pagasAnuales.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pagasAnuales: parseInt(e.target.value),
                })
              }
            >
              <option value="12">12 pagas</option>
              <option value="14">14 pagas</option>
            </SelectNative>
          </div>

          <div className="input-container">
            <Label className="label-item">Comunidad Autónoma</Label>
            <SelectNative
              value={formData.comunidadAutonoma}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  comunidadAutonoma: e.target
                    .value as keyof typeof IRPFData.IRPF_Autonomico,
                })
              }
            >
              <option value="" disabled>
                Selecciona Comunidad Autónoma
              </option>
              {Object.keys(IRPFData.IRPF_Autonomico).map((comunidad) => (
                <option key={comunidad} value={comunidad}>
                  {comunidad}
                </option>
              ))}
            </SelectNative>
          </div>
        </div>
        <div className="input-container-wrapper">
          <div className="input-container">
            <Label className="label-item">Grupo Profesional</Label>
            <SelectNative
              value={formData.grupo.toString()}
              onChange={(e) =>
                setFormData({ ...formData, grupo: parseInt(e.target.value) })
              }
            >
              <option value="" disabled>
                Selecciona Grupo Profesional
              </option>
              {IRPFData.TramosSeguridadSocial.map((grupo) => (
                <option key={grupo.Grupo} value={grupo.Grupo.toString()}>
                  {grupo.Categoria}
                </option>
              ))}
            </SelectNative>
          </div>

          <div className="input-container">
            <Label className="label-item">Grado de Discapacidad</Label>
            <SelectNative
              value={formData.discapacidad}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discapacidad: e.target
                    .value as keyof (typeof IRPFData.DeduccionesIRPF)[2]["Importes"],
                })
              }
            >
              <option value="SinDiscapacidad">Sin Discapacidad</option>
              <option value="Entre33y65">Entre 33% y 65%</option>
              <option value="Entre33y65ConAsistencia">
                Entre 33% y 65% con Asistencia
              </option>
              <option value="Mas65">Más del 65%</option>
            </SelectNative>
          </div>
        </div>
        <div className="input-container">
          <Label className="label-item">
            <input
              type="checkbox"
              checked={formData.movilidadGeografica}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  movilidadGeografica: e.target.checked,
                })
              }
              className="mr-2"
            />
            Movilidad Geográfica
          </Label>
        </div>
        <div className="flex justify-center gap-8 mt-4">
          <Button onClick={calculateIRPF}>Calcular</Button>
          <Button
            variant="secondary"
            onClick={() =>
              setFormData({
                salarioBruto: 30000,
                pagasAnuales: 12,
                comunidadAutonoma: "Madrid",
                grupo: 1,
                movilidadGeografica: false,
                discapacidad: "SinDiscapacidad",
                edad: 30,
              })
            }
          >
            Reiniciar
          </Button>
        </div>
      </Card>
      <Card className="irpf-card-results">
        <CalloutMessage
          message={IRPF_MESSAGE}
          title="Resultado IRPF"
          variant="success"
        />
        <div>
          <DonutChart
            data={[
              {
                name: "Salario Neto",
                value: result.salarioNeto,
              },
              {
                name: "Retención IRPF",
                value: result.retencionIRPF,
              },
              {
                name: "Seguridad Social",
                value: result.seguridadSocial,
              },
            ]}
            style={{ width: "300px", height: "300px" }}
            category="name"
            variant="pie"
            value="value"
            valueFormatter={(number) =>
              number.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
        </div>
      </Card>
    </div>
  );
};
