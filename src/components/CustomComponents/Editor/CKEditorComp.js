import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClassicEditor, Bold, Essentials, Italic, Underline, Strikethrough, Alignment, Table, TableCellProperties, TableCellBackgroundColorCommand, TableProperties, TableToolbar, List, Link, BlockQuote, SpecialCharacters, CodeBlock, RemoveFormat, HorizontalLine, PageBreak, Mention, Paragraph, Undo, FontColor, FontSize, FontFamily, FontBackgroundColor, Heading } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

export const CKEditorComp = ({ onChange, value, disabled }) => {
  return (
    <div className="ckeditor-container">
      <CKEditor
        disabled={disabled ? disabled : false}
        editor={ClassicEditor}
        config={{
            plugins: [
                Bold, Essentials, Italic, Underline, Strikethrough, Alignment, Paragraph, Undo, FontColor, FontSize, FontFamily, FontBackgroundColor, Heading, Table, TableToolbar, TableProperties, TableCellProperties, List, Link, RemoveFormat
            ],
          toolbar: [
            'heading',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'list',
            '|',
            'indent',
            'outdent',
            '|',
            'link',
            'blockQuote',
            'insertTable',
            'specialCharacters',
            '|',
            'imageUpload',
            'mediaEmbed',
            'undo',
            'redo',
            'highlight',
            '|',
            'removeFormat',
            'codeBlock',
            'horizontalLine',
            'htmlEmbed',
            'pageBreak',
            '|',
            'table',
            'tableCellProperties',
          ],
          alignment: {
            options: ['left', 'center', 'right', 'justify']
          },
          link: {
            addTargetToExternalLinks: true, // Automatically adds target="_blank" to external links
            defaultProtocol: "http://",
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                defaultValue: true, // Default to open links in new tab
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }
            }
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableCellProperties',
              'tableProperties'
            ],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'imageStyle:full',
              'imageStyle:side',
              '|',
              'resizeImage'
            ]
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif'
            ],
            supportAllValues: true
          },
          fontSize: {
            options: [
              9,
              11,
              13,
              'default',
              17,
              19,
              21
            ],
            supportAllValues: true
          },
          fontColor: {
            columns: 5,
            documentColors: 10
          },
          fontBackgroundColor: {
            columns: 5,
            documentColors: 10
          },
          mediaEmbed: {
            previewsInData: true,
          },
        }}
        data={value ? value : ""}
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
        //   console.log({ event, editor, data });
          console.log(data);
          onChange(data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default CKEditorComp;