import "./styles.css";
import { Props } from "./types";

function Dashboard({ name = "", symbol = "", balance = "" }: Partial<Props>) {
  return (
    // could be done with a map but no need since its just three data
    <div className="main">
      <div className="container">
        <div>Token Name: </div>
        <div>{name}</div>
      </div>
      <div className="container">
        <div>Token Symbol: </div>
        <div>{symbol}</div>
      </div>
      <div className="container">
        <div>User Balance: </div>
        <div>{balance}</div>
      </div>
    </div>
  );
}

export default Dashboard;
