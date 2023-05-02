import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Bookings.css';
import Chip from '@mui/material/Chip';

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

const rows = [
  createData("Room1", "04/20/2023", "12:00", "15:00", ["Projector"]),
  createData("Room2", "04/20/2023", "12:00", "19:00", ["Air Conditioning"]),
  createData("Room3", "04/21/2023", "12:00", "15:00", ["Snacks", "Beverages"]),
  createData("Room1", "04/20/2023", "12:00", "15:00", ["Snacks"]),
  createData("Room5", "04/22/2023", "16:00", "15:00", ["Beverages"]),
  createData("Room7", "04/28/2023", "16:10", "15:00", ["Projector"]),
  createData("Room2", "04/29/2023", "12:00", "15:00", ["Air Conditioning"]),
  createData("Room1", "04/30/2023", "12:00", "15:00", ["Air Conditioning"])
];

export default function Bookings() {
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