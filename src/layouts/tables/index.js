import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ModalSuratMasuk from 'layouts/modal/ModalSuratMasuk';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function SuratMasuk({ onSuratMasukCountChange }) {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletedSuratId, setDeletedSuratId] = useState(null);
  const lastIdRef = useRef(0);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch data on component mount
  useEffect(() => {
    const fetchSuratMasuk = async () => {
      try {
        const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/suratmasuk/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming token is stored in localStorage
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching surat masuk');
        }

        const data = await response.json();
        setSuratMasuk(data);
      } catch (error) {
        console.error('Failed to fetch surat masuk:', error);
        navigate('/dashboard'); // Redirect to /dashboard on error
      }
    };

    fetchSuratMasuk();
  }, [navigate]);

  useEffect(() => {
    if (onSuratMasukCountChange) {
      onSuratMasukCountChange(suratMasuk.length);
    }
  }, [suratMasuk, onSuratMasukCountChange]);

  const handleDelete = (id) => {
    setDeletedSuratId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const suratToDelete = suratMasuk.find((surat) => surat.id === deletedSuratId);
    if (!suratToDelete) return;

    try {
      const response = await fetch(`https://fc78-140-213-217-40.ngrok-free.app/suratmasuk/delete/${suratToDelete.nomor}/${suratToDelete.perihal}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error deleting surat masuk');
      }

      const updatedSuratMasuk = suratMasuk.filter((surat) => surat.id !== deletedSuratId);
      // Reset IDs to be sequential
      const resetIdsSuratMasuk = updatedSuratMasuk.map((surat, index) => ({
        ...surat,
        id: index + 1,
      }));
      setSuratMasuk(resetIdsSuratMasuk);
      lastIdRef.current = resetIdsSuratMasuk.length;
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete surat masuk:', error);
      setError('Error deleting surat masuk. Please try again later.');
      navigate('/dashboard'); // Redirect to /dashboard on error
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddOrUpdateSuratMasuk = async (newSuratMasuk) => {
    const formData = new FormData();
    formData.append('nomor', newSuratMasuk.nomor);
    formData.append('tanggal', newSuratMasuk.tanggal);
    formData.append('perihal', newSuratMasuk.perihal);
    formData.append('asal', newSuratMasuk.asal);
    if (newSuratMasuk.file) {
      formData.append('file', newSuratMasuk.file);
    }

    const url = selectedSurat
      ? `https://fc78-140-213-217-40.ngrok-free.app/suratmasuk/${selectedSurat.nomor}`
      : 'https://fc78-140-213-217-40.ngrok-free.app/suratmasuk';

    const method = selectedSurat ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error ${selectedSurat ? 'updating' : 'creating'} surat masuk`);
      }

      const data = await response.json();
      const updatedSuratMasuk = selectedSurat
        ? suratMasuk.map(surat => (surat.nomor === selectedSurat.nomor && surat.asal === selectedSurat.asal ? data : surat))
        : suratMasuk.concat(data);

      setSuratMasuk(updatedSuratMasuk);
      lastIdRef.current = updatedSuratMasuk.length;
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to ${selectedSurat ? 'update' : 'add'} surat masuk:`, error);
    }
  };

  const handleEdit = (surat) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid item xs={12}>
            <Paper>
              <SoftBox p={2}>
                <h1>Daftar Surat Masuk</h1>
                <TableContainer>
                  <Table>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nomor</TableCell>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Perihal</TableCell>
                      <TableCell>Asal</TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                    <TableBody>
                      {suratMasuk.map((surat) => (
                        <TableRow key={surat.id}>
                          <TableCell>{surat.id}</TableCell>
                          <TableCell>{surat.nomor}</TableCell>
                          <TableCell>{surat.tanggal}</TableCell>
                          <TableCell>{surat.perihal}</TableCell>
                          <TableCell>{surat.asal}</TableCell>
                          <TableCell>
                            {surat.file ? (
                              <a href={surat.file} target="_blank" rel="noopener noreferrer">
                                {surat.file}
                              </a>
                            ) : 'No file uploaded'}
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(surat.id)}>Hapus</Button>
                            <Button variant="contained" color="primary" onClick={() => handleEdit(surat)}>Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SoftBox>
            </Paper>
          </Grid>
        </SoftBox>
        <Button variant="contained" color="primary" onClick={() => { setIsModalOpen(true); setSelectedSurat(null); }}>Tambah Surat Masuk</Button>
        <ModalSuratMasuk
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdateSuratMasuk}
          title={selectedSurat ? "Edit Surat Masuk" : "Tambah Surat Masuk"}
          initialValues={selectedSurat}
        />
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus surat ini?"
        />
      </SoftBox>
    </DashboardLayout>
  );
}

SuratMasuk.propTypes = {
  onSuratMasukCountChange: PropTypes.func.isRequired,
};

export default SuratMasuk;
