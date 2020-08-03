import React, { useMemo } from "react";

export default function TextInput({ label, id, name, fieldRef, textArea }) {
  const inputSection = useMemo(
    () =>
      textArea ? (
        <textarea id={id} name={name} ref={fieldRef} required />
      ) : (
        <input id={id} type="text" name={name} ref={fieldRef} required />
      ),
    [textArea]
  );

  return (
    <div className="text__input--container input">
      <div className="text__input--label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="text__input--input">{inputSection}</div>
    </div>
  );
}

TextInput.defaultProps = {
  textArea: false,
};
