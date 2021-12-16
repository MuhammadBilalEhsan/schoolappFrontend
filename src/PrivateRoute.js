import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ children, auth, SuccessComp, FailComp, isAdmin, AdminComp, ...rest }) => {
    return <Route {...rest} render={() => (
        auth && isAdmin ? AdminComp
            : auth && !isAdmin ? SuccessComp : FailComp
    )} />;
};

export default PrivateRoute;