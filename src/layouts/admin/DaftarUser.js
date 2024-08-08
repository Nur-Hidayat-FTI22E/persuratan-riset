import {
  Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow
} from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ModalDaftarUser from 'layouts/modal/ModalDaftarUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DaftarUser() {
  const [daftarUser, setDaftarUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletedUserEmail, setDeletedUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchDaftarUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }

      try {
        const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ /* data yang diperlukan, jika ada */ })
        });

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setDaftarUser(data);
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
        navigate('/dashboard'); // Redirect to /dashboard
        alert('Tidak memiliki izin. Silahkan akses seadanya.');
      }
    };

    fetchDaftarUser();
  }, []);

  const handleDelete = (email) => {
    setDeletedUserEmail(email);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`https://fc78-140-213-217-40.ngrok-free.app/user/${deletedUserEmail}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting user');
        }
        return response.json(); // Assuming the response body contains JSON
      })
      .then(() => {
        const updatedDaftarUser = daftarUser.filter(user => user.email !== deletedUserEmail);
        setDaftarUser(updatedDaftarUser);
        setIsDeleteDialogOpen(false);
      })
      .catch(error => {
        console.error('Error deleting user:', error.message);
      });
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddOrUpdateUser = async (newUser) => {
    try {
      const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/daftar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Error adding user');
      }

      const data = await response.json();
      const updatedDaftarUser = selectedUser
        ? daftarUser.map(user => (user.email === data.email ? data : user))
        : [...daftarUser, data];
      setDaftarUser(updatedDaftarUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add/update user:', error.message);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nama</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>No. Handphone</TableCell>
                        <TableCell>Angkatan</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
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
                              {/* <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>Edit</Button> */}
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
        <Button variant="contained" color="primary" onClick={() => { setIsModalOpen(true); setSelectedUser(null); }}>Tambah Pengguna</Button>
        <ModalDaftarUser
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdateUser}
          title={selectedUser ? "Edit Pengguna" : "Tambah Pengguna"}
          initialValues={selectedUser}
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