import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from '../NavBar/NavBar';
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './Dashboard.css';
import MeetingRoomCard from '../MeetingCard/MeetingRoomCard';
import format from 'date-fns/format';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Bookings from '../Bookings/Bookings';

interface LinkTabProps {
    label?: string;
    href?: string;
}

const rooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
    { id: 4, name: 'Room 4' },
    { id: 5, name: 'Room 5' },
    { id: 6, name: 'Room 6' },
];

function Dashboard() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [checkInDate, setCheckInDate] = useState<Dayjs | null>();
    const [checkinDateString,setCheckInDateString] = useState<string>(""); 

    const [checkInTime, setcheckInTime] = useState<Dayjs | null>();
    const [checkinTimeString,setCheckInTimeString] = useState<string>(""); 

    const [checkOutTime, setcheckOutTime] = useState<Dayjs | null>();
    const [checkOutTimeString,setCheckOutTimeString] = useState<string>(""); 

    const handleCheckInDateChange = (date: any) => {
        // const formattedCheckInDate = format(checkInDate, 'yyyy-MM-dd');
        setCheckInDate(date);
        //onsole.log(date);
    };

    const handleSearchClick = () => {
        if (checkInDate != null  && checkInTime != null && checkOutTime != null)
        {
            setCheckInDateString(checkInDate.format('DD-MM-YYYY'));
            console.log(checkinDateString);
            setCheckInTimeString(checkInTime.format('HH:mm'));
            setCheckOutTimeString(checkOutTime.format('HH:mm'));
            console.log(checkinTimeString);
            console.log(checkOutTimeString);
        }
        

        // const formattedCheckInDate = format(checkInDate, 'yyyy-MM-dd');
        // const formattedCheckOutDate = format(checkOutDate, 'yyyy-MM-dd');
        // console.log(`Searching for availability between ${formattedCheckInDate} and ${formattedCheckOutDate}`);
    };

    return (
        <div>
            < NavBar />
            <div className='all-container'>
                <div className='app-name'>
                    <Typography variant="h2">
                        Meeting Room Scheduler
                    </Typography>
                </div>
                <div>
                    <div className='searchAvailableRooms-container'>
                        <Card className="card">
                            <CardContent>
                                <div className="content">
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateField']}>
                                                <DateField label="Meeting Date"
                                                    className="date-container"
                                                    value={checkInDate}
                                                    onChange={(newValue) => handleCheckInDateChange(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="indiv-time-container">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Check In"
                                                    className="indiv-time"
                                                    value={checkInTime}
                                                    onChange={(newValue) => setcheckInTime(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="indiv-time-container">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Check Out"
                                                    className="indiv-time"
                                                    value={checkOutTime}
                                                    onChange={(newValue) => setcheckOutTime(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="searchButton">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SearchIcon />}
                                            onClick={handleSearchClick}
                                            fullWidth
                                            className='search-btn'
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='tab-container'>
                    <Box sx={{ width: '100%', typography: 'body1', borderRadius: "12px", border: "4px" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', borderRadius: "12px" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab style={{ minWidth: "50%" }} label="Available Rooms" value="1" />
                                    <Tab style={{ minWidth: "50%" }} label="Your Bookings" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    {rooms.map((room: any) => (
                                        <Grid item xs={6} sm={4} md={3} key={room.id}>
                                            <Paper sx={{ p: 2, backgroundColor: "tomato", minHeight: "fit-content" }}>
                                                <MeetingRoomCard name={room.name} date={"checkInDate"} checkin={''} checkout={''} />
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Bookings />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;