import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CommunService from "./../../services/CommunService";

interface ComboProps {
    getOptionLabel:any
    style?:any
    label:string
    id?:string
    url:string
    onChange?:any;
    value?:any;
    fullWidth:true|undefined

}

interface ComboState {
  items:any[];
  value:any;
  
}

export default class RemoteCombobox extends React.Component<ComboProps, ComboState>{

    state!: ComboState;
    service!:CommunService;
    

    constructor(props: ComboProps, mstate: ComboState) {
        super(props,mstate);
        this.state = mstate;

    }

    componentWillMount(){
     this.service=new CommunService(this.props.url);
     this.service.processGetAll().then(resp =>{
        this.setState({items:resp.data});
     });
     
    }

    handleChange(value:any){
        if(this.props.onChange){
            this.props.onChange(value) ;
        }
        //this.setState({value:value});
    
    }
    
    render() {
        return (
            <Autocomplete
              
                onChange={(event: any, newValue: any | null) => {
                   this.handleChange(newValue);
                  }}
                id={this.props.id}
                options={this.state.items}
                getOptionLabel={this.props.getOptionLabel}
                style={this.props.style}
                renderInput={(params) => <TextField fullWidth={this.props.fullWidth} {...params} label={this.props.label} variant="outlined"
                   />}
            />
        );
    }
}