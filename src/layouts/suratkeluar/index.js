import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ModalSuratKeluar from 'layouts/modal/ModalSuratKeluar';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SuratKeluar({ onSuratKeluarCountChange }) {
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletedSuratId, setDeletedSuratId] = useState(null);
  const lastIdRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuratKeluar = async () => {
      try {
        const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/suratkeluar/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching surat keluar');
        }

        const data = await response.json();
        setSuratKeluar(data);
      } catch (error) {
        console.error('Failed to fetch surat keluar:', error);
        //navigate('/dashboard'); 
      }
    };

    fetchSuratKeluar();
  }, [navigate]);

  useEffect(() => {
    if (onSuratKeluarCountChange) {
      onSuratKeluarCountChange(suratKeluar.length);
    }
  }, [suratKeluar, onSuratKeluarCountChange]);

  const handleDelete = (id) => {
    setDeletedSuratId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const suratToDelete = suratKeluar.find((surat) => surat.id === deletedSuratId);
    if (!suratToDelete) return;

    try {
      const response = await fetch(`https://fc78-140-213-217-40.ngrok-free.app/suratkeluar/delete/${suratToDelete.nomor}/${suratToDelete.perihal}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error deleting surat keluar');
      }

      const updatedSuratKeluar = suratKeluar.filter((surat) => surat.id !== deletedSuratId);
      const resetIdsSuratKeluar = updatedSuratKeluar.map((surat, index) => ({
        ...surat,
        id: index + 1,
      }));
      setSuratKeluar(resetIdsSuratKeluar);
      lastIdRef.current = resetIdsSuratKeluar.length;
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete surat keluar:', error);
      setError('Error deleting surat keluar. Please try again later.');
      // navigate('/dashboard');
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddOrUpdateSuratKeluar = async (newSuratKeluar) => {
    const formData = new FormData();
    formData.append('nomor', newSuratKeluar.nomor);
    formData.append('tanggal', newSuratKeluar.tanggal);
    formData.append('perihal', newSuratKeluar.perihal);
    formData.append('ditujukan', newSuratKeluar.ditujukan);
    if (newSuratKeluar.file) {
      formData.append('file', newSuratKeluar.file);
    }

    const url = selectedSurat
      ? `https://fc78-140-213-217-40.ngrok-free.app/suratkeluar/${selectedSurat.nomor}`
      : `https://fc78-140-213-217-40.ngrok-free.app/suratkeluar`;

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
        throw new Error(`Error ${selectedSurat ? 'updating' : 'creating'} surat keluar`);
      }

      const data = await response.json();
      const updatedSuratKeluar = selectedSurat
        ? suratKeluar.map(surat => (surat.nomor === selectedSurat.nomor && surat.ditujukan === selectedSurat.ditujukan ? data : surat))
        : suratKeluar.concat(data);

      setSuratKeluar(updatedSuratKeluar);
      lastIdRef.current = updatedSuratKeluar.length;
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to ${selectedSurat ? 'update' : 'add'} surat keluar:`, error);
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
                <h1>Daftar Surat Keluar</h1>
                <TableContainer>
                  <Table>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nomor</TableCell>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Perihal</TableCell>
                      <TableCell>Ditujukan</TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                    <TableBody>
                      {suratKeluar.map((surat) => (
                        <TableRow key={surat.id}>
                          <TableCell>{surat.id}</TableCell>
                          <TableCell>{surat.nomor}</TableCell>
                          <TableCell>{surat.tanggal}</TableCell>
                          <TableCell>{surat.perihal}</TableCell>
                          <TableCell>{surat.ditujukan}</TableCell>
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
        <Button variant="contained" color="primary" onClick={() => { setIsModalOpen(true); setSelectedSurat(null); }}>Tambah Surat Keluar</Button>
        <ModalSuratKeluar
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdateSuratKeluar}
          title={selectedSurat ? "Edit Surat Keluar" : "Tambah Surat Keluar"}
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

SuratKeluar.propTypes = {
  onSuratKeluarCountChange: PropTypes.func.isRequired,
};

export default SuratKeluar;
