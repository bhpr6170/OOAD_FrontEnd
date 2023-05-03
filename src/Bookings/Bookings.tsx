import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import './Bookings.css';
import Chip from '@mui/material/Chip';
import React from 'react';
import { Book } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  date: string,
  checkin: string,
  checkout: string,
  addons: string[],
) {
  return { name, date, checkin, checkout, addons };
}


function Bookings() {

  const [rows, setRows] = React.useState<{name: string, date: string, checkin: string, checkout: string, addons: string[]}[]>([]);
  const [userId, setUserID] = useState<string | null>('');
  var response;

  useEffect(() => {
    setUserID(window.localStorage.getItem('userId'))
  }, []);

  (async () => {
    console.log(userId);
    response = await fetch(`http://localhost:8080/api/meeting/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });

            if(response.ok)
            {
                var rowsTemp: { name: string; date: string; checkin: string; checkout: string; addons: string[] }[] = [];
                var searchResponse = await response.json();
                searchResponse.forEach((element: {addons: string, date: string, endTime: string, meetingId: string, roomId: number, startTime: string, userId: number}) => { 
                  rowsTemp.push(createData("Room "+ element['roomId'], element['date'], element['startTime'], element['endTime'], element['addons'].split(',')));
                });
                setRows(rowsTemp);
          
            }
            else{
                console.log("API Error:" + response);
            }
})();
  

            
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Room Name</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Check In</StyledTableCell>
            <StyledTableCell align="center">Check Out</StyledTableCell>
            <StyledTableCell align="center">Add Ons</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.checkin}</StyledTableCell>
              <StyledTableCell align="center">{row.checkout}</StyledTableCell>
              <StyledTableCell align="center">
                {row.addons.map((data: any) => {
                  return (
                    <Chip style={{ margin: "2px" }} label={data} color="success" variant="outlined" />
                  );
                })}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Bookings;