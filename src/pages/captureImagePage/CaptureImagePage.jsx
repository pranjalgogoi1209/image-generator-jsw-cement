import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styles from "./captureImagePage.module.css";
import Header from "../../components/header/Header";
import useCropFace from "../../customHooks/useCrop";
// import { image } from "html2canvas/dist/types/css/types/image";

export default function CaptureImagePage({ setCapturedImg }) {
  const navigate = useNavigate();
  const webRef = useRef();
  const [img, setImg] = useState();

  const handleCapture = e => {
    if (e.target.innerText === "Capture") {
      
      setImg(webRef.current.getScreenshot());
      e.target.innerText = "Retake";
    } else {
      img && setImg("");
      e.target.innerText = "Capture";
    }
  };

  

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = () => {
    if (img) {
      setCapturedImg(img);
      navigate("/generated-image");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={styles.CaptureImagePage}>
      <Header title={"Capture Your Image"} />
      <div className={styles.captureImage}>
        <div className={styles.webcamContainer}>
          <div className={styles.webcamParent}>
            <Webcam
              ref={webRef}
              id={styles.webcam}
              forceScreenshotSourceSize={true}
              // screenshotFormat="image/png"
            />
            {img && (
              <img
                src={img}
                alt="captured image"
                className={styles.capturedImage}
              />
            )}
          </div>
          {/*  <img src={frame} alt="frame" className={styles.frame} /> */}
        </div>
        <div className={styles.capture}>
          <button
            onClick={e => handleCapture(e)}
            className={styles.captureRetake}
          >
            Capture
          </button>
          <button onClick={handleSubmit} className={styles.submit}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
