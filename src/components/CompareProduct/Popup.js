import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "./CompareProduct.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useSearchParams } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "brand", headerName: "Brand", width: 130 },
];

function Popup({ popUp, setPopUp, data,itemData, setItemData }) {
    const [rowItem, setRowItem] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    let params = searchParams.get("id");
    const onSelectRow = (e) => {
        console.log(e)
        const temp = rowItem.filter((item)=> e?.id !==  item?.id )
        if(rowItem.length !== temp.length)
        setRowItem(temp);
        else
        setRowItem((val)=>[...val, data[e?.id - 1]]);

    }
  const addItem = () => {
    console.log(data)
    if(itemData.length <= 4 && rowItem.length <= 3)
    setItemData((val)=>[...val, ...rowItem]);
    else
    alert("cannot add more than 3 items")
    handleClose();
  };
  const handleClose = () => {
    setPopUp(false);
  };
  return (
    <Dialog
      open={popUp}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Select a Product"}
        <button
          className={classes.button}
          onClick={(e) => {
            addItem(e);
          }}
          style={{ marginLeft: "2vw" }}
        >
          Add
        </button>
       
        <button
          className={classes.button}
          onClick={() => {
            handleClose();
          }}
          style={{ marginLeft: "2vw" }}
        >
          Close
        </button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ height: 400, width: "40vw" }}>
            <DataGrid
              rows={data.filter((item)=> params != item?.id )}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onRowClick ={(rowKey)=> {onSelectRow(rowKey)}}
            />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
