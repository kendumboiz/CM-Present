import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/addUser";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { Field } from "components/Custom/InputField";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { addUser } from "features/slice";
import { usePostNewUserMutation } from "services/userServices";

export default function AddUserForm({ open, setOpen }) {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: `${mode === "dark" ? "#121212" : "background.paper"}`,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [postNewUser] = usePostNewUserMutation();

  const handleClose = () => setOpen(false);
  const handleAddUser = (values, { setSubmitting }) => {
    dispatch(addUser(values));
    postNewUser(values);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      Swal.fire("Added user successfully!", "", "success");
    }, 1500);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Formik
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                handleAddUser(values, { setSubmitting });
              }}
            >
              {(formikProps) => {
                const {
                  isSubmitting,
                  isValid,
                  values,
                  touched,
                  errors,
                  handleChange,
                } = formikProps;
                return (
                  <Form>
                    <Field
                      name="firstName"
                      label={languages === "VN" ? "T??n h???" : "First name"}
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                    />

                    <Field
                      name="lastName"
                      label={languages === "VN" ? "T??n cu???i" : "Last name"}
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                    />

                    <Field
                      name="email"
                      label="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                    />

                    <Field
                      name="age"
                      label={languages === "VN" ? "Tu???i" : "Age"}
                      type="text"
                      value={values.age}
                      onChange={handleChange}
                      error={touched.age && Boolean(errors.age)}
                    />

                    <Field
                      name="role"
                      label={languages === "VN" ? "Ch???c v???" : "Role"}
                      type="text"
                      value={values.role}
                      onChange={handleChange}
                      error={touched.role && Boolean(errors.role)}
                    />

                    <Field
                      name="team"
                      label={languages === "VN" ? "Nh??m" : "Team"}
                      type="text"
                      value={values.team}
                      onChange={handleChange}
                      error={touched.team && Boolean(errors.team)}
                    />

                    <Field
                      name="project"
                      label={languages === "VN" ? "D??? ??n" : "Projects"}
                      type="text"
                      value={values.project}
                      onChange={handleChange}
                      error={touched.project && Boolean(errors.project)}
                    />

                    <Box
                      sx={{
                        margin: "1em auto",
                        display: "flex",
                        justifyContent: "center",

                        ":disabled": {
                          background: `${
                            mode === "dark" ? "rgba(255, 255, 255, 0.12)" : ""
                          }`,
                          color: `${
                            mode === "dark" ? "rgba(255, 255, 255, 0.5)" : ""
                          }`,
                        },
                      }}
                    >
                      <Button
                        disabled={isSubmitting || !isValid}
                        variant="contained"
                        type="submit"
                      >
                        {isSubmitting ? <CircularProgress size={25} /> : "Add"}
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
