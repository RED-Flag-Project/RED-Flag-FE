import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadHeader from "components/upload/UploadHeader";
import ImageUploader from "components/upload/ImageUploader";
import ImagePreview from "components/upload/ImagePreview";
import AnalysisGuide from "components/upload/AnalysisGuide";
import ActionButton from "components/common/ActionButton";

const Upload = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="Upload-wrap">
      <UploadHeader />

      {!image ? (
        <ImageUploader onUpload={setImage} />
      ) : (
        <ImagePreview image={image} onRemove={() => setImage(null)} />
      )}

      <AnalysisGuide />
      <ActionButton
        label={"분석 실행"}
        disabled={!image}
        onClick={() => {
          navigate("/identify");
        }}
      />
    </div>
  );
};

export default Upload;
