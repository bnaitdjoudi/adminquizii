import React from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CommunService from "./../../services/CommunService";
import { URL_CATEGORY_Q } from "./../../config/Urls";
import { connect } from "react-redux";
import {
    updateTitleQuestion,
    updateDescriptionQuestion,
    updateTimeQuestion,
    updateScoreQuestion,
    updateTagsQuestion,
    updateLevelQuestion,
    updateLangQuestion,
} from "./../../actions";
import loc from "./../../locale/I18n";

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
        }


    }),
);

interface QuestionsProps {
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onLevelChange: (value: string) => void;
    onLongChange: (value: string) => void;
    onCategoriesChange: (value: any[]) => void;
    onScoreChange: (value: number) => void;
    onTimeChange: (value: number) => void;

}




const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function StepQF1(props: any) {
    const classes = useStyles();
    
    const [options, setOptions] = React.useState<any[]>([]);
    
    React.useEffect(() => {
        let service: CommunService = new CommunService(URL_CATEGORY_Q);
        service.processGetAll().then((resp) => {
            setOptions(resp.data);
        })
    }, []);



   

    const handleEditorChange = (content: any, editor: any) => {
        //console.log('Content was updated:', content);
       
        props.dispatch(updateDescriptionQuestion({ text: content }));
    }

    return (
        <div id="questionform" className={classes.form}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={8} className={classes.grid}>
                    <Paper className={classes.paper}>

                        <div style={{ width: "100%", padding: "5px 30px" }}>
                            <TextField defaultValue={props.title} id="standard-basic" label={loc("main.titleb")} fullWidth
                                onChange={(event: any) => {

                                    
                                    props.dispatch(updateTitleQuestion({ text: event.target.value }))
                                }} required />
                            <div style={{ margin: "15px 0px" }}>
                                <label >{loc("main.description")}:</label>
                            </div>
                            <Editor
                                apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"
                                initialValue={props.description}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code codesample fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        `undo redo | formatselect | bold italic backcolor | 
                                         alignleft aligncenter alignright alignjustify | 
                                         bullist numlist outdent indent | removeformat | codesample | help`
                                }}
                                onEditorChange={handleEditorChange}

                            />

                        </div>
                    </Paper>
                </Grid>
                {

                }
                <Grid item xs={4}>
                    <Paper className={classes.paper} >

                        <div style={{ padding: "15px" }}>
                            <FormControl component="fieldset" >

                                <TextField id="time" label={loc("main.timein")} fullWidth
                                    type="number"
                                    defaultValue={props.time}
                                    onChange={(event: any) => {
                                       
                                        props.dispatch(updateTimeQuestion({ time: event.target.value }));

                                    }} required />

                            </FormControl>
                            <FormControl component="fieldset" >

                                <TextField id="score" label={loc("librarie.table.score")} fullWidth
                                    type="number"
                                    defaultValue={props.score}
                                    onChange={(event: any) => {
                                        
                                        props.dispatch(updateScoreQuestion({ score: event.target.value }));

                                    }} />

                            </FormControl>
                        </div>

                        <div style={{ padding: "15px" }}>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend" color="primary">{loc("librarie.table.level")}:</FormLabel>
                                <RadioGroup defaultValue={props.level} row aria-label="gender" name="gender1" onChange={(event: any) => {
                                   
                                    props.dispatch(updateLevelQuestion({ level: event.target.value }));
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
                                <RadioGroup row defaultValue={props.lang} aria-label="lang" name="lang" onChange={(event: any) => {
                                   
                                    props.dispatch(updateLangQuestion({ lang: event.target.value }));
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
                                   
                                    props.dispatch(updateTagsQuestion({ tags: value }));
                                }}
                            />
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );

}

const mapStateToProps = (state: any) => ({
    title: state.root.titleQuestion,
    description: state.root.descriptionQuestion,
    time: state.root.time,
    score: state.root.score,
    level: state.root.level,
    lang: state.root.lang,
    tags: state.root.tags
});

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (action: any) => { dispatch(action) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(StepQF1);