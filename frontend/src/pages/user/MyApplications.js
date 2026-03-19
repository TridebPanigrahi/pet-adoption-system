import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const MyApplications = () => {
  const [apps, setApps] = useState([]);

  const token = localStorage.getItem("token");

  const getApplications = async () => {
    try {
      const res = await API.get("/adoptions/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setApps(res.data.data);
    } catch (err) {
      toast.error("Error loading applications");
    }
  };

  const withdrawApplication = async (id) => {
    try {
      await API.delete(`/adoptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Application Withdrawn");
      getApplications();
    } catch (err) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const statusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        My Applications
      </Typography>

      {apps.length === 0 ? (
        <Typography>No Applications Yet</Typography>
      ) : (
        <Grid container spacing={3}>
          {apps.map((app) => (
            <Grid item md={4} key={app._id}>
              <Card sx={{ borderRadius: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={app.pet?.image}
                />

                <CardContent>
                  <Typography variant="h6">{app.pet?.name}</Typography>

                  <Typography>Breed: {app.pet?.breed}</Typography>

                  <Chip
                    label={app.status}
                    color={statusColor(app.status)}
                    sx={{ mt: 1 }}
                  />

                  {app.status === "pending" && (
                    <Button
                      fullWidth
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => withdrawApplication(app._id)}
                    >
                      Withdraw
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyApplications;
