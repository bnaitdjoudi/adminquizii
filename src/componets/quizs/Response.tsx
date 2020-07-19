import React from "react";
import { Paper, Switch, FormControlLabel } from "@material-ui/core";
import Title from "../Title";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from "react-redux";
import { updateExpt,updateResponseText } from "./../../actions";
import loc from "./../../locale/I18n";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            height: "100%",
            with: "100%",
            padding: "5px",
            backgroundColor:"#fbfbfb"
        },
    }),
);


const mapStateToProps = (state: any) => ({
    resps: state.root.resps,
    dd: state.root.accc,
    reponsesText:state.root.reponsesText
});

const mapDispatchToProps = (dispatch: any) =>
 {
    return { dispatch: (action: any) => { dispatch(action) } }
};



function Response(props: any) {
    const classes = useStyles();


  
    return (
        <div className={classes.root}>
            <Title>{props.title}</Title>
            <div>
                <FormControlLabel
                    control={
                        <Switch color="primary" checked={props.resps[props.index - 1]} inputProps={{ 'aria-label': 'primary checkbox' }} onChange={(event: any, checked: boolean) => {
                            props.dispatch(updateExpt({ index: props.index }));
                        }} />}
                    label={loc("main.iscorrect")}
                /></div>
            <Editor
                apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"
                initialValue={props.reponsesText[props.resp]}
                onEditorChange={(content: any, editor: any) => {
                    props.onResponseEditChange(content);
                    props.dispatch(updateResponseText({ text: ""+content,response:props.resp }));
                }}
                init={{
                    height: 150,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code codesample fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                                         alignleft aligncenter alignright alignjustify | \
                                         bullist numlist outdent indent | removeformat | codesample | help'
                }}
                              

            />
        </div>)
}


export default connect(mapStateToProps, mapDispatchToProps)(Response);
