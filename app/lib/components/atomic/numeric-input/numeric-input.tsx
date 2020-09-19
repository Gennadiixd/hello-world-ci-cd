export default function NumericInput({
  label = "",
  id,
  name,
  fieldRef,
  min = 0,
  max = Infinity,
}) {
  const labelSection = label && (
    <div className="text__input--label">
      <label htmlFor={id}>{label}</label>
    </div>
  );

  return (
    <div className="text__input--container input">
      {labelSection}
      <div className="text__input--input">
        <input
          id={id}
          type="number"
          name={name}
          ref={fieldRef}
          required
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
