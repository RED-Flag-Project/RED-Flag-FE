export default function ActionButton({
  label,
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`primary-action ${className} ${variant} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      {label}
    </button>
  );
}
