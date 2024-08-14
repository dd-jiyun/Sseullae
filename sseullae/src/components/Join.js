import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Join.css";
import apiClient from "../api/axios";
import { Box, Button, TextField } from "gestalt";

export default function Join() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nickname = localStorage.getItem("nickname");

    if (nickname) {
      navigate("/main");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!inputText) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.post("/members/join", {
        nickname: inputText,
      });

      console.log("성공 : ", response.data);
      setError(null);

      localStorage.setItem("memberId", response.data.id);
      localStorage.setItem("nickname", inputText);

      navigate("/main");
    } catch (error) {
      if (error.response.status === 400) {
        setError("이미 존재하는 닉네임입니다.");
      } else {
        console.error("실패 :", error);
        setError("서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="Join">
      <p>‘쓸래’에서 사용할 닉네임을 입력해주세요.</p>
      <Box padding={8} width="100%">
        <TextField
          id="joinText"
          onChange={({ value }) => {
            setInputText(value);
          }}
          placeholder="닉네임을 입력하세요"
          type="text"
          value={inputText}
        />
      </Box>
      {error && <p className="error">{error}</p>}
      <Button text="확인" type="submit" onClick={handleSubmit} />
    </div>
  );
}
