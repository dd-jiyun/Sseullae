import "../styles/Join.css";
import { useState } from "react";
import { Box, Button, TextField } from "gestalt";

export default function Join() {
  const [inputText, setInputText] = useState("");

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
      <Button text="확인" type="submit" />
    </div>
  );
}
