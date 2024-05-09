import { Navigate } from "react-router-dom";

function StadiumOwnerProtected({ isStadiumOwner, children }) {
  if (isStadiumOwner) {
    return children;
  } else {
    return <Navigate to="/register-stadium" />;
  }
}

export default StadiumOwnerProtected;