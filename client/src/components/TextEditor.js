import React, { useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';

const TextEditor = (
  {
    handleEndCall,
    handleAcceptCall,
    receivingCall,
    value,
    language,
    handleCodeSnippetChange,
    userVideo,
    partnerVideo,
    callAccepted
  }) => {
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
    <div>
      <div>
        <video playsInline muted ref={userVideo} autoPlay />
        <video playsInline muted ref={partnerVideo} autoPlay />
        {receivingCall ?
          <div>
            <h1>Tim Rines is calling you</h1>
            <button onClick={handleAcceptCall}>Accept</button>
          </div>
          :
          <div>
            <button onClick={handleEndCall}>End</button>
          </div>
        }
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default TextEditor;
