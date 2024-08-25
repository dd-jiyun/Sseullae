import logo from "../../assets/images/fulllogo.svg";
import "./Intro.css";

function Intro({ fadeOut }) {
  return (
    <div className={`Intro ${fadeOut ? "fade-out" : ""}`}>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default Intro;
