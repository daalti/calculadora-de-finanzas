import { useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Button } from "../../components/tremor/Button";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { DonutChart } from "../../components/tremor/DonutChart";
import { AccordionIRPF } from "../../components/accordion/AccordionIRPF";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/tremor/Accordion";

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
  inferior12meses: boolean;
  hijosMenores25: number;
  hijosMenores3: number;
  personas65a75: number;
  personasMayores75: number;
  descendientesMinusvalia33a65: number;
  descendientesMinusvaliaMas65: number;
  ascendientesMinusvalia33a65: number;
  ascendientesMinusvaliaMas65: number;
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
    inferior12meses: false,
    hijosMenores25: 0,
    hijosMenores3: 0,
    personas65a75: 0,
    personasMayores75: 0,
    descendientesMinusvalia33a65: 0,
    descendientesMinusvaliaMas65: 0,
    ascendientesMinusvalia33a65: 0,
    ascendientesMinusvaliaMas65: 0,
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
    let {
      salarioBruto,
      comunidadAutonoma,
      discapacidad,
      edad,
      hijosMenores25,
      hijosMenores3,
      personas65a75,
      personasMayores75,
      descendientesMinusvalia33a65,
      descendientesMinusvaliaMas65,
      ascendientesMinusvalia33a65,
      ascendientesMinusvaliaMas65,
    } = formData;
    const salarioBrutoInicial = salarioBruto;

    // Calculate Seguridad Social
    const seguridadSocial = (salarioBrutoInicial * 6.47) / 100;
    salarioBruto -= seguridadSocial;

    if (formData.inferior12meses) {
      const retencionIRPF12meses = (salarioBruto * 2) / 100;
      setResult({
        salarioNeto:
          salarioBrutoInicial - seguridadSocial - retencionIRPF12meses,
        retencionIRPF: retencionIRPF12meses,
        seguridadSocial,
        cuotaSolidaridad: 0,
        salarioNetoMensual:
          (salarioBrutoInicial - seguridadSocial - retencionIRPF12meses) /
          formData.pagasAnuales,
      });
      return;
    }

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
    // Calculate deductions for children under 25
    let hijosDeduccion = 0;
    const hijosMenores25Importes = [2400, 2700, 4000, 4500];
    for (let i = 0; i < hijosMenores25; i++) {
      if (i < hijosMenores25Importes.length - 1) {
        hijosDeduccion += hijosMenores25Importes[i];
      } else {
        hijosDeduccion +=
          hijosMenores25Importes[hijosMenores25Importes.length - 1];
      }
    }
    // Calculate deductions for children under 3
    let hijosMenores3Deduccion = hijosMenores3 * 2800;
    // Calculate deductions for people over 65
    const personas65a75Deduccion = personas65a75 * 1150;
    const personasMayores75Deduccion = personasMayores75 * 1400;

    // Calculate deductions for descendants with disabilities
    const descendientesMinusvalia33a65Deduccion =
      descendientesMinusvalia33a65 * 3000;
    const descendientesMinusvaliaMas65Deduccion =
      descendientesMinusvaliaMas65 * 9000;

    // Calculate deductions for ancestors with disabilities
    const ascendientesMinusvalia33a65Deduccion =
      ascendientesMinusvalia33a65 * 3000;
    const ascendientesMinusvaliaMas65Deduccion =
      ascendientesMinusvaliaMas65 * 9000;

    salarioBruto -= movilidadDeduccion + discapacidadDeduccion;
    salarioBruto -=
      hijosDeduccion +
      hijosMenores3Deduccion +
      personas65a75Deduccion +
      personasMayores75Deduccion +
      descendientesMinusvalia33a65Deduccion +
      descendientesMinusvaliaMas65Deduccion +
      ascendientesMinusvalia33a65Deduccion +
      ascendientesMinusvaliaMas65Deduccion;

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

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: value === "" ? "" : parseFloat(value),
      }));
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
              value={
                isEditing
                  ? formData.salarioBruto === 0
                    ? ""
                    : formData.salarioBruto
                  : formatCurrency(formData.salarioBruto)
              }
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              onChange={handleInputChange("salarioBruto")}
            />
          </div>

          <div className="input-container">
            <Label className="label-item">Edad</Label>
            <Input
              className="input-item"
              placeholder="Introduce tu edad"
              value={formData.edad === 0 ? "" : formData.edad}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  edad: parseInt(e.target.value) || 0,
                })
              }
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
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
          <Label className="label-item">
            <input
              type="checkbox"
              checked={formData.inferior12meses}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  inferior12meses: e.target.checked,
                })
              }
              className="mr-2"
            />
            Contrato Inferior a 12 meses
          </Label>
        </div>
        <div className="input-container-wrapper">
          <div className="input-container">
            <Label className="label-item">Nº hijos menores de 25</Label>
            <Input
              className="input-item"
              placeholder="Introduce número de hijos menores de 25"
              value={
                formData.hijosMenores25 === 0 ? "" : formData.hijosMenores25
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hijosMenores25: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              min="0"
            />
          </div>

          <div className="input-container">
            <Label className="label-item">Nº hijos menores de 3 años</Label>
            <Input
              className="input-item"
              placeholder="Introduce número de hijos menores de 3 años"
              value={formData.hijosMenores3 === 0 ? "" : formData.hijosMenores3}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hijosMenores3: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              min="0"
            />
          </div>
        </div>
        <div className="input-container-wrapper">
          <div className="input-container">
            <Label className="label-item">
              Nº Personas entre 65 y 75 años a cargo
            </Label>
            <Input
              className="input-item"
              placeholder="Introduce número de personas entre 65 y 75 años a cargo"
              value={formData.personas65a75 === 0 ? "" : formData.personas65a75}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personas65a75: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              min="0"
            />
          </div>

          <div className="input-container">
            <Label className="label-item">
              Nº de personas mayores de 75 años a cargo
            </Label>
            <Input
              className="input-item"
              placeholder="Introduce número de personas mayores de 75 años a cargo"
              value={
                formData.personasMayores75 === 0
                  ? ""
                  : formData.personasMayores75
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personasMayores75: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              min="0"
            />
          </div>
        </div>
        <div className="input-container">
          <Accordion
            type="multiple"
            className="mx-auto mt-3 max-w-sm"
            style={{ maxWidth: "1000px", width: "100%" }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger style={{ fontSize: "0.875rem" }}>
                Minusvalías de los hijos (opcional)
              </AccordionTrigger>
              <AccordionContent>
                <div className="input-container-wrapper">
                  <div className="input-container">
                    <Label className="label-item">
                      Descendientes con grado de minusvalía entre 33% y 65%
                    </Label>
                    <Input
                      className="input-item"
                      placeholder="Introduce número de descendientes con minusvalía entre 33% y 65%"
                      value={
                        formData.descendientesMinusvalia33a65 === 0
                          ? ""
                          : formData.descendientesMinusvalia33a65
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        if (
                          value <=
                          formData.hijosMenores25 -
                            formData.descendientesMinusvaliaMas65
                        ) {
                          setFormData({
                            ...formData,
                            descendientesMinusvalia33a65: value,
                          });
                        }
                      }}
                      type="number"
                      min="0"
                    />
                  </div>

                  <div className="input-container">
                    <Label className="label-item">
                      Descendientes con grado de minusvalía mayor a 65%
                    </Label>
                    <Input
                      className="input-item"
                      placeholder="Introduce número de descendientes con minusvalía mayor a 65%"
                      value={
                        formData.descendientesMinusvaliaMas65 === 0
                          ? ""
                          : formData.descendientesMinusvaliaMas65
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        if (
                          value <=
                          formData.hijosMenores25 -
                            formData.descendientesMinusvalia33a65
                        ) {
                          setFormData({
                            ...formData,
                            descendientesMinusvaliaMas65: value,
                          });
                        }
                      }}
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger style={{ fontSize: "0.875rem" }}>
                Minusvalías de los mayores a cargo (opcional)
              </AccordionTrigger>
              <AccordionContent>
                <div className="input-container-wrapper">
                  <div className="input-container">
                    <Label className="label-item">
                      Ascendientes con grado de minusvalía entre 33% y 65%
                    </Label>
                    <Input
                      className="input-item"
                      placeholder="Introduce número de ascendientes con minusvalía entre 33% y 65%"
                      value={
                        formData.ascendientesMinusvalia33a65 === 0
                          ? ""
                          : formData.ascendientesMinusvalia33a65
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ascendientesMinusvalia33a65:
                            parseInt(e.target.value) || 0,
                        })
                      }
                      type="number"
                      min="0"
                    />
                  </div>

                  <div className="input-container">
                    <Label className="label-item">
                      Ascendientes con grado de minusvalía mayor a 65%
                    </Label>
                    <Input
                      className="input-item"
                      placeholder="Introduce número de ascendientes con minusvalía mayor a 65%"
                      value={
                        formData.ascendientesMinusvaliaMas65 === 0
                          ? ""
                          : formData.ascendientesMinusvaliaMas65
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ascendientesMinusvaliaMas65:
                            parseInt(e.target.value) || 0,
                        })
                      }
                      type="number"
                      min="0"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
                inferior12meses: false,
                hijosMenores25: 0,
                hijosMenores3: 0,
                personas65a75: 0,
                personasMayores75: 0,
                descendientesMinusvalia33a65: 0,
                descendientesMinusvaliaMas65: 0,
                ascendientesMinusvalia33a65: 0,
                ascendientesMinusvaliaMas65: 0,
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
      <AccordionIRPF />
    </div>
  );
};
