import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import Calendar from "react-calendar";
import "./Main.css";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";
import moment from "moment";

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
  const isFetching = useRef(false);

  const fetchAnswers = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;

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
    } finally {
      isFetching.current = false;
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
          tileContent={({ date, view }) =>
            view === "month" &&
            answers.some(
              (answer) => answer.date === moment(date).format("YYYY-MM-DD")
            ) ? (
              <div className="dot"></div>
            ) : null
          }
          tileDisabled={({ date, view }) => {
            if (view === "month") {
              const formattedDate = moment(date).format("YYYY-MM-DD");
              const today = moment().format("YYYY-MM-DD");

              if (formattedDate === today) {
                return false;
              } else {
                return !answers.some((answer) => answer.date === formattedDate);
              }
            }
            return false;
          }}
        />
      </main>
      <footer>
        {hasWrittenDiary ? (
          <>
            <p>이미 작성하셨네요!</p>
            <button onClick={showAnswers}>보러갈래!</button>
          </>
        ) : (
          <>
            <p>오늘 하루는 어땠나요?</p>
            <button onClick={showQuestion}>쓰러갈래!</button>
          </>
        )}
      </footer>
    </div>
  );
}

export default Main;
