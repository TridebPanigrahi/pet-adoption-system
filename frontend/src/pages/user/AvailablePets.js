import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const AvailablePets = () => {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const getPets = async () => {
    try {
      const res = await API.get(
        `/pets?status=available&userId=${user._id}&page=${page}`,
      );

      setPets(res.data.data);
      setPages(res.data.pages);
    } catch (err) {
      toast.error("Error loading pets");
    }
  };

  const applyPet = async (id) => {
    try {
      await API.post(
        `/adoptions/apply/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Application Submitted");
      getPets();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getPets();
  }, [page]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Available Pets
      </Typography>

      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item md={4} key={pet._id}>
            <Card
              sx={{
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardMedia component="img" height="200" image={pet.image} />

              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>

                <Typography>Breed: {pet.breed}</Typography>

                <Typography>Age: {pet.age}</Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => applyPet(pet._id)}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, val) => setPage(val)}
        />
      </Box>
    </Box>
  );
};

export default AvailablePets;
