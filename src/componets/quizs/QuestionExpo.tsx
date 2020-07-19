import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CommunService from "./../../services/CommunService";
import { URL_QUESTION } from "./../../config/Urls";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from '@material-ui/core';
import { connect } from "react-redux";
import { addToSelect, deleteOnSelect } from "./../../actions/";
import loc from './../../locale/I18n';




interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => any;
}





const useStyles = makeStyles({
    root: {
        width: '100%',
        height:"100%"

    },
    container: {
       height:"100%"
    },
    backdrop: {
        zIndex: 1500
    }
});

function QuestionExpo(props: any) {
    const mlevel : any = {
        "begin": loc("begin"),
        "interm": loc("interm"),
        "senior": loc("senior"),
        "expert": loc("expert"),
    }
    const columns: Column[] = [
        { id: 'id', label: 'Title', minWidth: 30 },

        {
            id: 'lang',
            label: loc("librarie.table.lang"),
            minWidth: 20,
            format: (value: string) => {
                let flag = "flag-icon flag-icon-" + value + " flag-icon-squared";
                return (<span className={flag}></span>)
            }
        },

        { id: 'title', label: loc('main.title'), minWidth: 390 },
        {
            id: 'level',
            label: loc("librarie.table.level"),
            minWidth: 70,
            align: 'right',
            format: (value: any) => mlevel["begin"],
        },
        {
            id: 'totalPoint',
            label: loc("librarie.table.score"),
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: loc("librarie.table.time"),
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toFixed(2),
        },
    ];




    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState(0);
    const [waitOpen, setWaitOpen] = React.useState<boolean>(false);
    const service: CommunService = new CommunService(URL_QUESTION);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    React.useEffect(() => {
        setWaitOpen(true);
        let categories: number[] = [];
        props.tags.forEach((el: any) => {
            categories.push(el.id);
        });
        service.processSearch({
            pageNumber: page + 1, size: rowsPerPage, criteria: {
                title: { operator: "LIKE", value: props.text },
                categorieQuestionList: { operator: "IN", value: categories },
                level: { operator: "EQUAL", value: props.level },
                lang: { operator: "EQUAL", value: props.lang },
                testId: { operator: "EQUAL", value: 0 }
            },
        })
            .then(resp => {
                setWaitOpen(false);
                setRows(resp.data.rows);
                setTotal(resp.data.totalOfElements);
            }).finally(() => {

            });
    }, [props.filtre, page, rowsPerPage, props.text, props.lang, props.level, props.tags]);

    return (
        <Paper className={classes.root}>
            <Backdrop open={waitOpen} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={loc("librarie.table.paging.labelRowsPerPage")}

            />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>

                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {index !== 0 ? column.label : (
                                        <div></div>
                                    )}
                                </TableCell>
                            ))}
                            <TableCell


                            >
                                Actions
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        const pink = "pink_column";
                                        if (index !== 0) {

                                            return (
                                                <TableCell key={column.id} align={column.align} className={index === 2 ? pink : ""}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        }
                                        else {


                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Checkbox onChange={(event: any, checked: boolean) => {
                                                        if (checked) {
                                                            props.dispatch(addToSelect({ el: row.id }))
                                                        } else {
                                                            props.dispatch(deleteOnSelect({ el: row.id }))
                                                        }
                                                    }} />
                                                </TableCell>
                                            );
                                        }
                                    })}
                                    <TableCell>
                                        <Link >details</Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={loc("librarie.table.paging.labelRowsPerPage")}

            />

        </Paper>
    );
}

const mapStateToProps = (state: any) => ({
    text: state.librarie.text,
    level: state.librarie.level,
    tags: state.librarie.tags,
    lang: state.librarie.lang

});

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch: (action: any) => { dispatch(action) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionExpo);
