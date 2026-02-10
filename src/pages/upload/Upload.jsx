import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalysisStore } from "store/analysisStore";

import UploadHeader from "components/upload/UploadHeader";
import ImageUploader from "components/upload/ImageUploader";
import ImagePreview from "components/upload/ImagePreview";
import AnalysisGuide from "components/upload/AnalysisGuide";
import ActionButton from "components/common/ActionButton";

import useApi from "hook/useApi";
import { upload } from "api/analysis";

const Upload = () => {
  const [image, setImage] = useState(null);
  const { execute } = useApi(upload);
  const { start, success } = useAnalysisStore();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!image) return;

    start();
    execute(image).then(success);

    navigate("/identify");
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
        label={"분석 실행"}
        disabled={!image}
        onClick={handleAnalyze}
      />
    </div>
  );
};

export default Upload;
