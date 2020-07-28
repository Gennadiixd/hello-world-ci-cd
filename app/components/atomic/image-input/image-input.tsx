import React from "react";

export default function ImageInput({ label, id, name, fieldRef }) {
  return (
    <div className="image__input input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        name={name}
        ref={fieldRef}
        accept="image/gif, image/jpeg, image/png"
        required
      />
    </div>
  );
}
