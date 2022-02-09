import React, { useState, useEffect } from "react";
import DoctorForm from "./DoctorForm";
import PageHeader from "../../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import * as doctorService from "../../services/doctorService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import instance from "../../baseUrl/axios";
import Button from "../../components/controls/Button";




const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "25%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));






const headCells = [
  { id: "fullName", label: "Doctor Name" },
  { id: "email", label: "Email Address " },
  { id: "mobile", label: "Mobile Number" },
  // { id: "specialization", label: "Specialization" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Doctors() {
  const [responseData, setResponseData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const getData = () => {
    if (!openPopup) {
      console.log("call");
      instance.get("doctors").then((response) => {
        setResponseData(response.data);
      });
    }
  };
  useEffect(() => {
    //fetching all the doctors
    getData();
  }, [openPopup]);





  // useEffect(() => {
  //   console.log(responseData);
  // }, [responseData]);

  // // console.log(responseData[0]);
  // responseData.map((data) => {
  //   console.log(data.id);
  // });

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(doctorService.getAllDoctors());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  //

     

  const addOrEdit = (doctor, resetForm) => {
   
    if (doctor.id === 0) doctorService.insertDoctor(doctor);
    else doctorService.updateDoctor(doctor);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(doctorService.getAllDoctors());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const deleteDatabase = (id) => {
    instance
      .delete(`doctors/${id}`)
      .then((res) => {
        console.log(res);
      })
      .then((error) => {
        console.log("res");
        console.error(error);
      });
  };

  const onDelete = (id) => {
    deleteDatabase(id);
    getData();
    console.log("deleted id: ", id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    doctorService.deleteDoctor(id);
    setRecords(doctorService.getAllDoctors());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
    getData();
  };
  useEffect(() => {}, [responseData]);

  return (
    <>
      <PageHeader title="Doctor Manage" />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Doctors"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            // text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {responseData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                {/* <TableCell>{item.specialization}</TableCell> */}
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Doctor Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <DoctorForm
          getData={() => getData()}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
