import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from "./../../userstuff/Authaurization";
import axios from "axios";


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
interface RemoteComboProps {
    url: string
    required?: boolean;
    onSelectedChange?:(newValue:any)=> void;
    value:any
    
}

export default function RemoteCombobox(props: RemoteComboProps,ref:any) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const loading = open && options.length === 0;
    const [fieldValue, setFieldValue] = React.useState<string>("");
    const [value,setValue] = React.useState();
    const updateOption = () => {        
            axios.post(props.url,{like:fieldValue},{ headers: auth.authHeader() }).then(resp=>{
                const datas = resp.data;
                setOptions(datas);
                setOpen(true);
            }); 

    }

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
    }, [fieldValue]);

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
            getOptionLabel={(option) => option.title+"["+option.compagnRef+"]"}
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
                    
                    label="Asynchronous"
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
