import React, { useEffect, useState } from "react";
import "./Question.css";
import smLogo from "../../assets/images/logo.svg";

export default function Question2({ writeAnswers, prev, next, answers }) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText(answers || "");
  }, [answers]);

  const handleNext = () => {
    writeAnswers("question2", inputText);
    next();
  };

  return (
    <div className="question">
      <p>Q. 오늘 가장 잘한 점은?</p>
      <main>
        <img src={smLogo} alt="logo" />

        <input
          id="answer"
          placeholder="여기에 잘한 점을 적어주세요."
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </main>
      <footer>
        <button onClick={prev}>이전</button>
        <button onClick={handleNext}>다음</button>
      </footer>
    </div>
  );
}
