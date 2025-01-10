import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../tremor/Select";

export function SelectHero() {
  const data = [
    {
      value: "dress-shirt-striped",
      label: "Anualmente",
    },
    {
      value: "relaxed-button-down",
      label: "Mensualmente",
    },
  ];

  return (
    <Select>
      <SelectTrigger style={{ width: "300px" }}>
        <SelectValue
          placeholder="Select"
          onChange={() => console.log("Hola")}
        />
      </SelectTrigger>
      <SelectContent onChange={() => console.log("Hola")}>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
