import React, { useEffect, useState } from "react";
import "../styles/CustomModal.css";

function CustomModal({ isOpen, setOpen, fadeOut }) {
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const messages = [
      "오늘도 수고하셨어요!",
      "좋은 하루 보내세요!",
      "멋진 선택이네요!",
      "하루를 잘 마무리했군요!",
      "내일도 힘내세요!",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);

    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, setOpen]);

  return (
    <div className={`CustomModal ${fadeOut ? "fade-out" : ""}`}>
      <div className={isOpen ? "openModal modal" : "modal"}>
        {isOpen ? (
          <section>
            <p>{randomMessage}</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
export default CustomModal;
