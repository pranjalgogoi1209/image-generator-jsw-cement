import React from "react";
import styles from "./typingAnimation.module.css";
import { TypeAnimation } from "react-type-animation";
import { typingData } from "./../../../data/home/typingAnimation";
import { Link } from "react-router-dom";
import star from "./../../../assets/homePage/typingText/star.png";

export default function TypingAnimation() {
  return (
    <div className={styles.TypingAnimation}>
      <div className={styles.typingContainer}>
        <div className={styles.typing}>
          <TypeAnimation
            sequence={typingData}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <div className={styles.btnContainer}>
          <Link to={"/capture-image"}>
            <button>
              <span>
                <img src={star} alt="star" />
              </span>
              START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
