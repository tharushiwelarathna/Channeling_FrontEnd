import React from 'react';
//import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import SubjectIcon from '@material-ui/icons/Subject';

export const SidebarData =  [
    {
        title: "Doctor Manage",
       icon: <PersonOutlineIcon />,
        link: "/"
    },
    {
        title: "Patient Manage",
        icon: <PersonOutlineRoundedIcon />,
        link: "/patients"
    },
    {
        title: "Apointment Manage",
        icon: <SubjectIcon/>,
        link: "/apointments"
    }
]
  

