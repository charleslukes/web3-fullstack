import { Props } from "./types";
import "./styles.css";

function Input({ handleOnChange, placeholder }: Props) {
  return <input onChange={handleOnChange} placeholder={placeholder} />;
}

export default Input;
