import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';



export default class Demo extends React.PureComponent {

    

    render() {
        const { data: chartData } = this.props;
        console.log("qffdsdfsqdfsqdf:"+JSON.stringify(chartData));
        return (
            <Paper elevation={0}>
                <Chart
                    data={chartData}
                                    >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="ratio"
                        argumentField="option"
                    />
                    <Animation />
                </Chart>


            </Paper>
        );
    }
}