import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import heroImg from "../assets/HeroImg.png";
import pet1 from "../assets/dog1.png";
import pet2 from "../assets/cat1.png";
import pet3 from "../assets/rabbit1.png";
import rightLoginImg from "../assets/right_login_img.png";
import loginBackground from "../assets/login_background.png";
import { petsMasterData } from "../api/masterData";

const petsData = [
  {
    name: "Bella",
    breed: "Labrador Retriever",
    age: "2 Years",
    image: pet1,
  },
  {
    name: "Mittens",
    breed: "Domestic Shorthair",
    age: "1 Year",
    image: pet2,
  },
  {
    name: "Max",
    breed: "German Shepherd",
    age: "3 Years",
    image: pet3,
  },
  {
    name: "Luna",
    breed: "Siamese",
    age: "8 Months",
    image: pet1,
  },
];

const Home = () => {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [breeds, setBreeds] = useState("");
  const [age, setAge] = useState("");

  const getPets = async () => {
    const res = await API.get(
      `/pets?search=${search}&species=${species}&breed=${breeds}&age=${age}&page=${page}`,
    );

    setPets(res.data.data);
    setPages(res.data.pages);
  };

  useEffect(() => {
    getPets();
  }, [page]);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fdebd0, #fdf2e9)",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          height: "70vh",
          width: "100%",
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Navbar />

        {/* HERO SECTION */}
        <Container sx={{ py: 5 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold">
                Find Your New Best Friend!
              </Typography>

              <Typography sx={{ mt: 1, mb: 3 }}>
                Browse our lovable pets available for adoption.
              </Typography>

              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  placeholder="Search by name or breed..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setPage(1);
                    getPets();
                  }}
                >
                  Search
                </Button>
              </Box>

              <Box display="flex" gap={2} mt={2}>
                <TextField
                  select
                  label="Species"
                  fullWidth
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                >
                  {petsMasterData?.pets?.map((speciesData, index) => (
                    <MenuItem key={index} value={speciesData.species}>
                      {speciesData.species}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Breed"
                  fullWidth
                  value={breeds}
                  onChange={(e) => setBreeds(e.target.value)}
                >
                  {species &&
                    petsMasterData?.pets
                      ?.find((speciesData) => speciesData.species === species)
                      .breeds?.map((breed, index) => (
                        <MenuItem key={index} value={breed}>
                          {breed}
                        </MenuItem>
                      ))}
                </TextField>

                <TextField
                  select
                  label="Age"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => (
                    <MenuItem key={index} value={ele}>
                      {ele}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                },
              }}
            >
              <img
                src={rightLoginImg}
                style={{
                  width: 620,
                  height: 420,
                  position: "absolute",
                  top: "16px",
                  right: "70px",
                  zIndex: -1,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PET LIST */}
      <Container>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Available Pets for Adoption
        </Typography>

        <Grid container spacing={3}>
          {pets?.map((pet, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4} pb={5}>
          <Pagination
            color="primary"
            count={pages}
            page={page}
            onChange={(e, val) => setPage(val)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
