import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PetCard({ pet }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" height="180" image={pet.image} />

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {pet.name}
        </Typography>

        <Typography variant="body2">
          <b>Breed:</b> {pet.breed}
        </Typography>

        <Typography variant="body2">
          <b>Age:</b> {pet.age}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/pet/${pet._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
