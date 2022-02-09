
import Button from '@material-ui/core/Button';
import * as React from 'react';
import AddDoctor from './AddDoctor';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import {  MdDeleteOutline} from 'react-icons/md'
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

function add(e) {
    e.preventDefault();
    window.location = '../pages/Doctors/AddDoctor';
}
const Doctor = () => {

    function createData(name, calories, fat, carbs, protein) {
        return {
          name,
          calories,
          fat,
          carbs,
          protein,
        };
      }
  
  return (
    <div style={{
      display: 'flex',
      margin: 'auto',
      width: 400,
      flexWrap: 'wrap',
    }}>
      <div style={{ width: '100%', float: 'left' }}>
        <h1>Doctor Manage</h1> <br />
      </div>
    
     
      <Button variant="contained" color="secondary" onClick={add} > 
        Add Doctor
      
      </Button>
      
    
    </div>
  );
}
  
export default Doctor;