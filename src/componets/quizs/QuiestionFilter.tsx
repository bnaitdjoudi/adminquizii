import React from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CommunService from "../../services/CommunService";
import { URL_CATEGORY_Q } from "../../config/Urls";
import { connect } from "react-redux";
import { updateLibText, updateLibLevel, updateLibTags,updateLibLang } from "./../../actions";
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import loc from './../../locale/I18n';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog: {
            height: "100%"
        },
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
                height: "100%"
            },
        },
        form: {
            height: "100%"
        },
        grid: {
            height: "100%",

        },
        paper: {
            height: "100%",
            padding: "5px",
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },

        inputpaper: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: "100%",
          },

    }),
);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function QuiestionFilter(props: any) {
    const classes = useStyles();


    const service: CommunService = new CommunService(URL_CATEGORY_Q);
    const [text,setText] = React.useState<string>("");
    const [options, setOptions] = React.useState<any[]>([]);
    React.useEffect(() => {
        service.processGetAll().then((resp) => {
            setOptions(resp.data);
        })
    }, []);

    const onSearchClick = (event:any) =>{
        props.dispatch(updateLibText({ text:text }));
    }
    return (<React.Fragment>
        <div className={classes.paper} >


            <div style={{ padding: "15px" }}>

                <FormControl component="fieldset" style={{width:"100%"}}>

                <Paper component="form" className={classes.inputpaper}>

                    <InputBase
                        className={classes.input}
                        placeholder={loc("search")}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange = {(event:any) =>{
                          setText(event.target.value);
                        }}
                    />
                    <Button  variant="contained" color="primary" 
                    className={classes.iconButton} aria-label="search"
                    onClick={onSearchClick} >
                        <SearchIcon />
                    </Button>
                    </Paper>

                </FormControl>
            </div>
            <div style={{ padding: "15px" }}>
                <FormControl component="fieldset" >
                    <FormLabel component="legend" color="primary">{loc("librarie.table.lang")}:</FormLabel>
                    <RadioGroup value={props.level} row aria-label="gender" name="gender1" onChange={(event: any) => {
                        props.dispatch(updateLibLevel({ level: event.target.value }));

                    }}>
                        <FormControlLabel value="begin" control={<Radio />} label={loc("begin")} />
                        <FormControlLabel value="interm" control={<Radio />} label={loc("interm")} />
                        <FormControlLabel value="senior" control={<Radio />} label={loc("senior")} />
                        <FormControlLabel value="expert" control={<Radio />} label={loc("expert")} />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{ padding: "15px" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" color="primary">{loc("librarie.table.lang")}:</FormLabel>
                    <RadioGroup row value={props.lang} aria-label="lang" name="lang" onChange={(event: any) => {
                        props.dispatch(updateLibLang({ lang: event.target.value }));

                    }}>
                        <FormControlLabel value="gb" control={<Radio />} label={loc("gb")} />
                        <FormControlLabel value="fr" control={<Radio />} label={loc("fr")} />
                        <FormControlLabel value="sp" control={<Radio />} label={loc("sp")} />
                        <FormControlLabel value="ge" control={<Radio />} label={loc("ge")} />
                    </RadioGroup>
                </FormControl>
            </div>

            <FormControl component="fieldset" style={{ width: "100%", padding: "20px 0px", }}>
                <FormLabel component="legend" color="primary">{loc("categories")}:</FormLabel>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={options}
                    disableCloseOnSelect
                    defaultValue={props.tags}
                    getOptionLabel={(option) => option.categorieDesignation}
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.categorieDesignation}
                        </React.Fragment>
                    )}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" placeholder={loc("categories")} />
                    )}

                    onChange={(event: object, value: any | any[], reason: string) => {
                        props.dispatch(updateLibTags({tags:value}));

                    }}
                />
            </FormControl>
        </div></React.Fragment>);
}

const mapStateToProps = (state: any) => ({
    text: state.librarie.text,
    level: state.librarie.level,
    tags:state.librarie.tags,
    lang:state.librarie.lang

});

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (action: any) => { dispatch(action) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuiestionFilter);