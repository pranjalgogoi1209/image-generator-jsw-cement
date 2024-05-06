import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintFeature({
  setPrintImage,
  printRef,
  generatedImg,
}) {
  // handlePrint
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
      body * {
        visibility: hidden;
      }
      #printableArea, #printableArea * {
        visibility: visible;
      }
      #printableArea {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  `,
  });

  useEffect(() => {
    if (generatedImg) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width * 1;
        canvas.height = img.height * 1.06;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const scaledImage = canvas.toDataURL("image/png");
        setPrintImage(scaledImage);
      };

      img.src = generatedImg;
    }
  }, [generatedImg]);

  return (
    <button
      onClick={handlePrint}
      style={{ display: "flex", justifyContent: "center" }}
    >
      Print
    </button>
  );
}
