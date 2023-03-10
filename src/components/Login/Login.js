import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../utils/API_CALLS";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { NavLink } from "react-router-dom";
import {
  Button,
  // CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginBtnState, setLoginBtnState] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({});

  const validateInput = () => {
    const { email, password } = values;
    const errors = {};
    if (!email) {
      errors.email = "This field is required";
    }
    if (!password) {
      errors.password = "This field is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleLogin = async () => {
    const errors = validateInput();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    setLoginBtnState(true);

    const data = await loginUser(values);
    if (data.jwttoken) {
      dispatch(login);
      sessionStorage.setItem("jwttoken", data.jwttoken);
      sessionStorage.setItem("userid", data.userId);
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(data.error);
    }
    setLoginBtnState(false);
  };

  return (
    <Box sx={{ py: 8, height: "100vh" }}>
      <Container elevation={4} component={Paper} sx={{ width: "450px", py: 8 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          {/* <CardMedia
            component="img"
            sx={{ width: 82, filter: "invert(100%)", mr: 3 }}
            // image={logo}
            alt="NLC Logo"
          /> */}
          <Typography fontWeight={500} variant="h3" color="#282828">
            Wayfarer
          </Typography>
        </Box>
        <Typography
          sx={{ mb: 8 }}
          align="center"
          variant="body2"
          color="#3a3541de"
        >
          Please Sign-in to your account to continue.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", my: 4, px: 2 }}>
          <EmailIcon sx={{ mr: 3 }} />
          <TextField
            name="email"
            onChange={handleChange}
            value={values.email}
            variant="outlined"
            size="small"
            type="email"
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 4, px: 2 }}>
          <KeyIcon sx={{ mr: 3 }} />
          <TextField
            name="password"
            onChange={handleChange}
            value={values.password}
            variant="outlined"
            size="small"
            type={showPassword ? "text" : "password"}
            label="Password"
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />
        </Box>
        <Box>
          <FormGroup sx={{ mb: 3, px: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              }
              label={<Typography variant="body2">Show Password</Typography>}
            />
          </FormGroup>
        </Box>
        <Box sx={{ px: 2 }}>
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ mb: 2 }}
            color="primary"
            fullWidth
            disabled={loginBtnState}
          >
            Login
          </Button>
        </Box>
        <div className="mb-3 ms-3">
          Don't have an account?
          <NavLink to="/register"> Register</NavLink>
        </div>
      </Container>
    </Box>
  );
};

export default Login;
