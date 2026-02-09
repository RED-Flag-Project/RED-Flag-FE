export default function ImagePreview({ image, onRemove }) {
  return (
    <>
      <div className="image-preview">
        <img src={URL.createObjectURL(image)} alt="preview" />
        <button className="remove" onClick={onRemove}>
          ✕
        </button>
      </div>
      <div className="filename">
        <p>선택된 파일: {image.name}</p>
      </div>
    </>
  );
}
