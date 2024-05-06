import React from "react";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./generatedImagePage.module.css";
import Header from "../../components/header/Header";

import { MdModeEditOutline } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function GeneratedImagePage({
  capturedImage,
  setUrl,
  setPrintImage,
  setGeneratedImg,
}) {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  prompt && console.log("prompt =>", prompt);

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // image uploading on server
  const getUrl = url => {
    axios
      .post(
        "https://adp24companyday.com/aiphotobooth/aiphotobooth_godrej_ai_prompt/upload.php",
        {
          img: url,
        }
      )
      .then(function (response) {
        setUrl(response.data.url);
        console.log("image uploaded on server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (prompt === "" || !capturedImage) {
      toast.error(
        "Please enter a prompt to generate image or capture your image again",
        toastOptions
      );
    } else {
      console.log("form submitted");
      setGeneratedImg("");
      setPrintImage("");
      axios
        .post("https://h.ngrok.dev/img2txt", {
          data: prompt,
          image: capturedImage.split(",")[1],
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImg(`data:image/webp;base64,${response.data.result}
          `);
          setPrintImage(`data:image/webp;base64,${response.data.result}
          `);
          getUrl(response.data.result);
        })
        .catch(function (error) {
          console.log(error);
        });
      navigate("/share");
    }
  };

  return (
    <div className={styles.GeneratedImagePage}>
      <Header title={"Generate An Image"} />
      <main className={styles.main}>
        <div className={styles.promptContainer}>
          {/* form */}
          <form className={styles.prompt} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <textarea
                // type="text"
                name="prompt"
                placeholder="Describe Your Vision"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <MdModeEditOutline />
            </div>
            <button type="submit">
              <FaWandMagicSparkles />
              Generate
            </button>
          </form>

          {/* prompt example */}
          <div className={styles.promptExample}>
            <h2>Prompt Examples:</h2>
            <ol>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Generate a realistic, diverse image of a young adult male with a
                casual, modern style
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Create an image of a confident and professional adult female
                with a casual appearance
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Generate an artistic and unique portrayal of a teenage male with
                a sporty and energetic vibe
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Craft a visually appealing image of a mature female with a
                relaxed and sophisticated demeanor
              </li>
            </ol>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
