import { useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Button } from "../../components/tremor/Button";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";

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
  comunidadAutonoma: keyof typeof IRPFData.IRPF_Autonomico;
  grupo: number;
  movilidadGeografica: boolean;
  discapacidad: Discapacidad;
}

interface IRPFResult {
  salarioNeto: number;
  retencionIRPF: number;
  seguridadSocial: number;
  cuotaSolidaridad: number;
}

interface Deduccion {
  Tipo: string;
  Importes?: Partial<Record<Discapacidad, number>>;
  Importe?: number;
}

export const ChartCardIRPF: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    salarioBruto: 30000,
    comunidadAutonoma: "Madrid",
    grupo: 1,
    movilidadGeografica: false,
    discapacidad: "SinDiscapacidad",
  });

  const [result, setResult] = useState<IRPFResult>({
    salarioNeto: 0,
    retencionIRPF: 0,
    seguridadSocial: 0,
    cuotaSolidaridad: 0,
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
    const { salarioBruto, comunidadAutonoma, discapacidad } = formData;

    // Calculate IRPF estatal
    let irpfEstatal = 0;
    for (const tramo of IRPFData.IRPF_Estatal) {
      if (salarioBruto > tramo.desde) {
        const baseTramo = Math.min(
          salarioBruto - tramo.desde,
          (tramo.hasta === "en adelante" ? salarioBruto : Number(tramo.hasta)) -
            tramo.desde
        );
        irpfEstatal += (baseTramo * tramo.tipo) / 100;
      }
    }

    // Calculate IRPF autonómico
    let irpfAutonomico = 0;
    const tramosAutonomicos = IRPFData.IRPF_Autonomico[comunidadAutonoma];
    for (const tramo of tramosAutonomicos) {
      if (salarioBruto > tramo.desde) {
        const baseTramo = Math.min(
          salarioBruto - tramo.desde,
          (tramo.hasta === "en adelante" ? salarioBruto : Number(tramo.hasta)) -
            tramo.desde
        );
        irpfAutonomico += (baseTramo * tramo.tipo) / 100;
      }
    }

    // Calculate Seguridad Social
    const grupo = IRPFData.TramosSeguridadSocial.find(
      (g) => g.Grupo === formData.grupo
    );
    const seguridadSocial =
      (salarioBruto * (grupo?.PorcentajeTrabajador || 6.35)) / 100;

    const movilidadDeduccion = formData.movilidadGeografica ? 2000 : 0;
    const discapacidadDeduccion =
      getDeduccionByType("Discapacidad")?.Importes?.[
        discapacidad as Discapacidad
      ] ?? 0;

    setResult({
      salarioNeto:
        salarioBruto -
        irpfEstatal -
        irpfAutonomico -
        seguridadSocial +
        movilidadDeduccion +
        discapacidadDeduccion,
      retencionIRPF:
        irpfEstatal +
        irpfAutonomico -
        movilidadDeduccion -
        discapacidadDeduccion,
      seguridadSocial,
      cuotaSolidaridad: 0,
    });
  };

  const IRPF_MESSAGE = (
    <>
      Salario neto anual:{" "}
      <strong style={{ fontSize: "1.5em" }}>
        {formatCurrency(result.salarioNeto)}
      </strong>
      <br />
      <br />
      Retención IRPF: <strong>{formatCurrency(result.retencionIRPF)}</strong>
      <br />
      Seguridad Social:{" "}
      <strong>{formatCurrency(result.seguridadSocial)}</strong>
    </>
  );

  return (
    <div className="irpf-card-container">
      <Card className="irpf-card">
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

        <div className="flex justify-center gap-8 mt-4">
          <Button onClick={calculateIRPF}>Calcular</Button>
          <Button
            variant="secondary"
            onClick={() =>
              setFormData({
                salarioBruto: 30000,
                comunidadAutonoma: "Madrid",
                grupo: 1,
                movilidadGeografica: false,
                discapacidad: "SinDiscapacidad",
              })
            }
          >
            Reiniciar
          </Button>
        </div>
      </Card>

      <Card>
        <CalloutMessage
          message={IRPF_MESSAGE}
          title="Resultado IRPF"
          variant="default"
        />
      </Card>
    </div>
  );
};
