import heart from "assets/img/ic_heart.svg";

export default function CalmNotice() {
  return (
    <div className="calm-notice">
      <img src={heart} alt="heart" className="icon" />
      <div className="text">
        <strong>많이 놀라셨죠? 당황하지 마세요.</strong>
        <p>
          지금부터 차근차근 준비하면 충분히 해결할 수 있습니다. 저희가 끝까지
          함께할게요.
        </p>
      </div>
    </div>
  );
}
