import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import loc from "./../../locale/I18n";
import { Grid, Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import CardContent from '@material-ui/core/CardContent';
import SondageOption from './SondageOption';
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

    grid: {
        minWidth: "800px"
    }
    ,
    avatar: {
        backgroundColor: red[500],
    },

    card: {
        height: 462
    },
    button: {
        margin: "12px auto",

    }
}));




export function SondageQuestionForm(props) {
    const classes = useStyles();

    const [options, setOptions] = React.useState([{ id: "option0", content: "" }, { id: "option1", content: "" }])
    const [title, setTile] = React.useState("");
    const [discription, setDescription] = React.useState("");
    const [valid, setValid] = React.useState(true);
    const [deleteSelect, setDeleteSelect] = React.useState([]);
    const handleEditorChange = (content, editor) => {
        
        setDescription(content);
        setValid(content.length >= 0);
        
    }


    React.useEffect(() => {
        if (props.edit) {
            if (props.question) {
                setOptions(props.question.options);
                setTile(props.question.title);
                setDescription(props.question.statement);
            }
        }
    }, [props]);




    const deleteOption = (optionId) => {

        var ops = options.filter((el) => {
            return el.id !== optionId;
        });

        var deleted = options.filter((el) => {
            return el.id === optionId;
        });

        if (deleted[0].map) {
            deleted = [...deleteSelect, deleted[0]];
            setDeleteSelect(deleted);
        }

        ops.forEach((el, ind) => {
            el.id = "option" + ind;

        });

        setOptions(ops);
    }

    const changeOption = (optionId, optionText) => {

        options.forEach((el, ind) => {

            if (el.id === optionId) {
                el.content = optionText;
            }
        });

        var ops = options.filter(() => {
            return true;
        });

        setOptions(ops);
    }

    const onSubmitQuestion = (event) => {
        event.preventDefault();
        var val = discription.length >= 1;

        if (props.onSubmit && val) {
            if (props.question) {
                props.onSubmit({ id: props.question.id, title: title, statement: discription, options: options, deletedOptions: deleteSelect })
            } else {
                props.onSubmit({ title: title, statement: discription, options: options })

            }

        }
        setValid(val);
    }

    const message = loc("message.questiondescription");
    const titleLabel = loc("main.title");
    const addLabel = loc("add");
    return (
        <form className={classes.root} id="question_form" onSubmit={onSubmitQuestion} >
            <Grid container xs={12} spacing={1} className={classes.grid}>
                <Grid item xs={4}>

                    <Card className={classes.card}>
                        <CardHeader


                            title="Question"
                            subheader=""

                        />
                        <CardContent>
                            <TextField
                                id="standard-password-input"
                                label={titleLabel}
                                type="text"
                                autoComplete="current-password"
                                name="title"
                                required={true}
                                value={title}
                                InputProps={{
                                    readOnly: !props.editQuestion,
                                  }}
                                fullWidth
                                onChange={(event, value) => {
                                    setTile(event.target.value);
                                }}

                            />

                            <div style={{ margin: "15px 0px" }}>
                                <label >{loc("main.description") + "*"}:</label>
                            </div>
                            <Editor
                                apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"
                                initialValue={discription}
                                required
                                disabled={!props.editQuestion}
                                
                                label={loc("main.description")}
                                init={{
                                    height: 230,
                                    readonly:true,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks   fullscreen',
                                        'insertdatetime media table paste  help wordcount'
                                    ],
                                    toolbar:
                                        `undo redo | formatselect | bold italic backcolor | 
                         alignleft aligncenter alignright alignjustify | 
                         bullist numlist outdent indent | removeformat | codesample | help`
                                }}
                                onEditorChange={handleEditorChange}


                            />
                            {!valid ?
                                <Alert severity="error">{message}</Alert>
                                : <div></div>}
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={8}>

                    <Card className={classes.card}>
                        <CardHeader
                            title="Options"
                            subheader=""
                        />
                        <CardContent>

                            {
                                options.map((val, ind) => {
                                    return <SondageOption
                                        optionId={val.id}
                                        ind={ind}
                                        canDelete={options.length > 2}
                                        onDelecte={deleteOption}
                                        onChangeOption={changeOption}
                                        value={val.content}
                                        readOnly={!props.editQuestion} />
                                })
                            }

                            {options.length <  6 && props.editQuestion ?
                                <Grid container alignItems="center">


                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        title={addLabel}
                                        className={classes.button}
                                        onClick={(event) => {
                                            var ind = options.length
                                            setOptions([...options, { id: "option" + ind, content: "" }]);
                                        }}
                                        startIcon={<AddCircleSharpIcon />}
                                    >
                                        {addLabel}
                                    </Button>
                                </Grid> : <div></div>
                            }
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </form>
    );
}

const mapStateToProps = (state) => ({
    editQuestion: state.sondage.edit
});

const mapDispatchToProps = (dispatch) => {
    return { dispatch: (action) => { dispatch(action) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(SondageQuestionForm)