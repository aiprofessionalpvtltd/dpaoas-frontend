import React, { useRef, lazy, Suspense, useState } from "react";
import { Spinner } from "react-bootstrap";

const Editor = lazy(() => import("@tinymce/tinymce-react").then((module) => ({ default: module.Editor })));

export const TinyEditor = ({ initialContent, setEditorContent, editorContent, multiLanguage }) => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("ltr");
  const [key, setKey] = useState(0);

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setKey((prevKey) => prevKey + 1); // Update the key to force re-render
  };

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 150 }}>
            <Spinner />
          </div>
        )}

        {multiLanguage && (
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label">Change Language</label>
                <select class="form-select" onChange={handleTypeChange}>
                  <option selected disabled>
                    Select
                  </option>
                  <option value={"ltr"}>English</option>
                  <option value={"rtl"}>Urdu</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <Editor
          key={key}
          apiKey="y5p9wsp799q9f6p0eprndh9a4rwfjqz3rsxtpf1x6zp6elnc"
          onInit={() => setLoading(false)}
          initialValue={""} // type === "ltr" ? "<p>Hello there! Write something new</p>" : "سنو ذرا! کچھ نیا لکھیں۔"
          value={editorContent && editorContent}
          onEditorChange={(content) => setEditorContent(content)}
          init={{
            height: 500,
            menubar: true,
            branding: false,
            directionality: type,
            plugins: [
              "a11ychecker",
              "advlist",
              "advcode",
              "advtable",
              "autolink",
              "checklist",
              "export",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "powerpaste",
              "fullscreen",
              "formatpainter",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | fontfamily | fontsize | casechange blocks | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          }}
        />
      </Suspense>
    </>
  );
};
