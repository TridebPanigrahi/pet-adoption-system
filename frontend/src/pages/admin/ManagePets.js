import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* VALIDATION */
const schema = yup.object({
  name: yup.string().required("Name required"),
  species: yup.string().required("Species required"),
  breed: yup.string().required("Breed required"),
  age: yup.number().typeError("Age must be number").required(),
  //   image: yup.string().url("Invalid URL").required(),
});

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getPets = async () => {
    const res = await API.get("/pets");
    setPets(res.data.data);
  };

  useEffect(() => {
    getPets();
  }, []);

  const onSubmit = async (data) => {
    try {
      debugger;
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("species", data.species);
      formData.append("age", data.age);
      formData.append("breed", data.breed);
      formData.append("image", data.image[0]);

      if (editId) {
        await API.put(`/pets/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        });
        toast.success("Pet Updated Successfully");
      } else {
        await API.post("/pets", formData, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        });
        toast.success("Pet Added Successfully");
      }

      setOpen(false);
      setEditId(null);
      reset();
      getPets();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (pet) => {
    setEditId(pet._id);
    reset(pet);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await API.delete(`/pets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Pet Deleted");
    getPets();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Manage Pets</Typography>

        <Button
          variant="contained"
          onClick={() => {
            reset();
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Pet
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet._id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.species}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>
                  <Chip
                    label={pet.status}
                    color={pet.status === "available" ? "success" : "warning"}
                  />
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleEdit(pet)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(pet._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* MODAL FORM */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Pet" : "Add Pet"}</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
              width: 400,
            }}
          >
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Species"
              {...register("species")}
              error={!!errors.species}
              helperText={errors.species?.message}
            />

            <TextField
              label="Breed"
              {...register("breed")}
              error={!!errors.breed}
              helperText={errors.breed?.message}
            />

            <TextField
              label="Age"
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />

            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                {...register("image", { required: "Image required" })}
              />
            </Button>
            <Typography variant="caption" color="error">
              {errors.image?.message}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit">
              {editId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ManagePets;
