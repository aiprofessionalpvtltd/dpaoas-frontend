import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './editorStyles.css';

export const Jodit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  // Use a function to return the config object in useMemo
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Start typing...',
    toolbar: true,
    toolbarSticky: false, // If true, toolbar will be sticky
    toolbarAdaptive: true, // Adapts toolbar items based on editor width
    toolbarButtonSize: 'middle', // Options: 'small', 'middle', 'large'
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'image',
      'table',
      'link',
      '|',
      'align',
      '|',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'source',
    ],
    buttonsXS: [
      'bold',
      'italic',
      'underline',
      '|',
      'eraser',
      '|',
      'source'
    ],
  }), [placeholder]); // Depend on placeholder to re-render when it changes

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => setContent(newContent)} // Update content on blur
      onChange={newContent => { }} // Handle change here if needed
    />
  );
};