import React, { useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { CustomButton } from '../components/Buttons';

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
    callAccepted,
    partnerName
  }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const editorRef = useRef();

  function handleEditorDidMount(e, editor) {
    setIsEditorReady(true);
    editorRef.current = editor;
  }

  const handleCodeChange = (_, value) => {
    handleCodeSnippetChange(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.videoChatMainContainer}>
        <div className={classes.videoStreamContainer}>
          <video className={classes.videoChatBoxUser} playsInline muted ref={userVideo} autoPlay />
          <video className={classes.videoChatBoxPartner} playsInline muted ref={partnerVideo} autoPlay />
        </div>
      </div>
      {receivingCall &&
        <Dialog
          onClose={handleClose}
          aria-labelledby='receiving-call'
          open={open}
        >
          <div className={classes.createInterviewDialog}>
            <DialogTitle
              id='receiving-from'
            >
              {`Receiving call from ${partnerName}`}
            </DialogTitle>
            <CustomButton
              onClick={handleAcceptCall}
              classField={classes.startDashboardButton}
              text='ACCEPT'
            />
            <CustomButton
              onClick={() => setOpen(false)}
              classField={classes.startDashboardButton}
              text='CANCEL'
            />
          </div>
        </Dialog>}
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
