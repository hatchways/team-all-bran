import React, { useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';

const TextEditor = ({ value, language, handleCodeSnippetChange }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const editorRef = useRef();

  function handleEditorDidMount(e, editor) {
    setIsEditorReady(true);
    editorRef.current = editor;
  }

  const handleCodeChange = (_, value) => {
    handleCodeSnippetChange(value);
  };

  return (
    <ControlledEditor
      height='90vh'
      theme='dark'
      options={{ fontSize: 18 }}
      language={language}
      value={value}
      editorDidMount={handleEditorDidMount}
      onChange={handleCodeChange}
      loading={'Loading...'}
    />
  );
};

export default TextEditor;
