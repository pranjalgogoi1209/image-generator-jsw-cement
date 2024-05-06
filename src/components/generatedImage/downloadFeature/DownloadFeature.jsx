import React from "react";
import exportAsImage from "./../../../utils/exportAsImage";

export default function DownloadFeature({ exportRef }) {
  return (
    <button
      onClick={() => exportAsImage(exportRef.current, "prompt-into-image")}
      style={{ display: "flex", justifyContent: "center" }}
    >
      Download
    </button>
  );
}
