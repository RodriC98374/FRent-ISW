import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAllowed, user, children, redirectTo = "/login"}) => {
  
    if (!isAllowed){
      return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet/>
  }
  
  export default ProtectedRoute;
  
  
    /* const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />; 
};

export default ProtectedRoute; */