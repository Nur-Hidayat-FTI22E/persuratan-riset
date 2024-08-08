import { FormControl, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import curved6 from "assets/images/curved-images/curved14.jpg";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Separator from "layouts/authentication/components/Separator";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreement, setAgreement] = useState(true);
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://36d3-114-10-134-224.ngrok-free.app/daftar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirm_password, // Add Confirm_password to the request body
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle successful sign-up, e.g., redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <BasicLayout
      title="Selamat Datang"
      description="Sistem Informasi Persuratan COCONUT Computer Club"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Daftar
          </SoftTypography>
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSignUp}>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
            <FormControl fullWidth>
            {/* <InputLabel id="role-label"></InputLabel> */}
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="guest">Guest</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

            </SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Daftar
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Sudah punya akun?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Masuk
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
