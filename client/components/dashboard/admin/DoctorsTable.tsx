'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditDoctorModal from './EditDoctorModal';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';


const columns = [
  { id: 'profile', label: 'Profile', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'contact', label: 'Contact', minWidth: 100 },
  { id: 'timing', label: 'Timing', minWidth: 100 },
  { id: 'specialization', label: 'Specialization', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'right' },
];

export default function DoctorsTable({ doctors }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async(doctor: {}) => {
    console.log(doctor);
    const userId=doctor.userId._id;
    const doctorId=doctor._id;

    try {
      const res = await axios.delete(`${API_BASE_URL}/doctors/delete/${userId}/${doctorId}`);
      console.log(res.data);
      handleDoctorUpdated();
      
    } catch (error) {
      
    }
  };

  const handleDoctorUpdated = () => {
    // Logic to refresh the doctor list after editing, e.g., refetching the list of doctors from the API
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={doctor.userId._id}>
                  <TableCell>
                    <img
                      src={doctor.userId.profile}
                      alt="Profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{doctor.userId.firstName} {doctor.userId.lastName}</TableCell>
                  <TableCell>{doctor.userId.email}</TableCell>
                  <TableCell>{doctor.userId.contactNumber}</TableCell>
                  <TableCell>
                    {doctor.availability?.startTime} - {doctor.availability?.endTime}
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell align="right">
                    <EditDoctorModal
                      doctorId={doctor}
                      onDoctorUpdated={handleDoctorUpdated}
                    />
                    <Button
                      onClick={() => handleDelete(doctor)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
