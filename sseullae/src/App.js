import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Intro from "./components/Intro/Intro";
import Join from "./components/Join/Join";
import Main from "./components/Main/Main";
import Questions from "./components/Questions/Questions";
import Answers from "./components/Answers/Answers";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={showIntro ? <Intro fadeOut={fadeOut} /> : <Join />}
          />
          <Route path="/join" element={<Join />} />
          <Route path="/main" element={<Main />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
