import React, { useCallback, useEffect, useState } from "react";
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
  const [value, setValue] = useState(new Date());
  const [hasWrittenDiary, setHasWrittenDiary] = useState(false);
  const [formattedToday, setFormattedToday] = useState(
    moment().format("YYYY년 MM월 DD일")
  );
  const [todayAnswer, setTodayAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const fetchAnswers = useCallback(async () => {
    const memberId = localStorage.getItem("memberId");
    const month = moment().format("M");

    try {
      const response = await apiClient.get(
        `/answers?id=${memberId}&month=${month}`
      );
      console.log("response:", response.data);

      setAnswers(response.data);
    } catch (error) {
      console.error("error:", error);
    }
  }, []);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    const currentDay = moment(value).format("YYYY-MM-DD");
    const formattedDay = moment(value).format("YYYY년 MM월 DD일");

    setFormattedToday(formattedDay);
    const answer = answers.find((answer) => answer.date === currentDay);

    setTodayAnswer(answer);
    setHasWrittenDiary(!!answer);
  }, [value, answers]);

  const showQuestion = () => {
    navigate("/questions");
  };

  const showAnswers = () => {
    navigate("/answers", {
      state: { date: formattedToday, answers: todayAnswer },
    });
  };

  return (
    <div className="Main">
      <header>
        <p>환영합니다, {nickname}님 !</p>
      </header>
      <main>
        <Calendar
          onChange={setValue}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format("D")}
          navigationLabel={null}
          maxDate={new Date()}
          value={value}
          tileDisabled={({ date, view }) => {
            if (view === "month") {
              const formattedDate = moment(date).format("YYYY-MM-DD");
              return !answers.some((answer) => answer.date === formattedDate);
            }
            return false;
          }}
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
