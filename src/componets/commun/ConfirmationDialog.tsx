import React from "react";
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import loc from "./../../locale/I18n";



interface ConfirmationDialogProp{
    message:string;
    onconfirm:(param:void|any)=> void;
    oncancel:(param:void)=> void;
    openConfirmation:boolean;
} 

export default function ConfirmationDialog(props:ConfirmationDialogProp){

    
    
    const radioGroupRef = React.useRef<HTMLElement>(null);
    
 
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
  
    const handleCancel = () => {
      props.oncancel();
    };
  
    const handleOk = () => {
     props.onconfirm("");
    };
  
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xl"
        onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={props.openConfirmation}
       
      >
        <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
        <DialogContent >
        <Alert severity="warning">{loc(props.message)}</Alert>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );

}