import delele from "assets/img/ic_delete.svg";

export default function TransferItem({ index, data, onDelete, onChange }) {
  return (
    <div className="transfer-item">
      <div className="title">
        <span className="label">송금 내역 #{index}</span>
        <img src={delele} alt="delete" className="icon" onClick={onDelete} />
      </div>

      <input
        type="datetime-local"
        value={data.datetime}
        onChange={(e) => onChange("datetime", e.target.value)}
      />

      <input
        type="text"
        placeholder="수취인 이름"
        value={data.receiver}
        onChange={(e) => onChange("receiver", e.target.value)}
      />

      <div className="row">
        <input
          type="text"
          placeholder="은행명"
          value={data.bank}
          onChange={(e) => onChange("bank", e.target.value)}
        />

        <input
          type="number"
          placeholder="금액"
          value={data.amount}
          onChange={(e) => onChange("amount", e.target.value)}
        />
      </div>
    </div>
  );
}
