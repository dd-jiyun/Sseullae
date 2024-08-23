import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import apiClient from "../../api/axios";
import CustomModal from "../CustomModal";
import "../../styles/Question.css";

function Questions() {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saveAnswers = async () => {
      const data = {
        memberId: localStorage.getItem("memberId"),
        content1: answers.question1,
        content2: answers.question2,
        content3: answers.question3,
      };

      try {
        await apiClient.post("/answers", data);
        setIsModalOpen(true);
      } catch (error) {
        console.error("error:", error.response.data);
        if (error.response.status === 400) {
          alert("답변하지 않은 질문이 있습니다.");
        }
      }
    };

    if (currentQuestion === 4) {
      saveAnswers();
    }
  }, [currentQuestion, answers, navigate]);

  const writeAnswers = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextQuestion = () => {
    setCurrentQuestion((prev) => (prev < 3 ? prev + 1 : 4));
  };

  const closeModalAndGoToMain = () => {
    setCurrentQuestion(4);
    setIsModalOpen(false);
    navigate("/main");
  };

  return (
    <div className="Questions">
      {currentQuestion === 1 && (
        <Question1
          writeAnswers={writeAnswers}
          next={goToNextQuestion}
          answers={answers.question1}
        />
      )}
      {currentQuestion === 2 && (
        <Question2
          writeAnswers={writeAnswers}
          prev={goToPreviousQuestion}
          next={goToNextQuestion}
          answers={answers.question2}
        />
      )}
      {currentQuestion === 3 && (
        <Question3
          writeAnswers={writeAnswers}
          prev={goToPreviousQuestion}
          finish={goToNextQuestion}
          answers={answers.question3}
        />
      )}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} setOpen={closeModalAndGoToMain} />
      )}
    </div>
  );
}

export default Questions;
