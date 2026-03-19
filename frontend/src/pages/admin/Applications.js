import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* VALIDATION */
const schema = yup.object({
  status: yup.string().required(),
});

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [open, setOpen] = useState(false);
  const [appId, setAppId] = useState(null);

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getApplications = async () => {
    const res = await API.get("/adoptions/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setApps(res.data.data);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const openModal = (app) => {
    setAppId(app._id);
    reset({ status: app.status });
    setOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      await API.put(`/adoptions/${appId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Application Updated");
      setOpen(false);
      getApplications();
    } catch (err) {
      toast.error("Error updating");
    }
  };

  const statusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Adoption Applications
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Pet</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apps.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.user?.name}</TableCell>
                <TableCell>{app.pet?.name}</TableCell>

                <TableCell>
                  <Chip label={app.status} color={statusColor(app.status)} />
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={app.status !== "pending"}
                    onClick={() => openModal(app)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* UPDATE STATUS MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Status</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
              width: 350,
            }}
          >
            <TextField
              select
              label="Status"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="approved">Approve</MenuItem>
              <MenuItem value="rejected">Reject</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Applications;
