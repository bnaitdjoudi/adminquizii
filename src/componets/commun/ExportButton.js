import React from 'react';
import ReactToPdf from "react-to-pdf";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
export default function ExportButton(props){

    return (<div>
        <ReactToPdf targetRef={props.target} filename="div-blue.pdf"  >
        {({ toPdf }) => (
            <IconButton onClick={toPdf}>
                <PictureAsPdfIcon />
            </IconButton>
        )}
    </ReactToPdf>
        </div>)
}