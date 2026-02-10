import { useState } from "react";

import UploadHeader from "components/upload/UploadHeader";
import ImageUploader from "components/upload/ImageUploader";
import ImagePreview from "components/upload/ImagePreview";
import AnalysisGuide from "components/upload/AnalysisGuide";
import ActionButton from "components/common/ActionButton";

import useApi from "hook/useApi";
import { upload } from "api/analysis";

const Upload = () => {
  const [image, setImage] = useState(null);
  const { execute, loading } = useApi(upload);

  const handleAnalyze = async () => {
    if (!image) return;
    execute(image);
  };

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
        label={loading ? "분석 중..." : "분석 실행"}
        disabled={!image}
        onClick={handleAnalyze}
      />
    </div>
  );
};

export default Upload;
