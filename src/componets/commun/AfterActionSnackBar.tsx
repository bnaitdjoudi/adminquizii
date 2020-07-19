import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import loc from "./../../locale/I18n";
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ActionSnackbarProps {
    open: boolean;
    handleClose?: any;
    autoHideDuration?: number | 1000;
    severity:"success" | "info" | "warning" | "error" | undefined;
}
export default function AfterActionSnackBar(props: ActionSnackbarProps) {

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            if(props.handleClose){
                props.handleClose();
            }
            return;
        }
        
        if(props.handleClose){
            props.handleClose();
        }
        
    };
    return (<Snackbar open={props.open} autoHideDuration={props.autoHideDuration?props.autoHideDuration:1000} onClose={handleClose}>
        <Alert severity={props.severity}>
            {loc("message."+props.severity)}
        </Alert>
    </Snackbar>)
}