import { useMemo, useState, useCallback, useRef } from "react";
import useMount from "@/hooks/use-mount";

export default function EditableText({ content, className, onCommit, name }) {
  const [isEditMode, setEditMode] = useState(false);
  const inputRef = useRef(content);

  useMount(() => {
    inputRef.current.innerText = content;
  });

  const handleEdit = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const handleCommit = useCallback(() => {
    setEditMode(false);
    onCommit({ [name]: inputRef.current?.innerText });
  }, [isEditMode]);

  const handleCancel = useCallback(() => {
    setEditMode(false);
    inputRef.current.innerText = content;
  }, [isEditMode]);

  const onKeyDown = useCallback((e) => {
    if (isEditMode && e.keyCode === 13) {
      setEditMode(false);
    }
  }, []);

  const iconsSection = useMemo(
    () =>
      isEditMode ? (
        <div className="edit__icons--actions">
          <span onClick={handleCommit} className="edit__icons--icon">
            <i className="fas fa-check" />
          </span>
          <span onClick={handleCancel} className="edit__icons--icon">
            <i className="far fa-window-close" />
          </span>
        </div>
      ) : (
        <span onClick={handleEdit} className="edit__icons--icon">
          <i className="fas fa-edit" />
        </span>
      ),
    [isEditMode, handleEdit, handleCancel, handleCommit]
  );

  return (
    <div className={`${className} --editable ${isEditMode ? "--focus" : ""}`}>
      <div className="edit__icons">{iconsSection}</div>
      <div
        className="input"
        contentEditable={isEditMode}
        onKeyDown={onKeyDown}
        ref={inputRef}
        spellCheck={false}
      >
        {inputRef.current?.innerText}
      </div>
    </div>
  );
}
