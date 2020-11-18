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

  const displayDefaultText = () => {
    if (props.language === 'javascript') {
      return "//write your code here"
    } else if (props.language === 'python') {
      return "# write your code here"
    }
  }

  return (
    <ControlledEditor
      height="90vh"
      theme="dark"
      options={{ fontSize: 18 }}
      language={props.language}
      value={displayDefaultText()}
      editorDidMount={handleEditorDidMount}
      onChange={handleCodeChange} />

  )
}

export default TextEditor
