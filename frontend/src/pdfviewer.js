import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PDFViewer = () => {
  const [pdfData, setPdfData] = useState(null);
  const { fileid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3003/getpdf/${fileid}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfData(url);
      })
      .catch((error) => {
        console.error("Error fetching the PDF: ", error);
      });
  }, [fileid]);

  return (
    <div>
      {pdfData ? (
        <object
          data={pdfData}
          type="application/pdf"
          width="100%"
          height="700px"
        >
          PDF Viewer not supported by your browser. You can download the PDF
          <a href={pdfData}>here</a>.
        </object>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
