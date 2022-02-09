import React, {useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {
    Button,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from "../../baseUrl/axios";
import axios from "axios";


  
const AppointmentForm = () => {
    const [patient  , setPatient] = useState([]);
    const [doctor  , setDoctor] = useState([]);
   
    const [name, setName] = useState("");
    const [value, setValue] = React.useState(null);
  
  // Our sample dropdown options
  const options = ['Monday', 'Tuesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday']
  
useEffect( () => {
    axios.get(`http://localhost:8000/api/patients`)
        .then( (res) =>{
        var temp = [];
        for (let i =0; i<res.data.length ; i++){
        temp.push(res.data[i].fullName)
        }
        setPatient(temp)
        })
        .catch( (err) => {
            console.log(err);
        })
}, []);

    // const  submitbtn = () => {
    //   //console.log(patient)
    // }

    useEffect( () => {
      axios.get(`http://localhost:8000/api/doctors`)
          .then( (res) =>{
          var temp = [];
          for (let i =0; i<res.data.length ; i++){
          temp.push(res.data[i].fullName)
          }
          setDoctor(temp)
          })
          .catch( (err) => {
              // console.log(err);
          })
  }, []);
  
      // const  submitbtn = () => {
      //   //console.log(doctor)
        
      // }
      useEffect( () => {
        axios.get(`http://localhost:8000/api/patients`)
            .then( (res) =>{
            var temp = [];
            for (let i =0; i<res.data.length ; i++){
            temp.push(res.data[i].fullName)
            }
            setPatient(temp)
            })
            .catch( (err) => {
                // console.log(err);
            })
    }, []);
    
        const  submitbtn = () => {
          console.log(patient)
          console.log(doctor)
        }
   

  return (
   
    <div style={{marginLeft:'10%' }}>
      <h1>Manage Appointment</h1>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={patient}
            style={{ width: 300  }}
            renderInput={(params) => <TextField {...params} label="Patient's Name" />}
        />
      <br></br>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={doctor}
            style={{ width: 300  }}
            renderInput={(params) => <TextField {...params} label="Doctor's Name" />}
        />
       
    <br></br>
    <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            style={{ width: 300  }}
            renderInput={(params) => <TextField {...params} label="Hospital Name" />}
        />
      <br></br>
       
       <TextField
       style={{
        margin: 'auto',
        display: 'block',
      
       
      }}
        id="date"
        label="Date"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br></br>
       <br></br>
       <TextField id="outlined-basic" label="Price" variant="outlined" style={{width:300}} />
       <br></br>
       <br></br>
       <br></br>
       <Button
       style={{width:300}}
        variant="contained"
         color="primary"
        fullWidth
       onClick={ () => submitbtn()}
        //onClick={savedata}

         >
         Submit
        </Button>
    </div>
   
  );
}
  
export default AppointmentForm