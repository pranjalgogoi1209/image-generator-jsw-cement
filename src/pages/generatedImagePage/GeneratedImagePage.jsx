import React, { useEffect } from "react";
import styles from "./generatedImagePage.module.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../../components/header/Header";
import { MdModeEditOutline } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Avatar from "../../components/avatar/Avatar";
import useCropFace from "../../customHooks/useCrop";

export default function GeneratedImagePage({
  capturedImage,
  setUrl,
  setPrintImage,
  setGeneratedImg,
  
}) {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const [metaData,setMetaData]=useState();
  const [isLoading,setIsLoading]=useState(false)
  

  prompt && console.log("prompt =>", prompt);

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    const cropImage = async ()=>{
      const payloadImg = {
        img:capturedImage,
        isBase64:true
      }
      let res = await useCropFace(payloadImg,setIsLoading);
      setMetaData(res.metaData);
      console.log(res)
    }
    cropImage();
  },[])

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
        .post("https://52.56.108.15/image_generator_advanced", {
          data: prompt,
          metadata: metaData,
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

        <div className={styles.AvatarContainer}>
          <Avatar
            capturedImage={capturedImage}
            setUrl={setUrl}
            setGeneratedImg={setGeneratedImg}
            setPrintImage={setPrintImage}
          />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
