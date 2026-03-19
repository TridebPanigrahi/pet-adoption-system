import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPets: 0,
    available: 0,
    adopted: 0,
    totalApplications: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const token = localStorage.getItem("token");

  const getStats = async () => {
    try {
      const petRes = await API.get("/pets");
      const appRes = await API.get("/adoptions/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const pets = petRes.data.data;
      const apps = appRes.data.data;

      setStats({
        totalPets: pets.length,
        available: pets.filter((p) => p.status === "available").length,
        adopted: pets.filter((p) => p.status === "adopted").length,
        totalApplications: apps.length,
        pending: apps.filter((a) => a.status === "pending").length,
        approved: apps.filter((a) => a.status === "approved").length,
        rejected: apps.filter((a) => a.status === "rejected").length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Admin Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
        alignItems="stretch"
        display="flex"
        // justifyContent="center"
      >
        {/* Card 1 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Total Pets</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.totalPets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Available Pets</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.available}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#ffebee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Adopted Pets</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.adopted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 4 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#fff3e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Total Applications</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.totalApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 5 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#fff8e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 6 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Approved</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 7 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 180,
              width: 360,
              borderRadius: 4,
              bgcolor: "#ffebee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Rejected</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
