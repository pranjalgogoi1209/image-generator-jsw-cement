import React, { useState } from "react";
import EmailModal from "../../modals/emailModal/EmailModal";

export default function EmailFeature({ generatedImg }) {
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // handle Email
  const handleEmail = () => {
    console.log("clicked on Email Button");
    setIsEmailOpen(true);
    // document.body.style.overflow = "hidden";
  };

  return (
    <div>
      <button
        onClick={handleEmail}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Email
      </button>
      {isEmailOpen && (
        <EmailModal
          setIsEmailOpen={setIsEmailOpen}
          generatedImg={generatedImg}
        />
      )}
    </div>
  );
}
