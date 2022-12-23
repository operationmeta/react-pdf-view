import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useState } from "react";
import "./index.css";
function PDFViewer({ PDF }) {
    const [page, setPage] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const next = () => {
        setPage((pageNum) => pageNum + 1);
    };
    const prev = () => {
        setPage((pageNum) => pageNum - 1);
        if (disableNext) {
            setDisableNext(false);
        }
    };
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "ArrowLeft" && page > 1) {
                prev();
            }
            else if (e.key === "ArrowRight" && !disableNext) {
                next();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [page, disableNext]);
    return (React.createElement("div", { className: "pdf-page" },
        React.createElement(Document, { file: PDF, renderMode: "canvas", 
            /* @ts-ignore */
            onContextMenu: (e) => e.preventDefault(), className: "pdf-container" },
            React.createElement(Page, { pageNumber: page, renderTextLayer: false, renderAnnotationLayer: false, onClick: () => !disableNext && next(), onLoadError: () => {
                    // alert("This is the last page"); Isn't necessary.
                    setPage((pageNum) => pageNum - 1);
                    setDisableNext(true);
                } })),
        React.createElement("div", { className: "button-adjust" },
            React.createElement("div", null,
                "Page: ",
                page),
            React.createElement("button", { onClick: prev, disabled: page == 1 }, "Prev"),
            React.createElement("button", { onClick: next, disabled: disableNext }, "Next"))));
}
export default PDFViewer;
