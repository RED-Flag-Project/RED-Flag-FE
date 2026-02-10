import gallery from "assets/img/ic_gallery.svg";

export default function ImageUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <label className="image-uploader">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
      <div className="uploader-content">
        <img src={gallery} alt="gallery" className="icon" />
        <p>이미지 파일을 선택하세요</p>
        <span>JPG, PNG 파일을 지원해요</span>
      </div>
    </label>
  );
}
