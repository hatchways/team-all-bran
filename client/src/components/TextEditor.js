import React, { useContext, useEffect, useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { store } from '../context/store';

const TextEditor = ({ value, language, handleCodeSnippetChange }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [position, setPosition] = useState({ lineNumber: 1, column: 0 });
  const editorRef = useRef();
  const {
    state: { socket },
  } = useContext(store);

  function handleEditorDidMount(e, editor) {
    setIsEditorReady(true);
    editorRef.current = editor;
  }

  // useEffect(() => {
  //   if (isEditorReady && editorRef.current) {
  //     editorRef.current.onDidChangeCursorPosition(
  //       ({ position: { lineNumber, column } }) => {
  //         // setPosition(e.position);
  //         console.log(lineNumber, column);
  //         socket.emit('new_cursor_position', { lineNumber, column });
  //         // setPosition({ lineNumber, column });
  //       }
  //     );
  //   }
  // }, [isEditorReady, editorRef, socket]);

  // useEffect(() => {
  //   if (isEditorReady && editorRef.current) {
  //     socket.on('updated_position', ({ lineNumber, column }) => {
  //       setPosition({ lineNumber, column });
  //     });
  //   }
  // }, [socket, isEditorReady, editorRef]);

  useEffect(() => {}, []);

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
