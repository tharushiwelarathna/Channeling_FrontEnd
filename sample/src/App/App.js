import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
//import Header from "../components/Header";
import PageHeader from "../components/PageHeader";

import AddDoctor from "../pages/Doctors/AddDoctor";
import DoctorTable from "../pages/Doctors/DoctorTable";
import Doctor from "../pages/Doctors/Doctor";
import AppointmentForm from "../pages/Appointments/AppointmentForm";
import Patients from "../pages/Patients/Patients";
import Doctors from "../pages/Doctors/Doctors";
import Api from "../pages/test/Api";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <Switch>
            <Route exact path="/">
              {/* <AddDoctor/> */}
              <Doctors />
              {/* <Api/> */}
              {/* <AppointmentForm/> */}
              {/* <Doctor/> */}
              {/* <DoctorTable/> */}
            </Route>
            <Route path="/patients">
              <Patients />
            </Route>

            <Route path="/apointments">
           <AppointmentForm/> 
            </Route>
          </Switch>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
