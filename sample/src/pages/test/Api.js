import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import instance from '../../baseUrl/axios'
function Api() {



    
const [formData,setFormData] = useState( { name: "", email: "", phone: "", city: "" ,gender: "",specialization:"",addeddate:"",isPermanent:""});


const savedata = ( () => {
    instance.post('doctors',{
        "fullName": formData.name,
        "email":formData.email,
        "mobile":formData.phone,
        "city":formData.city,
        "gender":formData.gender,
        "specializationId":formData.specialization,
        "addedDate":formData.addeddate,
        "isPermanent":formData.isPermanent
    },{
        headers: {
        'Content-Type': 'application/json',}
        })
        .then((res)=>{
            console.log(res);
        })
        .then((error)=>{
            console.error(error);
        })

    // Axios.post('doctors',{
    //     "name": formData.name,
    //     "email":formData.email,
    //     "mobile":formData.mobile,
    //     "city":formData.city,
    //     "gender":formData.gender,
    //     "specializationId":formData.specialization,
    //     "addedDate":formData.addedate,
    //     "isPermanent":formData.isPermanent
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });
})
    // const onChange = (e) => {
    //     // const { value, id } = e.target;
    //     setFormData({ ...formData, name: e.target.value });
    //    setFormData({ ...formData, name: e.target.value });
    //     setFormData({ ...formData, email: e.target.value });
    //     setFormData({ ...formData, phone: e.target.value });
    //     setFormData({ ...formData, city: e.target.value });
    //     setFormData({ ...formData, gender: e.target.value });
    //     setFormData({ ...formData, specialization: e.target.value });
    //     setFormData({ ...formData, addeddate: e.target.value });
    //     setFormData({ ...formData, isPermanent: e.target.value });
    //     console.log('====================================');
    //     console.log(e.target.value);
    //     console.log('================= ===================');
    //   };
    const nameOnChange=(e)=>{
        setFormData({ ...formData, name: e.target.value });
    }
    const emailOnChange=(e)=>{
        setFormData({ ...formData, email: e.target.value });
    }
    const phoneOnChange=(e)=>{
        setFormData({ ...formData, phone: e.target.value });
    }
    const cityOnChange=(e)=>{
        setFormData({ ...formData, city: e.target.value });
    }
    const genderOnChange=(e)=>{
        setFormData({ ...formData, gender: e.target.value });
    }
    const specializationOnChange=(e)=>{
        setFormData({ ...formData, specialization: e.target.value });
    }
    const addeddateOnChange=(e)=>{
        console.log(e.target.value);
        setFormData({ ...formData, addeddate: e.target.value });
    }

    const isPermanentOnChange=(e)=>{
        setFormData({ ...formData, isPermanent: e.target.value });
    }
  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        React-App
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter Full name"
                    label="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => nameOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter email"
                    label="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => emailOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone"
                    label="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => phoneOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter city "
                    label="city"
                    id="city"
                    value={formData.city}
                    onChange={(e) => cityOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="gender"
                    multiline
                    rows={4}
                    placeholder="Type your gender"
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => genderOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />



                </Grid>

                <Grid item xs={12}>
                  <TextField
                type="text"
                placeholder="Enter specialization "
                label="specialization"
                id="specialization"
                value={formData.specialization}
                onChange={(e) => specializationOnChange(e)}
                variant="outlined"
                fullWidth
                required
                  />
                </Grid>

        
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter addeddate "
                    label="addeddate"
                    id="addeddate"
                    value={formData.addeddate}
                    onChange={(e) => addeddateOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                

                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter isPermanent "
                    label="isPermanent"
                    id="isPermanent"
                    value={formData.isPermanent}
                    onChange={(e) => isPermanentOnChange(e)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={savedata}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Api;
