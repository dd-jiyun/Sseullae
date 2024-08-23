import React, { useEffect, useState } from "react";
import "../styles/CustomModal.css";

function CustomModal({ isOpen, setOpen }) {
  const [ranmdomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const messages = [
      "오늘도 수고하셨어요!",
      "좋은 하루 보내세요!",
      "멋진 선택이네요!",
      "하루를 잘 마무리했군요!",
      "내일도 힘내세요!",
    ];

    const randomMessage = setRandomMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
    console.log(randomMessage);

    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, setOpen]);

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <section>
          <p>{ranmdomMessage}</p>
        </section>
      ) : null}
    </div>
  );
}
export default CustomModal;
