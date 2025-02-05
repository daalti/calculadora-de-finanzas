import { useEffect, useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Button } from "../../components/tremor/Button";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { DonutChart } from "../../components/tremor/DonutChart";
import { AccordionLaboralCost } from "../../components/accordion/AccordionLaboralCost";
import { CalloutMessage } from "../callOut/CallOut";
import IRPFData from "../../assets/IRPF/IRPF.json";
import "./ChartCardLaboralCost.css";

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
  salarioBrutoInicial: number;
}

interface Deduccion {
  Tipo: string;
  Importes?: Partial<Record<Discapacidad, number>>;
  Importe?: number;
}

export const ChartCardLaboralCost: React.FC = () => {
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

  const [cotizationCompany, setCotizationCompany] = useState<number>(0);

  const [result, setResult] = useState<IRPFResult>({
    salarioNeto: 0,
    retencionIRPF: 0,
    seguridadSocial: 0,
    cuotaSolidaridad: 0,
    salarioNetoMensual: 0,
    salarioBrutoInicial: 0,
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
    let seguridadSocial = 0;
    if (
      salarioBruto / 12 <
      IRPFData.TramosSeguridadSocial[formData.grupo].BaseMinima
    ) {
      let salaryToCalculate =
        IRPFData.TramosSeguridadSocial[formData.grupo].BaseMinima * 12;
      const cotizationCompanyNumber = (salaryToCalculate * 31.4) / 100;
      console.log(cotizationCompanyNumber);
      setCotizationCompany(cotizationCompanyNumber);

      seguridadSocial = (salaryToCalculate * 6.47) / 100;
      salarioBruto -= seguridadSocial;
    } else {
      const cotizationCompanyNumber = (salarioBrutoInicial * 31.4) / 100;
      setCotizationCompany(cotizationCompanyNumber);
      console.log(cotizationCompanyNumber);

      // Calculate Seguridad Social
      seguridadSocial = (salarioBrutoInicial * 6.47) / 100;
      salarioBruto -= seguridadSocial;
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
      salarioBrutoInicial: salarioBrutoInicial,
      salarioNetoMensual:
        (salarioBrutoInicial - irpfEstatal - irpfAutonomico - seguridadSocial) /
        formData.pagasAnuales,
    });
  };

  const IRPF_MESSAGE = (
    <>
      Coste laboral: <br />
      <strong style={{ fontSize: "1.5em" }}>
        {formatCurrency(cotizationCompany + result.salarioBrutoInicial)}
      </strong>
      <br />
      <br />
      Salario neto anual:{" "}
      <strong style={{ fontSize: "1.5em" }}>
        {formatCurrency(result.salarioNeto)}
      </strong>
      <br />
      <br />
      De lo que paga la empresa cuanto se queda el estado:
      <strong style={{ fontSize: "1.5em" }}>
        {(
          (1 -
            result.salarioNeto /
              (cotizationCompany + result.salarioBrutoInicial)) *
          100
        ).toFixed(2)}
        %
      </strong>
    </>
  );

  useEffect(() => {
    calculateIRPF();
  }, []);

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
              {
                name: "Seguridad Social Empresa",
                value: cotizationCompany,
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
      <AccordionLaboralCost />
    </div>
  );
};
