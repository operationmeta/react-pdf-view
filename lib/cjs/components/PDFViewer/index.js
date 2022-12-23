"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_pdf_1 = require("react-pdf");
const react_1 = __importStar(require("react"));
require("./index.css");
function PDFViewer({ PDF }) {
    const [page, setPage] = (0, react_1.useState)(1);
    const [disableNext, setDisableNext] = (0, react_1.useState)(false);
    react_pdf_1.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${react_pdf_1.pdfjs.version}/pdf.worker.js`;
    const next = () => {
        setPage((pageNum) => pageNum + 1);
    };
    const prev = () => {
        setPage((pageNum) => pageNum - 1);
        if (disableNext) {
            setDisableNext(false);
        }
    };
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement("div", { className: "pdf-page" },
        react_1.default.createElement(react_pdf_1.Document, { file: PDF, renderMode: "canvas", 
            /* @ts-ignore */
            onContextMenu: (e) => e.preventDefault(), className: "pdf-container" },
            react_1.default.createElement(react_pdf_1.Page, { pageNumber: page, renderTextLayer: false, renderAnnotationLayer: false, onClick: () => !disableNext && next(), onLoadError: () => {
                    // alert("This is the last page"); Isn't necessary.
                    setPage((pageNum) => pageNum - 1);
                    setDisableNext(true);
                } })),
        react_1.default.createElement("div", { className: "button-adjust" },
            react_1.default.createElement("div", null,
                "Page: ",
                page),
            react_1.default.createElement("button", { onClick: prev, disabled: page == 1 }, "Prev"),
            react_1.default.createElement("button", { onClick: next, disabled: disableNext }, "Next"))));
}
exports.default = PDFViewer;
