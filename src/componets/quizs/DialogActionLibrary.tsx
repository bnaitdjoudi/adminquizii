import React from "react";
import { Button} from "@material-ui/core";
import { connect } from "react-redux";
import loc from "./../../locale/I18n";



const mapStateToProps = (state: any) => ({
    novalide:state.librarie.novalide
   
});

const mapDispatchToProps = (dispatch: any) =>
 {
    return { dispatch: (action: any) => { dispatch(action) } }
};



function DialogActionLibrary(props: any) {
    
    return (<div>
        <Button color="secondary" variant="contained" onClick={props.handleCloseLibrairie}>{loc("close")}</Button>
        <Button color="primary" variant="contained"  disabled={props.novalide} onClick={props.handlValidation}>{loc("validate")}</Button>
      </div>)
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogActionLibrary);
