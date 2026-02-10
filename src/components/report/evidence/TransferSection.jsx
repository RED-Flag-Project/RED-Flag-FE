import TransferItem from "./TransferItem";
import card from "assets/img/ic_card.svg";
import { createTransferItem } from "utils/formFactory";

export default function TransferSection({ transfers, setTransfers }) {
  const addItem = () => setTransfers([...transfers, createTransferItem()]);
  const removeItem = (id) =>
    setTransfers(transfers.filter((item) => item.id !== id));
  const updateItem = (id, field, value) =>
    setTransfers(
      transfers.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  return (
    <section className="section">
      <div className="section-header">
        <div className="header">
          <img src={card} alt="card" className="icon" />
          <h3 className="title">송금 정보 관리</h3>
        </div>
        <button className="add-btn" onClick={addItem}>
          + 추가
        </button>
      </div>

      {transfers.map((item, index) => (
        <TransferItem
          key={item.id}
          index={transfers.length - index}
          data={item}
          onDelete={() => removeItem(item.id)}
          onChange={(field, value) => updateItem(item.id, field, value)}
        />
      ))}
    </section>
  );
}
