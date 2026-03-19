import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [pets, setPets] = useState([]);
  const [apps, setApps] = useState([]);

  const token = localStorage.getItem("token");

  const getPets = async () => {
    const res = await API.get("/pets?status=available");
    setPets(res.data.data);
  };

  const getApplications = async () => {
    const res = await API.get("/adoptions/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setApps(res.data.data || []);
  };

  console.log("apps:", apps);

  const applyPet = async (id) => {
    try {
      await API.post(
        `/adoptions/apply/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Applied Successfully");
      getApplications();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getPets();
    getApplications();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Available Pets
      </Typography>

      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item md={4} key={pet._id}>
            <Card>
              <CardMedia component="img" height="180" image={pet.image} />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography>Breed: {pet.breed}</Typography>
                <Typography>Age: {pet.age}</Typography>

                <Button
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => applyPet(pet._id)}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" mt={6} mb={2}>
        My Adoption Applications
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apps.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.pet?.name}</TableCell>
                <TableCell>
                  <Chip label={app.status} color="warning" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserDashboard;
