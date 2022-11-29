import { Props } from "./types";
import "./styles.css";

function Button({ btnText = "button text", handleBtnClick  }: Props) {

  return <button onClick={handleBtnClick}>{btnText}</button>;
}

export default Button;
