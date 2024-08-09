import "./App.css";
import Intro from "./components/Intro";
import Join from "./components/Join";
import { useState, useEffect } from "react";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 2초 후에 로고가 서서히 사라지기 시작
    const opacityTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // 3초 후에 Intro에서 Join으로 전환
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
