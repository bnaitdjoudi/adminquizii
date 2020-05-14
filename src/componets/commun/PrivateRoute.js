import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import auth from "../../userstuff/Authaurization";
export default function PrivateRoute({ profile,pathto ,children, ...rest }) {
  
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.checkAuthaurozation(profile) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: pathto,
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }