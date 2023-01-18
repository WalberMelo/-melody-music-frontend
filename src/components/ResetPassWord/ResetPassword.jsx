import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    try {
      const headers = {
        auth_token: token,
      };

      const data = await axios.put(
        "https://melody-music-stream-production.up.railway.app/user/password-reset",
        {
          password: newPassword,
        },
        {
          headers,
          "Access-Control-Allow-Origin": "*",
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.msg);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1.6em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            mr: "4em",
          }}
        >
          <img
            src="https://res.cloudinary.com/dzfouunnx/image/upload/ar_1:1,bo_2px_solid_rgb:bf00ff,c_fill,g_auto,r_max,w_1000/v1669885215/melody/logo_wnoywm.png"
            alt="logo"
            width="100"
            height="200"
          />
        </Box>

        <Typography
          sx={{
            color: "white",
            fontSize: "1.6em",
          }}
        >
          Password Reset Account
        </Typography>
      </Box>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ height: "60vh" }}
      >
        <Box
          sx={{
            mt: 4,
            my: 8,
            mx: 4,
          }}
        >
          <Box
            className="formSign"
            component="form"
            sx={{
              mt: "2em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={submitHandler}
          >
            {" "}
            <TextField
              label="New Password"
              type="password"
              placeholder="Password"
              id="newPassword"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            ></TextField>
            <TextField
              label="Confirm New Password"
              type="password"
              placeholder="Password"
              id="confirmNewPassword"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            ></TextField>
            <Button className="registerButton" type="submit">
              Reset Password
            </Button>
            {errorMsg && <Typography color="#ff0000">{errorMsg}</Typography>}
            <Link to="/forgot">
              <Button sx={{ mt: 1, mb: 1 }}>
                <p>Forgot password</p>
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "1.4em",
        }}
      ></Box>
    </>
  );
}

export default ResetPassword;
