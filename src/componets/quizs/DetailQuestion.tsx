import React from "react";
import CommunService from "./../../services/CommunService";
import { Dialog, DialogContent, DialogTitle, Grid, Radio, DialogActions, Button } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { URL_QUESTION } from "./../../config/Urls"
import LabelPropertie from "../commun/LabelPropertie";
import { Editor } from '@tinymce/tinymce-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import loc from "../../locale/I18n";
import { connect } from "react-redux";
import { performQuestion } from "./../../actions"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        gridmain: {
            padding: "10px 5px",
        }


    }),
);

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (action: any) => { dispatch(action) } }
  };
  

function DetailQuestion(props: any) {
    
    let history = useHistory();
    const classes = useStyles();
    const resps: any[] = ["A", "B", "C", "D", "E", "F"];
    const service = new CommunService(URL_QUESTION);
    
    const [open, setOpen] = React.useState<boolean>(false);
    const [openWait, setOpenWait] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>();
    const [statement, setStatement] = React.useState();
    const [score, setScore] = React.useState<number>();
    const [time, setTime] = React.useState<number>();
    const [lang, setLang] = React.useState<string>();
    const [level, setLevel] = React.useState<string>();
    const [tags, setTags] = React.useState<string[]>([]);
    const [responses, setResponses] = React.useState<any[]>([]);
    const [multi, setMulti] = React.useState<boolean>(false);
    

    React.useEffect(() => {
        if (props.qid) {
            
            setOpenWait(true);
            service.processGetOne(props.qid).then(resp => {

                setTitle(resp.data.title);
                setStatement(resp.data.statement);
                setScore(resp.data.totalPoint)
                setTime(resp.data.time);
                setLang(resp.data.lang?resp.data.lang:"-");
                setLevel(resp.data.level?resp.data.level:"-");
                let tag: string[] = [];
                resp.data.categorieQuestionList.forEach((value: any) => {
                    tag = [...tag, value.categorieDesignation]
                })
                setTags(tag);
                setResponses(resp.data.responses);
                setMulti(resp.data.multiple);

            }).finally(() => {
                setOpenWait(false);
                setOpen(true);
            });


        } else {

        }
    }, [props.qid,service]);



    const handlClose = () =>{
        setOpen(false);
        props.afterCloseHandler();
    }
    
    const editQuestion = (qid: number) => {
        const service: CommunService = new CommunService(URL_QUESTION);
        setOpenWait(true);
        service.processGetOne(qid).finally(() => {
          setOpenWait(false);
        }).then(resp => {
          let resps: boolean[] = [];
          let reponsesText = { "A": "", "B": "", "C": "", "D": "", "E": "", "F": "" };
    
          const question: any = resp.data;
          question.responses.forEach((value: any, index: any) => {
            resps = [...resps, value.valide]
          });
    
          question.responses.forEach((value: any, index: any) => {
    
            switch (index) {
              case 0: {
                reponsesText = { ...reponsesText, "A": value.content };
                break;
              }
              case 1: {
                reponsesText = { ...reponsesText, "B": value.content };
                break;
              }
              case 2: {
                reponsesText = { ...reponsesText, "C": value.content };
                break;
              }
              case 3: {
                reponsesText = { ...reponsesText, "D": value.content };
                break;
              }
              case 4: {
                reponsesText = { ...reponsesText, "E": value.content };
                break;
              }
              case 5: {
                reponsesText = { ...reponsesText, "F": value.content };
                break;
              }
            }
    
    
          });
    
    
          const playload: any = {
    
            resps: resps,
            reponsesText: reponsesText,
            multi: question.multiple,
            title: question.title,
            description: question.statement,
            time: question.time,
            score: question.totalPoint,
            level: question.level,
            lang: question.lang,
            tags: question.categorieQuestionList
          };
    
          props.dispatch(performQuestion(playload));
          history.push("/tests/" + question.test.id + "/question/" + qid + "/update");
    
        })
      }

    const responseLabel = loc("main.response");

    return (
        <React.Fragment>
            <Dialog open={open} fullWidth >
            
                
            <DialogTitle>Details Question
                
            </DialogTitle>
                
                
                <DialogContent>
                    <Grid container xs={"auto"} >
                        <Grid item xs={12}>
                            <div>

                                <Grid container xs={"auto"}>
                                    <Grid item xs={6}>
                                        <LabelPropertie label={loc("main.title")} value={title} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LabelPropertie label={loc("librarie.table.score")} value={"" + score} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LabelPropertie label={loc("librarie.table.time")} value={"" + time + " mins"} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LabelPropertie label={loc("librarie.table.lang")} value={"" + (lang!=="-" ? loc(lang) : lang)} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LabelPropertie label={loc("librarie.table.level")} value={"" + (lang!=="-" ? loc(level) : lang)} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LabelPropertie label="Tags" value={tags} />
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridmain}>
                                        <LabelPropertie label={loc("main.description")} value="" />
                                        <Editor
                                            apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"
                                            initialValue={statement}
                                            inline
                                            disabled={true}
                                            init={{
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code codesample fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                            }}
                                            toolbar='false'
                                        />
                                    </Grid>
                                </Grid>



                                <Grid container xs={"auto"} spacing={2} className={classes.gridmain}>
                                    <Grid item xs={12} >
                                        <FormControlLabel  control={<Radio color="primary" readOnly={true} checked={multi} />} label={loc("main.multichoise")} />
                                    </Grid>

                                    {
                                        responses.map((row, index) => {
                                            return (<Grid item xs={6}>
                                                <div>
                                                    <Radio color="primary" readOnly={true} checked={row.valide} />
                                                    <span style={{ padding: "10px 0px" }}>{responseLabel+": " + resps[index]}</span>

                                                </div>

                                                <Editor
                                                    apiKey="fxtxhvf1cdbturnhc05upkvhcqeg6lq96nossno86lpwyl0u"

                                                    initialValue={row.content}
                                                    disabled={true}
                                                    inline
                                                    init={{
                                                        height: 150,
                                                        menubar: false,
                                                        plugins: [
                                                            'advlist autolink lists link image charmap print preview anchor',
                                                            'searchreplace visualblocks code codesample fullscreen',
                                                            'insertdatetime media table paste code help wordcount'
                                                        ],


                                                    }}
                                                    toolbar='false'
                                                />
                                            </Grid>)
                                        })
                                    }
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button color="primary" variant="contained" onClick={(event:any)=>{
                    handlClose();
                    editQuestion(props.qid);
                }}>{loc("edit")}</Button>
                                <Button color="secondary" variant="contained" onClick={handlClose}>{loc("close")}</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={openWait} className={classes.backdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>);
}


export default connect(null, mapDispatchToProps)(DetailQuestion)
