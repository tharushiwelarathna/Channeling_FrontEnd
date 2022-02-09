import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as patientService from "../../services/patientService";
import instance from '../../baseUrl/axios';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },

]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    address: '',
    gender: 'male',
    diseases:"",


}

export default function PatientForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('dob' in fieldValues)
            temp.dob = fieldValues.dob.length !== 0 ? "" : "This field is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x =="")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        // console.log("initialFValues");
        // console.log(values.fullName);
        // console.log(values.email);
        // console.log(values.mobile);
        // console.log(values.dob);
        // console.log(values.address);
        // console.log(values.gender);
        // console.log(values.diseases);
        // console.log(values.addedDate);
    

        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }

        instance.post('patients',{
            "fullName":values.fullName,
            "email": values.email,
            "mobile": values.mobile,
            "dob": values.dob,
            "address": values.address,
            "gender": values.gender,
            "diseases":"values.diseases"
           
           
        },{
            headers: {
            'Content-Type': 'application/json',}
            })
            .then((res)=>{
                console.log(res);
            })
            .then((error)=>{
                console.log("res");
                console.error(error);
            })
    }

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="Date of Birth"
                        name="dob"
                        value={values.dob}
                        onChange={handleInputChange}
                        error={errors.dob}
                    />
                    <Controls.Input
                        label="Address"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                     <Controls.Select
                        name="diseasesId"
                        label="Diseases"
                        value={values.diseasesId}
                        onChange={handleInputChange}
                        options={patientService.getDiseasesCollection()}
                        error={errors.diseasesId}
                    />
                   
                   
                   

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
