import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./NavBar.css"

interface NavbarProps {}

const NavBar: React.FC<NavbarProps> = () => {
    const navigate = useNavigate();
    const onHome = () => {
        navigate('/searchAvailableRooms');
    };
    const onFeedback = () => {
        navigate('/giveFeedback');
    };
    const handleSignOut = () => {
        navigate('/');
      };
    return (
        <nav>
            <div className="logo">
                <Button variant="text" onClick={onHome}>
                    <Typography variant="h6" color="white">
                        RMS
                    </Typography>
                </Button>
                <Button variant="text" onClick={onFeedback}>
                    <Typography variant="h6" color="white">
                        Feedback
                    </Typography>
                </Button>
            </div>
            <div className="right">
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default NavBar;
