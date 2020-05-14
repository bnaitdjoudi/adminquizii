import * as React from "react";
import MenuBar from "./MenuBar";
import SedgeTable from "./commun/SedgeTable";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RemoteCombobox from "./commun/RemoteCombobox";
import QuizService from "./../services/QuizService";
import {URL_TEST} from "./../config/Urls";

export default function Quiz() {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");
  const [selectedCategorie, setSelectedCategorie] = React.useState<any>({});

  let service:QuizService= new QuizService();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createQuize = () => {
    handleClickOpen();
  };
  const onChangeCategorie = (value:any) =>{
  console.log("coucou:"+value.moduleName);
  setSelectedCategorie(value);
  }

  const getLabelOption = (item: any) => item.moduleName;

  const handleSubmit = () =>{
    service.createquize({title:title,categorieTest:selectedCategorie}).then((resp)=>{
      handleClose();
    });
  }
  

  return (<React.Fragment>
    <MenuBar />
    <SedgeTable oncreate={createQuize} url={URL_TEST} />
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">Création d'un test</DialogTitle>
      <DialogContent>

        <TextField
          onChange={(event:any)=>{
            setTitle(event.target.value);
          }}
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
        />

        <RemoteCombobox
          fullWidth
          onChange={onChangeCategorie}
          label="Categorie"
          getOptionLabel={getLabelOption}
          id="combo-type-test"
          url="http://localhost:8081/categorie_test" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>);
}