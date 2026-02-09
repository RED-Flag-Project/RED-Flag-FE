import ChecklistItem from "./ChecklistItem";

const ITEMS = [
  {
    title: "상대방과의 모든 대화 내용 캡쳐",
    desc: "날짜와 시간이 보이도록 캡쳐하세요.",
  },
  {
    title: "이체 내역서(송금 확인증) 발급",
    desc: "은행 앱에서 PDF로 저장 가능합니다.",
  },
  {
    title: "피해 발생 타임라인 정리",
    desc: "언제, 어떤 거짓말에 속았는지 기록합니다.",
  },
  {
    title: "상대방 신원 정보 확보",
    desc: "이름, 계좌번호, 전화번호, ID 등",
  },
];

export default function RequiredChecklist({ checked, onToggle }) {
  return (
    <div className="required-checklist">
      <h3>신고 전 필수 체크리스트</h3>
      <p className="warning">
        증거가 부족하면 수사가 늦어질 수 있습니다.
        <br />
        아래 항목들을 먼저 준비해주세요.
      </p>

      {ITEMS.map((item, idx) => (
        <ChecklistItem
          key={idx}
          {...item}
          checked={checked[idx]}
          onClick={() => onToggle(idx)}
        />
      ))}
    </div>
  );
}
