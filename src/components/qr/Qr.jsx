import React from "react";
import styles from "./qr.module.css";

import QRCode from "react-qr-code";

import { IoMdCloseCircle } from "react-icons/io";

export default function Qr({ url, setShowQr }) {
  // console.log("url =>", url);
  return (
    <div className={styles.Qr} onClick={() => setShowQr(false)}>
      <div
        className={styles.container}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <h2 className={`gothamBlack ${styles.heading}`}>SCAN, SAVE, SHARE !</h2>

        {!url && <p className={styles.loader}>Loading...</p>}

        {url && <QRCode size={180} value={url} className={styles.qrCode} />}

        {/* close */}
        <div className={styles.close} onClick={() => setShowQr(false)}>
          <IoMdCloseCircle />
        </div>
      </div>
    </div>
  );
}
