import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import down from "assets/img/ic_download.svg";
import nanumGothic from "assets/fonts/NanumGothic";

export default function EvidencePdfButton({ timeline, transfers }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("NanumGothic.ttf", nanumGothic);
    doc.addFont("NanumGothic.ttf", "NanumGothic", "normal");
    doc.setFont("NanumGothic");

    doc.setFontSize(18);
    doc.text("사건 리포트", 14, 20);

    doc.setFontSize(14);
    doc.text("1. 사건 타임라인", 14, 30);
    const timelineData = timeline.map((i) => [i.time, i.text]);
    autoTable(doc, {
      startY: 35,
      head: [["날짜(시간)", "있었던 일"]],
      body: timelineData,
      theme: "grid",
      styles: { font: "NanumGothic", fontStyle: "normal" },
      headStyles: { font: "NanumGothic", fontStyle: "normal" },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text("2. 송금 정보 관리", 14, finalY);
    const transferData = transfers.map((i) => [
      i.datetime,
      i.receiver,
      i.bank,
      i.amount,
    ]);
    autoTable(doc, {
      startY: finalY + 5,
      head: [["날짜(시간)", "수취인 이름", "은행명", "금액"]],
      body: transferData,
      theme: "grid",
      styles: { font: "NanumGothic", fontStyle: "normal" },
      headStyles: { font: "NanumGothic", fontStyle: "normal" },
    });

    doc.save("report.pdf");
  };

  return (
    <button onClick={generatePDF} className="pdf-download">
      증거 리포트 PDF 다운로드{" "}
      <img src={down} alt="download" className="icon" />
    </button>
  );
}
