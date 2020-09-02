import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CommunService from "./../../services/CommunService";
import { URL_TEST, URL_QUESTION } from "./../../config/Urls";
import { Link, Button, DialogTitle, DialogActions } from '@material-ui/core';
import { connect } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { initStore, turnSondageEdit } from "./../../actions"
import QuizService from "./../../services/QuizService";
import loc from "../../locale/I18n";
import ConfirmationDialog from "./../commun/ConfirmationDialog";
import AfterActionSnackBar from '../commun/AfterActionSnackBar';
import SondageQuestionForm from './SondageQuestionForm';



interface Data {
  id: number;
  title: string;
  level: string;
  time: number;
  totalPoint: number;
  lang: string

}




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {

  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}


interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const headCells: HeadCell[] = [
    { id: 'lang', numeric: false, disablePadding: false, label: loc("librarie.table.lang") },
    { id: 'title', numeric: false, disablePadding: true, label: loc("main.title") },
  ];



  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 200,
      color: '#fff',
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
    gridQ: {



    },
    paperQ: {


    },
    dialogContent: {
      width: "100%"
    }
  }),

);

interface EnhancedTableToolbarProps {
  numSelected: number;
  testId: number;
  initStore: () => void;
  selected: any[];
  questions: string[];
  performRefresh: () => void;
  isSondage: boolean;


}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState<boolean>(false);

  const [openWait, setOpenWait] = React.useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<"success" | "info" | "warning" | "error" | undefined>("info");

  const createQuestion = () => {
    props.initStore();

    setOpen(true);
  }


  const deleteSelected = (event: any) => {
    console.log(props.questions);
    setOpenConfirm(true);
  }

  const confirmDelete = () => {
    let service: QuizService = new QuizService();
    setOpenWait(true);
    service.deleteQuestions(props.questions).then(resp => {
      setOpenWait(false);
      props.performRefresh();
      setOpenConfirm(false);
      setSeverity("success");
      setOpenSnack(true);

    })
  }

  const closeSnackBar = () => {
    setOpenSnack(false);
  }

  const submitQuestion = (question: any) => {
    let service: QuizService = new QuizService();
    console.log("object:" + JSON.stringify(question));
    question.options.forEach((el: any) => {
      el.id = undefined;
    })
    setOpenWait(true);
    service.createSondageQuestionaire(props.testId, question).then(resp => {

      if (props.performRefresh) {
        props.performRefresh();
        setSeverity("success");
        setOpenSnack(true);
      }

      setOpen(false);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      setOpenWait(false);

    })

  }

  const deleteLabel = loc("delete");
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: false,
      })}
    >
      <Backdrop open={openWait} className={classes.backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AfterActionSnackBar open={openSnack} severity={severity} handleClose={closeSnackBar} />
      <ConfirmationDialog
        openConfirmation={openConfirm}
        message={"voulez vous vraiment supprimer cette / ces questions?"}
        oncancel={() => {
          setOpenConfirm(false);
        }}
        onconfirm={confirmDelete}


      />


      <Typography className={classes.title} variant="h6" id="tableTitle" component="h2" color="primary" gutterBottom>
        Questions
        </Typography>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">

          </Typography>
        )}

      <Tooltip title={loc("create")} >
        <IconButton aria-label={loc("create")} onClick={createQuestion}>
          <CreateNewFolderIcon />
        </IconButton>

      </Tooltip>
      {numSelected > 0 ? (
        <Tooltip title={deleteLabel}>
          <IconButton aria-label={deleteLabel} onClick={deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <span></span>
        )}

      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>{loc("main.createq")}</DialogTitle>

        <DialogContent>
          <Grid container xs={12} spacing={2} className={classes.dialogContent}>
            <Grid item xs={12}>
              <SondageQuestionForm testId={props.testId} onSubmit={submitQuestion} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={(event: any) => {
            setOpen(false);
          }}>{loc("close")}</Button>

          <Button color="primary" variant="contained" type="submit" form="question_form">{loc("validate")}</Button>
        </DialogActions>
      </Dialog>

    </Toolbar>

  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    dialogContent: {
      width: "100%"
    }
  }),
);

