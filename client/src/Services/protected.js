import {Outlet , Navigate} from "react-router-dom";
import React from 'react';

const Protected = () => {
    // const navigate = useNavigate();
    const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default Protected
