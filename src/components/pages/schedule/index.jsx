import DatePicker from "../../molecules/datepicker";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TodayIcon from "@mui/icons-material/Today";

const PersonalSchedule = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 1100 }}>
      <div className="row-item">
        <Stack spacing={2} direction="row">
          <Button variant="outlined">None</Button>
          <Button variant="outlined">15 min</Button>
          <Button variant="outlined">30 min</Button>
          <Button variant="outlined">1 hour</Button>
          <Button variant="outlined">2 hours</Button>
        </Stack>
      </div>
      <div className="row-item">
        <Stack spacing={2} direction="row">
          <Button variant="outlined">This week</Button>
          <Button variant="outlined">Next week</Button>
          <Button variant="outlined">Week after</Button>
          <Button variant="outlined">
            <TodayIcon />
          </Button>
        </Stack>
      </div>
      <DatePicker />
    </Box>
  );
};

export default PersonalSchedule;
