export const createTimelineItem = () => ({
  id: crypto.randomUUID(),
  time: "",
  text: "",
});

export const createTransferItem = () => ({
  id: crypto.randomUUID(),
  datetime: "",
  receiver: "",
  bank: "",
  amount: "",
});
