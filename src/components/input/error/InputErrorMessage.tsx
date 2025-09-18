import { FormText } from "react-bootstrap";
import { ExclamationDiamond } from "react-bootstrap-icons";

export default function InputErrorMessage({ children }: any) {
  return (
    <FormText className="text-danger">
      <ExclamationDiamond className="me-1" />
      {children}
    </FormText>
  );
}
