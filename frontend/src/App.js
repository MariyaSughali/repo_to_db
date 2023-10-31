import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListView from "./listview";
import PdfViewer from "./pdfviewer";

function MyApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/listview" element={<ListView />} />
          <Route path="/pdfviewer/:fileid" element={<PdfViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
