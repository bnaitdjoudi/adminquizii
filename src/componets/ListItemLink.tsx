import * as React from "react";
import ListItem from '@material-ui/core/ListItem';
export default function ListItemLink(props:any) {
    return <ListItem button component="a" {...props} />;
  }
