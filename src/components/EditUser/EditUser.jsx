import "./EditUser.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import SideMenu from "../SideMenu/SideMenu";

const EditUser = () => {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [birthday, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const [hasUserImage, setHasUserImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-production.up.railway.app/user",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const result = await response.json();
      setUser(result.user);
    };

    fetchData().catch(console.error);
  }, [token]);

  const handleSelectedFile = (fileSelect) => {
    submitSelectFileToCloudinary(fileSelect);
  };

  const submitSelectFileToCloudinary = async (fileUpload) => {
    const formData = new FormData();
    formData.append("avatar", fileUpload);


    const options = {
      url: `https://melody-music-stream-production.up.railway.app/cloud/avatar`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    try {
      const result = await axios(options);
      setImage(result.data.image.secure_url);
      setHasUserImage(true);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const headers = {
        auth_token: token,
      };

      const data = await axios.put(
        "https://melody-music-stream-production.up.railway.app/user",
        {
          name: name,
          lastName: lastName,
          email: email,
          password: newPassword,
          oldPassword: oldPassword,
          birthday: birthday,
          gender: gender,
          avatar: image,
        },
        {
          headers,
          "Access-Control-Allow-Origin": "*",
        }
      );
      navigate("/home");
    } catch (data) {
      const { msg } = data.response.data;
    }
  };

  return (
    <div>
      <Grid container component="main">
        <Grid className="background" item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          className="formBackground"
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              className="formSign"
              component="form"
              sx={{ mt: 1 }}
              onSubmit={submitHandler}
            >
              <Typography component="h1" variant="h4">
                Edit User
              </Typography>
              <div className="profile">
                {hasUserImage ? (
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ borderRadius: "50%", height: "5em", p: "0px" }}
                  >
                    <Avatar
                      alt="Avatar"
                      src={image}
                      sx={{ width: 70, height: 70 }}
                    />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleSelectedFile(e.target.files[0])}
                    />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ borderRadius: "50%", height: "5em", p: "0px" }}
                  >
                    <Avatar
                      alt="Avatar"
                      src={user.avatar}
                      sx={{ width: 70, height: 70 }}
                    />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleSelectedFile(e.target.files[0])}
                    />
                  </Button>
                )}
              </div>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              ></TextField>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <TextField
                    label="Name"
                    placeholder="ej: John"
                    id="name"
                    defaultValue={user.name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></TextField>
                </Grid>{" "}
                <Grid item xs={6}>
                  <TextField
                    defaultValue={user.lastName}
                    label="Last Name"
                    placeholder="ej: Smith"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container spacing={6} columns={12}>
                <Grid item xs={6}>
                  <TextField
                    required
                    defaultValue={user.birthday}
                    className="birthDate"
                    id="birthday"
                    label="Birthday"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl className="radio">
                    <Typography>Gender</Typography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={user.gender}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        id="gender"
                        name="gender-selector"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        required
                        label="Female"
                      />

                      <FormControlLabel
                        control={<Radio />}
                        id="gender"
                        name="gender-selector"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                        required
                        label="Male"
                      />

                      <FormControlLabel
                        control={<Radio />}
                        id="gender"
                        name="gender-selector"
                        value="no-binary"
                        onChange={(e) => setGender(e.target.value)}
                        required
                        label="No-Binary"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={12}>
                  <TextField
                    label="Old Password"
                    type="password"
                    placeholder="Enter Old Password"
                    id="oldPassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    fullWidth
                    type="password"
                    placeholder="Password"
                    id="newPassword"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm New Password"
                    fullWidth
                    type="password"
                    placeholder="Password"
                    id="confirmNewPassword"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  ></TextField>
                </Grid>
              </Grid>
              <Button className="registerButton" type="submit">
                Edit User
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditUser;
