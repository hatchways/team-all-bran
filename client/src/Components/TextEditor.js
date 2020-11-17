import React from 'react'
import Editor from '@monaco-editor/react';
const TextEditor = () => {
  return (
    <Editor height="90vh" theme="dark" options={{ fontSize: 18 }} language="javascript" />
  )
}

export default TextEditor
