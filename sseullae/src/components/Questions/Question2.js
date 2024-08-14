import React, { useEffect, useState } from "react";
import { Button, TextField } from "gestalt";
import "../../styles/Question.css";
import smLogo from "../../assets/images/Logo.png";

export default function Question2({ writeAnswers, prev, next, answers }) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText(answers);
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

        <TextField
          id="answer"
          placeholder="여기에 잘한 점을 적어주세요."
          type="text"
          onChange={({ value }) => setInputText(value)}
          value={inputText}
        />
      </main>
      <footer>
        <Button text="이전" onClick={prev} />
        <Button text="다음" onClick={handleNext} />
      </footer>
    </div>
  );
}
