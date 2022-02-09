import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles'

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            <ul className='SidebarList'>
            {SidebarData.map((val, key)=>{
              return (
                   <Link 
                      to={val.link}
                      className='row'
                    >   
              <div id = "icon">{val.icon}</div>
              <div id = "title">{val.title}</div>
        </Link>
        );
       })}
      </ul>
        </div>
    )
}

export default withStyles(style)(SideMenu);
