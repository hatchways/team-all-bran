import React, { useRef, useState } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Dialog, DialogTitle, Typography, Avatar } from '@material-ui/core';
import { useStyles } from '../themes/theme';
import { CustomButton } from '../components/Buttons';
import Draggable from 'react-draggable';

const TextEditor = (
  {
    handleAcceptCall,
    receivingCall,
    value,
    language,
    handleCodeSnippetChange,
    userVideo,
    partnerVideo,
    partner
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
        <Draggable>
          <div className={classes.videoStreamContainer}>
            <video className={classes.videoChatBoxUser} playsInline ref={partnerVideo} autoPlay />
            <video className={classes.videoChatBoxPartner} playsInline muted ref={userVideo} autoPlay />
          </div>
        </Draggable>
      </div>
      {receivingCall &&
        <Dialog
          onClose={handleClose}
          aria-labelledby='receiving-call'
          open={open}
        >
          <div className={classes.receivingCallDialog}>
            <DialogTitle
              id='receiving-from'
            >
              <Typography className={classes.receivingCallText}>
                Receiving call from:
                </Typography>
              <div className={classes.receivingCallNameAndAvatar}>
                <Avatar
                  className={classes.waitingRoomAvatar}
                  alt='Avatar'
                  src={partner.profilePicture}
                />
                <Typography className={classes.videoCallerName}>{`${partner.firstName} ${partner.lastName}`}</Typography>
              </div>
            </DialogTitle>
            <CustomButton
              onClick={handleAcceptCall}
              classField={classes.acceptCancelVideoButton}
              text='ACCEPT'
            />
            <CustomButton
              onClick={() => setOpen(false)}
              classField={classes.acceptCancelVideoButton}
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
