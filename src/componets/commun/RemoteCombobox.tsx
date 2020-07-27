
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from "./../../userstuff/Authaurization";
import axios from "axios";



interface RemoteComboProps {
    url: string
    required?: boolean;
    onSelectedChange?:(newValue:any)=> void;
    value:any;
    label:string;
    
    
}

export default function RemoteCombobox(props: RemoteComboProps,ref:any) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const loading = open && options.length === 0;
    const [fieldValue, setFieldValue] = React.useState<string>("");
    

    //const memoizedValue = React.useMemo(() => {}, [fieldValue]);
    React.useEffect(() => {
        let active = true;
        
        

        (async () => {
            axios.post(props.url,{like:fieldValue},{ headers: auth.authHeader() }).then(
                resp =>{
                    console.log("service");
                    const countries =  resp.data;

                    if (active) {
                        setOptions(countries);
                    }

                
                }
            ); 
            
            
        })();

        return () => {
            active = false;
        };
    }, [fieldValue,props.url]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            
            autoComplete
            value={props.value}
            id="asynchronous-demo"
            style={{ width: 414 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.compagnRef === value.compagnRef}
            getOptionLabel={(option) =>  option.title?option.title+"["+option.compagnRef+"]":""}
            options={options}
            loading={loading}
            onInputChange={(event, newInputValue) => {
                setFieldValue(newInputValue);
                console.log("value changed");
              }}
            onChange={(event:any, newValue:any) => {
                if(props.onSelectedChange){
                    props.onSelectedChange(newValue);
                }
                
              }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    
                    label={props.label}
                    variant="outlined"
                    required={props.required}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
