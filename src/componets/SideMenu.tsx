import * as React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {Link, RouteComponentProps} from "react-router-dom";
import {withRouter} from 'react-router-dom';

interface State {

}
interface Props extends RouteComponentProps{
    route?: string
}



 class SideMenu extends React.Component<Props, State>{



    constructor(props: Props) {
        let mstate: State = {};
        super(props, mstate);
        this.state = mstate;
    }

    getClassNameFromRoute(route: string) {
        
        
        if (this.props.location.pathname === route) {
            return "menubutton active"
        } else {
            return "menubutton";
        }
    }




    render() {

        return (<div>
            <ListItem button className={this.getClassNameFromRoute("/")} >

                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                
                <Link to="/">Dashboard</Link>
 
               
            </ListItem>
            <ListItem button className={this.getClassNameFromRoute("/tests")}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <Link to="/tests">Tests/Questions</Link>
            </ListItem>
            <ListItem button className={this.getClassNameFromRoute("/users")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <Link to="/users">Users</Link>
            </ListItem>
            <ListItem button className={this.getClassNameFromRoute("/settings")}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <Link to="/settings">Settings</Link>
            </ListItem>
        </div>);
    }
}

export default withRouter(SideMenu);