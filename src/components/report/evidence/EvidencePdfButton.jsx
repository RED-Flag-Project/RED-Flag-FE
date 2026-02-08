import down from "assets/img/ic_download.svg";

export default function EvidencePdfButton() {
  return (
    <button className="pdf-download">
      증거 리포트 PDF 다운로드{" "}
      <img src={down} alt="download" className="icon" />
    </button>
  );
}
