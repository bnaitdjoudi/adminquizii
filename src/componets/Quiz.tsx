import * as React from "react";
import MenuBar from "./MenuBar";
import SedgeTable from "./commun/SedgeTable";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { URL_TEST } from "../config/Urls";
import { Column } from 'material-table';
import { useHistory } from "react-router-dom";
import QuizForm from "./quizs/QuizForm";
import loc from "../locale/I18n";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const columns: Array<Column<any>> = [
  { title: "Title", field: "title" },
  { title: "CD", field: "createDate" },
  { title: "Comapgn", field: "compagn.title" },
]




 function SimpleBreadcrumbs() {

  let history = useHistory();

  return (

    <div style={{padding:"12px 0px 0px 0px"}}>
    <Breadcrumbs aria-label="breadcrumb">
      
      <Link color="primary"  onClick={()=>{
       history.push("/");
      
      }} >
        <HomeIcon/>
      </Link>
     
    <Typography color="textPrimary">{loc("main.questionaire")}</Typography>
    </Breadcrumbs>
    </div>
  );
}

export default function Quiz() {
  

  const [open, setOpen] = React.useState(false);
 

  let history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createQuize = () => {
    handleClickOpen();
  };
 

  /**
   * row edit
   * @param item 
   */
  const rowEditEvent = (item: any) => {
    history.push("/tests/"+item.id);
  }

  const onsucces = () => { 
    console.log("succes");
    handleClose();
  }

  const onfail = () => { 
    console.log("coucou");
  }


  return (<React.Fragment>
    <MenuBar content={<SimpleBreadcrumbs/>} />
    <SedgeTable
      oncreate={createQuize}
      url={URL_TEST}
      title="Liste des tests"
      columns={columns}
      onedit={rowEditEvent} />
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">Création d'un test</DialogTitle>
      <DialogContent>

      <QuizForm onfail={onfail} onsucces={onsucces} />

      
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleClose} color="primary">
          {loc("close")}
          </Button>
        <Button type="submit" form="quizform"  color="primary">
          {loc("validate")}
          </Button>
      </DialogActions> 
    </Dialog>
  </React.Fragment>);
}