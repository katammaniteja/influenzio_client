import { createUser } from "../../utils/API_CALLS";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { NavLink } from "react-router-dom";
import {
  Button,
  // CardMedia,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";

const Register = () => {
  const [loginBtnState, setLoginBtnState] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [values, setValues] = useState({});

  const validateInput = () => {
    const { email, password, name, cpassword } = values;
    const errors = {};
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(email)) {
      errors.email = "Invalid email";
    }
    if (!email) {
      errors.email = "This field is required";
    }
    if (!name) {
      errors.name = "This field is required";
    }
    if (!password) {
      errors.password = "This field is required";
    }
    if (!cpassword) {
      errors.cpassword = "This field is required";
    }
    if (password !== cpassword) {
      errors.cpassword = "password is not matched";
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
    const data = await createUser(values);
    if (data.message) {
      toast.success(data.message);
      navigate("/login");
    } else {
      setErrors({ email: "email already taken" });
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
            mb: 1,
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
          sx={{ mb: 4 }}
          align="center"
          variant="body2"
          color="#3a3541de"
        >
          Please create a new account to continue.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", my: 3, px: 2 }}>
          <AccessibilityIcon sx={{ mr: 3 }} />
          <TextField
            name="name"
            onChange={handleChange}
            value={values.name}
            variant="outlined"
            size="small"
            label="Name"
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 3, px: 2 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", my: 3, px: 2 }}>
          <KeyIcon sx={{ mr: 3 }} />
          <TextField
            name="password"
            onChange={handleChange}
            value={values.password}
            variant="outlined"
            size="small"
            label="Password"
            error={Boolean(errors.password)}
            helperText={errors.password}
            type="password"
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 3, px: 2 }}>
          <KeyIcon sx={{ mr: 3 }} />
          <TextField
            name="cpassword"
            onChange={handleChange}
            value={values.cpassword}
            variant="outlined"
            size="small"
            label="Confirm Password"
            type="password"
            error={Boolean(errors.cpassword)}
            helperText={errors.cpassword}
            fullWidth
          />
        </Box>

        <Box sx={{ px: 2 }}>
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ mb: 2 }}
            color="success"
            fullWidth
            disabled={loginBtnState}
          >
            Register
          </Button>
        </Box>
        <div className="mb-3 ms-3">
          Already have an account?
          <NavLink to="/login"> Login</NavLink>
        </div>
      </Container>
    </Box>
  );
};

export default Register;
