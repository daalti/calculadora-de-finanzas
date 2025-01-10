import React from "react";
import { SelectNative } from "../tremor/SelectNative";

interface FormData {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  interestRate: number;
  compoundingFrequency: number;
}

interface Props {
  handleInputChange: (
    field: keyof FormData
  ) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectNativeHero: React.FC<Props> = ({ handleInputChange }) => (
  <SelectNative
    style={{ width: "300px" }}
    value={1}
    onChange={handleInputChange("compoundingFrequency")}
  >
    <option value="1">Anualmente</option>
    <option value="12">Mensualmente</option>
  </SelectNative>
);
