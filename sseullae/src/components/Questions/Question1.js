import "../../styles/Question.css";
import HAPPY from "../../assets/images/moods/best.png";
import GOOD from "../../assets/images/moods/happy.png";
import SO_SO from "../../assets/images/moods/soso.png";
import SAD from "../../assets/images/moods/sad.png";
import ANGRY from "../../assets/images/moods/bad.png";

export default function Question1({ writeAnswers, next }) {
  const handleMood = (mood) => {
    writeAnswers("question1", mood);
    next();
  };

  return (
    <div className="question">
      <p>Q. 오늘의 기분은 어떤가요?</p>
      <div className="moods">
        <button className="mood-button" onClick={() => handleMood("최고")}>
          <img src={HAPPY} alt="최고" />
        </button>
        <button className="mood-button" onClick={() => handleMood("좋음")}>
          <img src={GOOD} alt="좋음" />
        </button>
        <button className="mood-button" onClick={() => handleMood("쏘쏘")}>
          <img src={SO_SO} alt="쏘쏘" />
        </button>
        <button className="mood-button" onClick={() => handleMood("슬픔")}>
          <img src={SAD} alt="슬픔" />
        </button>
        <button className="mood-button" onClick={() => handleMood("화남")}>
          <img src={ANGRY} alt="화남" />
        </button>
      </div>
    </div>
  );
}
