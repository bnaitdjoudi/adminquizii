import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import MenuBar from "../MenuBar";
import loc from "../../locale/I18n";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SedgeTable from "../commun/SedgeTable";
import { Column } from 'material-table';
import { URL_TEST } from "../../config/Urls";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 1, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 24,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));



function SimpleBreadcrumbs() {


    

    let history = useHistory();
    const classes = useStyles();
    return (

        <div style={{ padding: "12px 0px 0px 0px" }}>
            <Breadcrumbs aria-label="breadcrumb">

                <Link color="primary" onClick={() => {
                    history.push("/");

                }} >
                    <HomeIcon />
                </Link>

                <Typography color="textPrimary">{loc("main.results")}</Typography>
            </Breadcrumbs>
        </div>
    );
}


export default function Results() {

    const columns: Array<Column<any>> = [
        { title: loc("result.title"), field: "title" },
        { title: loc("result.condidat"), field: "compagn.title" },
        { title: loc("result.cd"), field: "createDate" },
        
      ]

    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };
    
      const createQuize = () => {
        handleClickOpen();
      };

      const rowEditEvent = (item: any) => {
    
        history.push("/tests/"+item.id);
      }

    return (
        <React.Fragment>
            <MenuBar content={<SimpleBreadcrumbs />} />

            <div>
                <Grid container spacing={1}>
                    <Grid item xs={9} >
                        <Paper>
                            <SedgeTable
                                oncreate={createQuize}
                                url={URL_TEST}
                                title="Résultat"
                                columns={columns}
                                 />
                        </Paper>

                    </Grid>
                    <Grid item xs={3} >
                        <Paper>dsfsdf</Paper>
                    </Grid>
                </Grid>
            </div>

        </React.Fragment>
    );
}