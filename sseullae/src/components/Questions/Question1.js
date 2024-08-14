import { Button } from "gestalt";
import "../../styles/Question.css";

export default function Question1({ writeAnswers, next }) {
  const handleMood = (mood) => {
    writeAnswers("question1", mood);
    next();
  };

  return (
    <div className="question">
      <p>Q. 오늘의 기분은 어떤가요?</p>
      {/* 여기에 기분 이모지 선택하는 컴포넌트 또는 버튼들이 들어갈 예정 */}
      <div className="moods">
        <Button text="최고!" onClick={() => handleMood("최고")} />
        <Button text="좋아!" onClick={() => handleMood("좋음")} />
        <Button text="그럭저럭,," onClick={() => handleMood("쏘쏘")} />
        <Button text="슬퍼ㅜ" onClick={() => handleMood("슬픔")} />
        <Button text="화나!" onClick={() => handleMood("화남")} />
      </div>
    </div>
  );
}
