import { Box, Grid, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../api/axios";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    available: 0,
    applied: 0,
    approved: 0,
    rejected: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getStats = async () => {
    try {
      const petsRes = await API.get(
        `/pets?status=available&userId=${user._id}`,
      );

      const appRes = await API.get("/adoptions/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const apps = appRes.data.data;

      setStats({
        available: petsRes.data.total,
        applied: apps.length,
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
    <>
      <Typography
        variant="h4"
        mb={4}
        fontWeight="bold"
        textAlign={{ xs: "center", md: "left" }}
      >
        User Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        {/* Card 1 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 200,
              width: 400,
              borderRadius: 4,
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign="center">
              <Typography variant="h5">Available Pets</Typography>
              <Typography variant="h2" fontWeight="bold">
                {stats.available}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 200,
              width: 400,
              borderRadius: 4,
              bgcolor: "#fff3e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign="center">
              <Typography variant="h5">Applied</Typography>
              <Typography variant="h2" fontWeight="bold">
                {stats.applied}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 200,
              width: 400,
              borderRadius: 4,
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign="center">
              <Typography variant="h5">Approved</Typography>
              <Typography variant="h2" fontWeight="bold">
                {stats.approved}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 4 */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 200,
              width: 400,
              borderRadius: 4,
              bgcolor: "#ffebee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign="center">
              <Typography variant="h5">Rejected</Typography>
              <Typography variant="h2" fontWeight="bold">
                {stats.rejected}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDashboard;
