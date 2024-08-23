import { useEffect, useState } from "react";
import "../../styles/Question.css";
import smLogo from "../../assets/images/Logo.png";

export default function Question3({ writeAnswers, prev, finish, answers }) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText(answers || "");
  }, [answers]);

  const handleFinish = () => {
    writeAnswers("question3", inputText);
    finish();
  };

  return (
    <div className="question">
      <p>Q. 오늘 가장 아쉬웠던 것은?</p>
      <main>
        <img src={smLogo} alt="A logo showing the application" />
        <input
          id="answer"
          placeholder="여기에 아쉬운 점을 적어주세요."
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </main>
      <footer>
        <button type="button" onClick={prev}>
          이전
        </button>
        <button type="button" onClick={handleFinish}>
          완료
        </button>
      </footer>
    </div>
  );
}
