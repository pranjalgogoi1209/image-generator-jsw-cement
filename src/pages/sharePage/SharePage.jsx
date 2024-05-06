import React, { useState, useRef } from "react";
import styles from "./sharePage.module.css";
import DownloadFeature from "../../components/generatedImage/downloadFeature/DownloadFeature";
import PrintFeature from "../../components/generatedImage/printFeature/PrintFeature";
import { Link } from "react-router-dom";
import Email from "../../components/email/Email";
import loader from "./../../assets/generatedImagePage/loader.mp4";
import Qr from "../../components/qr/Qr";
import Header from "../../components/header/Header";

export default function SharePage({
  printImage,
  setPrintImage,
  generatedImg,
  url,
}) {
  const printRef = useRef();
  const exportRef = useRef();
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className={styles.SharePage}>
      {generatedImg && <Header title={"Ready To Share ?"} />}

      <div className={styles.resultContainer}>
        {printImage ? (
          <div className={styles.top}>
            <div className={styles.image} ref={exportRef}>
              <img
                src={printImage}
                alt="generated image"
                ref={printRef}
                id="printableArea"
              />
            </div>
            {/* share features */}
            <div className={styles.btns}>
              {/* download feature */}
              <DownloadFeature exportRef={printRef} />

              {/* print feature */}
              <PrintFeature
                setPrintImage={setPrintImage}
                printRef={printRef}
                generatedImg={generatedImg}
              />

              {/* email feature */}
              <button className={styles.qr} onClick={() => setShowEmail(true)}>
                Email
              </button>

              {/* qr feature */}
              <button className={styles.qr} onClick={() => setShowQr(true)}>
                Qr
              </button>

              <button className={styles.qr}>
                <Link
                  to={"/"}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Home{" "}
                </Link>
              </button>

              {/* qr feature */}
              {showQr && <Qr url={url} setShowQr={setShowQr} />}

              {/* email feature */}
              {showEmail && (
                <Email setShowEmail={setShowEmail} url={url} prompt={prompt} />
              )}
            </div>
          </div>
        ) : (
          /*  <div className={styles.loading}>
                <div className={styles.ldsRing}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div> */

          <video autoPlay loop muted className={styles.video}>
            <source src={loader} height={100} width={100} />
          </video>
        )}
      </div>
    </div>
  );
}
