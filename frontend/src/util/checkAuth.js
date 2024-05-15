import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export const checkAuth = (condition, location) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (condition) {
            navigate(location);
        }
    }, [auth.isLoggedIn, condition, location]);
};