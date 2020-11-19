import React, { useRef, useState } from 'react'
import { ControlledEditor } from '@monaco-editor/react';

const TextEditor = ({ language, handleCodeSnippetChange }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const codeText = useRef();

  function handleEditorDidMount(_codeText) {
    setIsEditorReady(true);
    codeText.current = _codeText;
  }

  const handleCodeChange = () => {
    handleCodeSnippetChange(codeText.current())
  }

  const displayDefaultText = () => {
    if (language === 'javascript') {
      return "//write your code here"
    } else if (language === 'python') {
      return "# write your code here"
    }
  }

  return (
    <ControlledEditor
      height="90vh"
      theme="dark"
      options={{ fontSize: 18 }}
      language={language}
      value={displayDefaultText()}
      editorDidMount={handleEditorDidMount}
      onChange={handleCodeChange} />

  )
}

export default TextEditor;