function SondageQuestionList(props: any) {


  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any[]>([]);
  
  const [openWait, setOpenWait] = React.useState<boolean>(false);
  const [refreshCount, setRefreshCount] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [question, setQuestion] = React.useState<any>();
  

  React.useEffect(() => {
    let service: CommunService = new CommunService(URL_TEST + "/" + props.test + "/questions");
    service.processGetAll().then((resp: any) => {
      
      
      setRows(resp.data);
    })
  }, [refreshCount,props]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  

  const editQuestion = (qid: number) => {
    const service: CommunService = new CommunService(URL_QUESTION);
    props.dispatch(turnSondageEdit({ edit: true }));
    setOpenWait(true);
    service.processGetOne(qid).finally(() => {
      setOpenWait(false);
      //setOpenEdit(true);
    }).then(resp => {

      let question = resp.data;
      let options: any[] = [];
      question.responses.forEach((el: any, ind: number) => {
        options = [...options, { id: "option" + ind, content: el.content, map: el.id }]
      })


      question.options = options;
      setOpenEdit(true);
      setQuestion(question);
    });



  }

  const performRefresh = () => {
    setRefreshCount(!refreshCount);
    setSelected([]);
    console.log("refresh")
  }


  const detailQuestion = (qid: number) => {
    const service: CommunService = new CommunService(URL_QUESTION);
    props.dispatch(turnSondageEdit({ edit: false }));
    setOpenWait(true);
    service.processGetOne(qid).finally(() => {
      setOpenWait(false);
      
    }).then(resp => {

      let question = resp.data;
      let options: any[] = [];
      question.responses.forEach((el: any, ind: number) => {
        options = [...options, { id: "option" + ind, content: el.content, map: el.id }]
      })


      question.options = options;
      setOpenEdit(true);
      setQuestion(question);
    });



  }


  const submitQuestion = (question: any) => {
    let service: QuizService = new QuizService();

    question.options.forEach((el: any) => {
      el.id = el.map;
    })

    question.deletedOptions.forEach((el: any) => {
      el.id = el.map;
    })
    setOpenWait(true);
    service.updateSondageQuestionaire(question.id, question).then(resp => {

      if (props.performRefresh) {
        props.performRefresh();
        //setSeverity("success");
        //setOpenSnack(true);
      }

      setOpenEdit(false);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      setOpenWait(false);

    })

  }

  const editLabel = loc("edit");
  return (
    <div className={classes.root}>

      <Backdrop open={openWait} className={classes.backdrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar isSondage={props.isSondage ? props.isSondage : false} performRefresh={performRefresh} selected={props.selected} questions={selected} numSelected={selected.length} testId={props.test} initStore={() => {
          props.dispatch(initStore());
        }} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id as string)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>

                      <TableCell align="center" padding="none">

                        <span className={"flag-icon flag-icon-" + row.lang + " flag-icon-squared"}></span>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.title}
                      </TableCell>


                      <TableCell align="right"><Link onClick={(event: any) => {
                        event.preventDefault();
                        //setSelectQuestion(row.id as number);
                        detailQuestion(row.id as number);

                      }} style={{ cursor: "pointer", padding: "0px 10px" }}>details</Link>

                        <Link onClick={(event: any) => {
                          event.preventDefault();
                          editQuestion(row.id as number);


                        }} style={{ cursor: "pointer" }}>{editLabel}</Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
      </Paper>

      <Dialog open={openEdit} fullWidth maxWidth="lg">
        <DialogTitle>{loc("main.createq")}</DialogTitle>

        <DialogContent>
          <Grid container xs={12} spacing={2} className={classes.dialogContent}>
            <Grid item xs={12}>
              <SondageQuestionForm testId={props.testId} onSubmit={submitQuestion} question={question} edit={true} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>

          <Button color="secondary" variant="contained" onClick={(event: any) => {
            setOpenEdit(false);
          }}>{loc("close")}</Button>
          {!props.editQuestion ?
            <Button color="primary" variant="contained" onClick={(event: any) => {
              event.preventDefault();
              props.dispatch(turnSondageEdit({ edit: true }));
            }} >{loc("edit")}</Button>
            :
            <Button color="primary" variant="contained" type="submit" form="question_form">{loc("validate")}</Button>
            
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  selected: state.librarie.selected,
  editQuestion: state.sondage.edit
});

const mapDispatchToProps = (dispatch: any) => {
  return { dispatch: (action: any) => { dispatch(action) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(SondageQuestionList)