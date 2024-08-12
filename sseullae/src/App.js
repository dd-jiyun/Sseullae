import "./App.css";
import Intro from "./components/Intro";
import Join from "./components/Join";
import { useState, useEffect } from "react";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // 매번 렌더링 될때마다 호출됨.
  useEffect(() => {
    const opacityTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const pageTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => {
      clearTimeout(opacityTimer);
      clearTimeout(pageTimer);
    };
  }, []);

  return (
    <div className="App">
      {showIntro ? <Intro fadeOut={fadeOut} /> : <Join />}
    </div>
  );
}

export default App;
