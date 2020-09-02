import * as React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {Link, RouteComponentProps} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import loc from "./../locale/I18n";

interface State {

}
interface Props extends RouteComponentProps{
    route?: string
}



 function SideMenu(props:Props){

    


   const  getClassNameFromRoute = (route: string) => {
        
        
        if (props.location.pathname === route) {
            return "menubutton active"
        } else {
            return "menubutton";
        }
    } 

        return (<div>
            <ListItem button className={getClassNameFromRoute("/")} >

                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                
                <Link to="/">{loc('main.dashbord')}</Link>
 
               
            </ListItem>
            <ListItem button className={getClassNameFromRoute("/tests")}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <Link to="/tests">{loc('main.questionaire')}</Link>
            </ListItem>
           
            <ListItem button className={getClassNameFromRoute("/settings")}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <Link to="/settings">Settings</Link>
            </ListItem>
        </div>);
    
}

export default withRouter(SideMenu);