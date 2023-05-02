import Button from "@mui/material/Button";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import "./MeetingRoomCard.css";

type MeetingRoomProps = {
  name: string;
  date: string;
  checkin: string;
  checkout: string;
};

const MeetingRoomCard = ({ name }: MeetingRoomProps) => {
  const [beverages, setBeverages] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const [projector, setProjector] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);

  const handleBeveragesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeverages(event.target.checked);
  };

  const handleSnacksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnacks(event.target.checked);
  };

  const handleProjectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjector(event.target.checked);
  };

  const handleAirConditioningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAirConditioning(event.target.checked);
  };

  const handleBookClick = async () => {
    try {
      const response = await fetch("https://example.com/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingRoomName: name,
          addons: { beverages, snacks, projector, airConditioning },
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className="meeting-card">
      <CardHeader title={name} />
      <div className="content">
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={beverages} onChange={handleBeveragesChange} />}
            label="Beverages"
          />
          <FormControlLabel
            control={<Checkbox checked={snacks} onChange={handleSnacksChange} />}
            label="Snacks"
          />
          <FormControlLabel
            control={<Checkbox checked={projector} onChange={handleProjectorChange} />}
            label="Projector"
          />
          <FormControlLabel
            control={<Checkbox checked={airConditioning} onChange={handleAirConditioningChange} />}
            label="Air Conditioning"
          />
          <div className="bookButton">
            <Button variant="contained" color="primary" onClick={handleBookClick}>
              Book
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MeetingRoomCard;
