import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth.action";
import { userLogout } from "../../utils/API_CALLS";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response.status === 200) {
      dispatch(logout);
      toast.info("Successfully logged out");
      navigate("/login");
    }
  };

  useEffect(() => {
    // handleLogout();
    sessionStorage.removeItem("jwttoken");
    navigate("/login");
  });
};

export default Logout;
