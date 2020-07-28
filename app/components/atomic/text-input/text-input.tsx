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
    <div className="text__input input">
      <label htmlFor={id}>{label}</label>
      {inputSection}
    </div>
  );
}

TextInput.defaultProps = {
  textArea: false,
};
