import {
    Button, Grid, Paper, Table, TableBody, TableCell, TableContainer,
    TableRow
} from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ModalDaftarUser from 'layouts/modal/ModalDaftarUser';
import { useEffect, useState } from 'react';
  
  function DaftarUser() {
    const [daftarUser, setDaftarUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletedUserEmail, setDeletedUserEmail] = useState(null);
    const [error, setError] = useState(null);
  
    // Fetch users from API when component mounts
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }
      fetch('https://36d3-114-10-134-224.ngrok-free.app/sekertaris-users', {
        headers: {
          'Authorization': 'Bearer ' + token  
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setDaftarUser(data);
        })
        .catch(error => {
          console.error('Error fetching users:', error.message);
          // setError('Error fetching data. Please try again later.');
        });
      
    }, []);
  
    const handleConfirmDelete = () => {
      fetch(`https://36d3-114-10-134-224.ngrok-free.app/user/${deletedUserEmail}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error deleting user');
          }
          const updatedDaftarUser = daftarUser.filter(user => user.email !== deletedUserEmail);
          setDaftarUser(updatedDaftarUser);
          setIsDeleteDialogOpen(false);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    };
  
    const handleCancelDelete = () => {
      setIsDeleteDialogOpen(false);
    };
  
    const handleAddUser = (newUser) => {
      fetch('https://dcdc-140-213-1-108.ngrok-free.app/daftar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newUser)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding user');
        }
        return response.json();
      })
      .then(data => {
        setDaftarUser([...daftarUser, data]);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
    };
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <SoftBox p={2}>
                    <h1>Daftar Pengguna</h1>
                    <TableContainer component={Paper}>
                      <Table>
                        {/* <TableHead> */}
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>No. Handphone</TableCell>
                            <TableCell>Angkatan</TableCell>
                            <TableCell>Aksi</TableCell>
                          </TableRow>
                        {/* </TableHead> */}
                        <TableBody>
                          {daftarUser.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.nama}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.handphone}</TableCell>
                              <TableCell>{user.angkatan}</TableCell>
                              <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(user.email)}>Hapus</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </SoftBox>
                </Paper>
              </Grid>
            </Grid>
          </SoftBox>
          <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>Tambah Pengguna</Button>
          <ModalDaftarUser
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSubmit={handleAddUser}
    title="Tambah Pengguna"
  />
          <ConfirmationDialog
            open={isDeleteDialogOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            title="Konfirmasi Hapus"
            message="Apakah Anda yakin ingin menghapus pengguna ini?"
          />
        </SoftBox>
      </DashboardLayout>
    );
  }
  
  export default DaftarUser;
  