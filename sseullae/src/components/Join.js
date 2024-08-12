import "../styles/Join.css";
import { useState } from "react";
import apiClient from "../api/axios";
import { Box, Button, TextField } from "gestalt";

export default function Join() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!inputText) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.post("/api/members/join", {
        nickname: inputText,
      });

      console.log("성공 : ", response.data);
      setError(null);
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
