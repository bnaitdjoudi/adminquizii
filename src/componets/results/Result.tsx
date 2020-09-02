import React from 'react';
import { useHistory } from "react-router-dom";
import MenuBar from "../MenuBar";
import loc from "../../locale/I18n";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import { Grid } from '@material-ui/core';

import TestSondageResult from './TestSondageResult';
import TestEvalResult from './TestEvalResult';

function SimpleBreadcrumbs() {

    let history = useHistory();

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


export default function Results(props:any) {

   
    return (
        <React.Fragment>
            <MenuBar content={<SimpleBreadcrumbs />} />

            <div>
                <Grid container spacing={1} xs={12}>
                    

                    <Grid item xs={12} >
                        <Grid container xs={12} spacing={1}>
                            {props.match.params.type==='s'?<Grid item xs={12}><TestSondageResult /></Grid>:<Grid item xs={12}><TestEvalResult/></Grid>}
   
                            
                        </Grid>

                    </Grid>

                </Grid>
            </div>

        </React.Fragment>
    );
}