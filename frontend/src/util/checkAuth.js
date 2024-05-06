import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export const checkAuth = (isNotLoggedIn, location) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn && isNotLoggedIn) {
            navigate(location);
        }
    }, [auth.isLoggedIn, isNotLoggedIn, navigate, location]);
};