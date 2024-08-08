import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fc78-140-213-217-40.ngrok-free.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log("API Response:", data.token);

      if (data.redirect) {
        navigate(data.redirect);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Email atau password salah. Silahkan coba lagi.");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <CoverLayout
      title="Selamat Datang"
      description="Silahkan memasukkan email dan password anda"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSignIn}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                style={{ marginLeft: '190px', marginBottom: '20px'}} // Tambahkan margin kiri di sini
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              </InputAdornment>
            }
          />
        </SoftBox>
        {error && (
          <SoftTypography variant="body2" color="error" mt={2}>
            {error}
          </SoftTypography>
        )}
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Masuk
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
