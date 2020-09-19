import React, { useMemo } from "react";

export default function TextInput({
  label = "",
  id,
  name,
  fieldRef,
  textArea,
  placeholder = "",
}) {
  const inputSection = useMemo(
    () =>
      textArea ? (
        <textarea
          id={id}
          name={name}
          ref={fieldRef}
          required
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type="text"
          name={name}
          ref={fieldRef}
          required
          placeholder={placeholder}
        />
      ),
    [textArea]
  );

  return (
    <div className="text__input--container input">
      {label && (
        <div className="text__input--label">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="text__input--input">{inputSection}</div>
    </div>
  );
}

TextInput.defaultProps = {
  textArea: false,
};
