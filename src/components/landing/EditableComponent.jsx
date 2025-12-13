"use client";

import ContentEditable from "react-contenteditable";

const EditableComponent = ({
  content,
  setContent,
  tagName = "div",
  className = "",
  style = {},
  disabled = false,
}) => {
  const handleChange = (e) => {
    const updatedHTML = e.target.value || e.target.innerHTML;
    setContent(updatedHTML);
  };

  return (
    <ContentEditable
      html={content || ""}
      onChange={handleChange}
      tagName={tagName}
      className={className}
      style={style}
      disabled={disabled}
    />
  );
};

export default EditableComponent;
