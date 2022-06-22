import { columns, rows } from "constants/global";
import {
  useDeleteUserMutation,
  useDeleteUserPermanentlyMutation,
  useGetDeletedUserQuery,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import Swal from "sweetalert2";
import { postUserInfo } from "features/slice";

function Trash(props) {
  const dispatch = useDispatch();
  const trashListStorage = useSelector((state) => state.app.trashList);

  const { data, error, isLoading, isSuccess } = useGetDeletedUserQuery();
  const [deleteUserPermanently] = useDeleteUserPermanentlyMutation();
  const [postNewUser] = usePostNewUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    if (isSuccess) {
      setRow(data);
      if (trashListStorage.length !== 0) {
        trashListStorage.forEach((element) => {
          const newRow = row.push(element);
          setRow(newRow);
        });
      }
    }
  }, [isSuccess]);

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleRestoreUser = () => {
    Swal.fire({
      title: `Are you sure to restore this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const difElement = checkDiffElement;
        const sameElement = checkSameElement;
        dispatch(postUserInfo(sameElement));
        sameElement.forEach((item) => {
          const { id, ...rest } = item;
          deleteUserPermanently(item.id);
          postNewUser({ ...rest });
        });
        setRow(difElement);
        Swal.fire("Restored!", "", "success");
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user permanently?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it permanently!",
    }).then((result) => {
      if (result.isConfirmed) {
        const difElement = checkDiffElement;
        const sameElement = checkSameElement;
        dispatch(postUserInfo(sameElement));
        sameElement.forEach((item) => {
          deleteUserPermanently(item.id);
        });
        setRow(difElement);
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const onSelectionModelChange = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowData = row.filter((row1) => selectedIDs.has(row1.id));
    setSelectedRow(selectedRowData);
    console.log("selectedRowData trash", selectedRowData);
  };

  if (isLoading) return <Loading />;
  else
    return (
      <div style={{ height: 400, width: "100%" }}>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            // background: "#000",
          }}
        >
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600, marginRight: "1em" }}
            onClick={() => handleRestoreUser()}
            disabled={selectedRow.length === 0}
          >
            Restore
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser()}
            variant="contained"
            color="error"
            sx={{ fontWeight: 600 }}
            disabled={selectedRow.length === 0}
          >
            Delete
          </Button>
        </div>
        <DataGrid
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
}

export default Trash;
