import React, { useState } from "react";
import "../styles/Main.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import moment from "moment";
import { Button } from "gestalt";
import { useNavigate } from "react-router-dom";

function Main() {
  const nickname = localStorage.getItem("nickname");
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  const showQuestion = () => {
    navigate("/questions");
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
        <p>오늘 하루는 어땠나요?</p>
        <Button text="쓰러갈래 !" type="submit" onClick={showQuestion}>
          쓰러갈래 !
        </Button>
      </footer>
      {/* 만약 오늘 이미 작성했다면, 보러갈래! 할 수 있어야함. */}
    </div>
  );
}

export default Main;
