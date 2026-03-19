import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const PetDetails = () => {
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [applied, setApplied] = useState(false);

  const token = localStorage.getItem("token");

  const getPet = async () => {
    const res = await API.get(`/pets/${id}`);
    setPet(res.data.data);
  };

  const checkApplied = async () => {
    if (!token) return;

    const res = await API.get("/adoptions/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const exist = res.data?.data.find((a) => a.pet?._id === id);
    if (exist) setApplied(true);
  };

  const applyPet = async () => {
    try {
      await API.post(
        `/adoptions/apply/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Application Submitted");
      setApplied(true);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getPet();
    checkApplied();
  }, [id]);

  if (!pet) return <Typography p={5}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* IMAGE */}
          <Grid item md={6}>
            <img
              src={pet.image}
              alt={pet.name}
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Grid>

          {/* DETAILS */}
          <Grid item md={6}>
            <Typography variant="h3" fontWeight="bold">
              {pet.name}
            </Typography>

            <Typography mt={2}>Species: {pet.species}</Typography>
            <Typography>Breed: {pet.breed}</Typography>
            <Typography>Age: {pet.age}</Typography>

            <Chip
              label={pet.status}
              color={pet.status === "available" ? "success" : "warning"}
              sx={{ mt: 2 }}
            />

            <Box mt={4}>
              <Button
                variant="contained"
                size="large"
                disabled={applied || pet.status === "adopted"}
                onClick={applyPet}
              >
                {applied ? "Already Applied" : "Apply for Adoption"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PetDetails;
