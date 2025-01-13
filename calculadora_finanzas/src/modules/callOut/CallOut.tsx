import { Callout } from "../../components/tremor/Callout";
import "./CallOut.css";

interface Props {
  message: React.ReactNode;
  title: string;
  variant: "default" | "success" | "warning" | "error";
}

export const CalloutMessage: React.FC<Props> = ({
  message,
  title,
  variant = "default",
}) => (
  <div className="flex flex-col gap-4 callout-container">
    <Callout variant={variant} title={title}>
      {message}
    </Callout>
  </div>
);
