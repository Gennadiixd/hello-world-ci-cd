import { useMemo, useState, useCallback, useRef } from "react";
import useMount from "@/lib/hooks/use-mount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

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
        <>
          <span onClick={handleCommit} className="edit__icons--icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span onClick={handleCancel} className="edit__icons--icon">
            <FontAwesomeIcon icon={faWindowClose} />
          </span>
        </>
      ) : (
        <span onClick={handleEdit} className="edit__icons--icon">
          <FontAwesomeIcon icon={faEdit} />
        </span>
      ),
    [isEditMode, handleEdit, handleCancel, handleCommit]
  );

  return (
    <div className={`${className} editable${isEditMode ? "--focus" : ""}`}>
      <div className="edit__icons--actions">
        <div className="edit__icons">{iconsSection}</div>
      </div>
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
