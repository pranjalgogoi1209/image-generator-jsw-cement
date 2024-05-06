import React, { useState, CSSProperties } from "react";
import styles from "./email.module.css";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { SyncLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-simple-keyboard/build/css/index.css";
// import Keyboard from "react-simple-keyboard";

import Loading from "../loading/Loading";

import { IoMdCloseCircle } from "react-icons/io";
// import submit from "./../../assets/avatarPage/submit.svg";

export default function Email({ setShowEmail, url, prompt }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [keyboardLayout, setKeyboardLayout] = useState("default");

  let [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    const layoutName = "";

    keyboardLayout === "default"
      ? setKeyboardLayout("shift")
      : setKeyboardLayout("default");
  };

  const onChangeInput = event => {
    const input = event.target.value;

    setUserEmail(input);
  };

  // toast options
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    if (!loading) {
      if (userEmail) {
        setLoading(true);
        setTimeout(() => {
          axios
            .post(
              "https://adp24companyday.com/aiphotobooth/aiphotobooth_godrej_ai_prompt/emailer/index.php",
              {
                email: userEmail,
                url: url,
                prompt: prompt,
              }
            )
            .then(function (response) {
              console.log("email api response =>", response);
              setLoading(false);
              toast.success("Email has sent successfully", toastOptions);
              navigate("/");
            })
            .catch(function (error) {
              console.log(error);
              toast.error("Something wrong...", toastOptions);
            });
        }, 500);
      } else {
        toast.error("Please enter a correct email", toastOptions);
      }
    } else {
      toast.error("Please wait...");
    }
  };

  return (
    <div className={styles.Email} onClick={() => setShowEmail(false)}>
      <div
        className={styles.container}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <input
          type="mail"
          value={userEmail}
          placeholder="Enter your email"
          onChange={e => setUserEmail(e.target.value)}
          className={styles.input}
        />
        {/*  <Keyboard
          keyboardRef={r => {
            if (window) window.keyboard = r;
          }}
          layoutName={keyboardLayout}
          onChange={input => {
            setUserEmail(input);
          }}
          onKeyPress={onKeyPress}
          className={styles.keyboard}
        /> */}

        <div
          onClick={handleSubmit}
          className={`imgContainer ${styles.imgContainer}`}
        >
          {/* <img src={submit} alt="submit" /> */}
          <button className={styles.submit}>Submit</button>
        </div>

        <div className={styles.close} onClick={() => setShowEmail(false)}>
          {/* <img src={close} alt="close" /> */}
          <IoMdCloseCircle />
        </div>

        {loading && <Loading />}
      </div>
      <ToastContainer />
    </div>
  );
}
