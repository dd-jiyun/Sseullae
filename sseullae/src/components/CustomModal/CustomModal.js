import React, { useEffect, useState } from "react";
import "./CustomModal.css";

function CustomModal({ isOpen, setOpen }) {
  const [randomMessage, setRandomMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let fadeOutTimer;
    let closeTimer;

    if (isOpen) {
      const messages = [
        "오늘도 수고하셨어요!",
        "좋은 하루 보내세요!",
        "멋진 선택이네요!",
        "하루를 잘 마무리했군요!",
        "내일도 힘내세요!",
      ];

      const randomIndex = Math.floor(Math.random() * messages.length);
      setRandomMessage(messages[randomIndex]);

      fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000);

      closeTimer = setTimeout(() => {
        setOpen(false);
        setIsFadingOut(false);
      }, 3000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, setOpen]);

  return (
    <div
      className={`modalBackground ${isOpen ? "show" : ""} ${
        isFadingOut ? "fade-out" : ""
      }`}
    >
      {isOpen ? (
        <section className="modalContent">
          <p>{randomMessage}</p>
        </section>
      ) : null}
    </div>
  );
}
export default CustomModal;
