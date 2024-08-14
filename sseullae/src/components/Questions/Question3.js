import { useEffect, useState } from "react";
import { Button, TextField } from "gestalt";
import "../../styles/Question.css";
import smLogo from "../../assets/images/Logo.png";

export default function Question3({ writeAnswers, prev, finish, answers }) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText(answers);
  }, [answers]);

  const handleFinish = () => {
    writeAnswers("question3", inputText);
    finish();
  };

  return (
    <div className="question">
      <p>Q. 오늘 가장 아쉬웠던 것은?</p>
      <main>
        <img src={smLogo} alt="logo" />
        <TextField
          id="answer"
          placeholder="여기에 아쉬운 점을 적어주세요."
          type="text"
          onChange={({ value }) => setInputText(value)}
          value={inputText}
        />
      </main>
      <footer>
        <Button className="btn" text="이전" onClick={prev} />
        <Button className="btn" text="완료" onClick={handleFinish} />
      </footer>
    </div>
  );
}
