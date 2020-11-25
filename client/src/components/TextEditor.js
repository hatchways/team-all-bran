import React, { useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';

const TextEditor = ({ value, language, handleCodeSnippetChange }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const codeText = useRef();

  function handleEditorDidMount(_codeText) {
    setIsEditorReady(true);
    codeText.current = _codeText;
  }

  const handleCodeChange = (ev, value) => {
    console.log(value);
    handleCodeSnippetChange(value);
  };

  const displayDefaultText = () => {
    if (language === 'javascript') {
      return '//write your code here';
    } else if (language === 'python') {
      return '# write your code here';
    }
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
