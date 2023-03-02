import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth.action";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("jwttoken");
    sessionStorage.removeItem("userid");
    toast.success("Logout Successful");
    dispatch(logout);
  };

  useEffect(() => {
    handleLogout();
  });
};

export default Logout;
