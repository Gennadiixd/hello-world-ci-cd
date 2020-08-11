export default function Button({
  children,
  onClick,
  isActive = false,
  isDisabled = false,
  className
}) {
  return (
    <button
      onClick={onClick}
      className={`${className}${isActive ? "--active" : ""}`}
      disabled={isActive || isDisabled}
    >
      {children}
    </button>
  );
}
