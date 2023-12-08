import React, { useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import "./editorStyles.css";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
const Quill = ReactQuill.Quill;

Quill.register("modules/imageResize", ImageResize);

export const Editor = ({ onChange, title }) => {
  const [isEditorLoaded, setEditorLoaded] = useState(false);

  const fonts = useMemo(
    () => [
      "Roboto",
      "Raleway",
      "Montserrat",
      "Lato",
      "Rubik",
      "Agbalumo",
      "Ubuntu",
    ],
    [],
  );

  const sizes = useMemo(
    () => [
      "10px",
      "12px",
      "14px",
      "16px",
      "18px",
      "20px",
      "22px",
      "24px",
      "26px",
      "28px",
      "30px",
      "32px",
      "34px",
      "36px",
      "38px",
      "40px",
      "42px",
      "44px",
    ],
    [],
  );

  useEffect(() => {
    if (!isEditorLoaded) {
      // Load the editor when it's not already loaded
      var Font = Quill.import("formats/font");
      Font.whitelist = fonts;
      Quill.register(Font, true);

      var Size = Quill.import("attributors/style/size");
      Size.whitelist = sizes;
      Quill.register(Size, true);

      // Set the editor as loaded
      setEditorLoaded(true);
    }
  }, [isEditorLoaded, fonts, sizes]);

  var modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: fonts }, { size: sizes }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: ["", "center", "right", "justify"] },
        { list: "ordered" },
        { list: "bullet" },
      ],
      ["link"],
      //   ["link", "image"],
      [{ indent: "-1" }, { indent: "+1" }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
        {
          background: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "background",
    "bullet",
    "indent",
    "link",
    // "image",
    "align",
    "size",
    "font",
  ];

  return (
    <div>
      <div style={{ display: "grid", justifyContent: "start" }}>
        <label class="form-label">{title}</label>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          onChange={onChange}
          style={{ height: "300px" }}
        ></ReactQuill>
      </div>
    </div>
  );
};
