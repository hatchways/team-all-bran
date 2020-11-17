import React, { useRef, useState } from 'react'
import { ControlledEditor } from '@monaco-editor/react';

const TextEditor = (props) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const codeText = useRef();

  function handleEditorDidMount(_codeText) {
    setIsEditorReady(true);
    codeText.current = _codeText;
  }

  const handleCodeChange = () => {
    props.handleCodeSnippetChange(codeText.current())
  }

  return (
    <ControlledEditor
      height="90vh"
      theme="dark"
      options={{ fontSize: 18 }}
      language="javascript"
      value={"// write your code here"}
      editorDidMount={handleEditorDidMount}
      onChange={handleCodeChange} />

  )
}

export default TextEditor
