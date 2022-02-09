import React, { useState, useEffect, Component } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as doctorService from "../../services/doctorService";
import instance from "../../baseUrl/axios";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  specialization: "",
  addedDate: new Date(),
  isPermanent: false,
};

export default function DoctorForm(props) {
  const { addOrEdit, recordForEdit,getData } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("specializationId" in fieldValues)
      temp.specializationId =
        fieldValues.specializationId.length !== 0
          ? ""
          : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    date,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,

  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    // console.log("initialFValues");
    // console.log(values.specializationId);
    // console.log(values.specialization);
    // console.log(values.addedDate);
    // console.log(values.isPermanent);
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }

    instance
      .post(
        "doctors",
        {
          fullName: values.fullName,
          email: values.email,
          mobile: values.mobile,
          city: values.city,
          gender: values.gender,
          specializationId: values.specializationId,
          isPermanent: values.isPermanent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .then((error) => {
        console.error(error);
      });
      getData()
  };
  const updateData = (e) => {
    // console.log("initialFValues");
    // console.log(values.specializationId);
    // console.log(values.specialization);
    // console.log(values.addedDate);
    // console.log(values.isPermanent);
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }

    instance
        .put(
            "doctors",
            {
              fullName: values.fullName,
              email: values.email,
              mobile: values.mobile,
              city: values.city,
              gender: values.gender,
              specializationId: values.specializationId,
              isPermanent: values.isPermanent,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        )
        .then((res) => {
          console.log(res);
        })
        .then((error) => {
          console.error(error);
        });
    getData()
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

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
            // onChange={e => setMobile(e.target.value)}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            // onChange={e => setCity(e.target.value)}
            onChange={handleInputChange}
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
            name="specializationId"
            label="Specialization"
            value={values.specializationId}
            // onChange={e => setSpecializationId(e.target.value)}
            onChange={handleInputChange}
            options={doctorService.getSpecializationCollection()}
            error={errors.specializationId}
          />
          {/* <Controls.DatePicker
                        type='date'
                        name="addedDate"
                        label="Added Date"
                        value={values.addedDate}
                      //  value={this.state.addedDate}
                        //onChange={this.handleInput}
                        // onChange={e => setAddedDate(e.target.value)} 
                        onChange={handleInputChange}
                    /> */}
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Doctor"
            value={values.isPermanent}
            //onChange={e => setIsPermanent(e.target.value)}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button type="update" text="Update"  onClick={updateData}/>
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
