import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import Calendar from "react-calendar";
import "../styles/Main.css";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import moment from "moment";
import { Button } from "gestalt";

function Main() {
  const nickname = localStorage.getItem("nickname");
  const [value, onChange] = useState(new Date());
  const [hasWrittenDiary, setHasWrittenDiary] = useState(false);
  const navigate = useNavigate();

  const checkDiary = async () => {
    const memberId = localStorage.getItem("memberId");

    try {
      const response = await apiClient.get(`/answers?id=${memberId}`);
      console.log("response:", response.data);

      const { content1, content2, content3 } = response.data;

      if (content1 === "" && content2 === "" && content3 === "") {
        setHasWrittenDiary(false);
      } else {
        setHasWrittenDiary(true);
      }
    } catch (error) {
      console.error("error:", error);
      setHasWrittenDiary(false);
    }
  };

  useEffect(() => {
    checkDiary();
  }, []);

  const showQuestion = () => {
    navigate("/questions");
  };

  const showAnswers = () => {
    navigate("/answers");
  };

  return (
    <div className="Main">
      <header>
        <p>환영합니다, {nickname}님 !</p>
      </header>
      <main>
        <Calendar
          onChange={onChange}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format("D")}
          navigationLabel={null}
          maxDate={new Date()}
          value={value}
        />
      </main>
      <footer>
        {hasWrittenDiary ? (
          <>
            <p>이미 작성하셨네요!</p>
            <Button text="보러갈래!" type="submit" onClick={showAnswers} />
          </>
        ) : (
          <>
            <p>오늘 하루는 어땠나요?</p>
            <Button text="쓰러갈래!" type="submit" onClick={showQuestion} />
          </>
        )}
      </footer>
    </div>
  );
}

export default Main;
