import React from "react";
import { Route } from "react-router-dom";

const AdminRoutes = ({ children, isAdmin, auth, SuccessComp, FailComp, ...rest }) => {
    console.log("isAdmin", isAdmin)
    console.log("auth", auth)
    return <Route {...rest} render={() => (auth && isAdmin ? SuccessComp : FailComp)} />;
};

export default AdminRoutes;