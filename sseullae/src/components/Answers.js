import React from "react";
import logo from "../assets/images/Logo.png";
import "../styles/Answers.css";
import { Button } from "gestalt";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

function Answers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, answers } = location.state || {};

  const handleBack = () => {
    navigate("/main");
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/answers/${answers.id}`);
      alert("삭제되었습니다.");
      navigate("/main");
    } catch (error) {
      console.error("error:", error);
      alert("삭제 실패");
    }
  };

  return (
    <div className="Answers">
      <header>
        <img src={logo} alt="logo" />
        <p>{date}</p>
      </header>
      <main>
        <div className="q1">
          <p>Q. 오늘의 기분은 어떤가요? </p>
          <p>{answers?.content1 || ""}</p>
        </div>
        <div className="q2">
          <p>Q. 오늘 가장 잘한 점은?</p>
          <p>{answers?.content2 || ""}</p>
        </div>
        <div className="q3">
          <p>Q. 오늘 가장 아쉬웠던 점은?</p>
          <p>{answers?.content3 || ""}</p>
        </div>
      </main>
      <footer>
        <Button text="돌아가기" onClick={handleBack} />
        <Button text="삭제" onClick={handleDelete} />
      </footer>
    </div>
  );
}

export default Answers;
