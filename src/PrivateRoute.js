import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ children, auth, SuccessComp, FailComp, ...rest }) => {
    return <Route {...rest} render={() => (auth ? SuccessComp : FailComp)} />;
};

export default PrivateRoute;