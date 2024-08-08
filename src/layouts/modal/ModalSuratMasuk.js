import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ModalSuratMasuk = ({ isOpen, onClose, onSubmit, title, initialValues }) => {
  const [formData, setFormData] = useState({
    nomor: '',
    tanggal: '',
    perihal: '',
    asal: '',
    file: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData({
        id: '',
        nomor: '',
        tanggal: '',
        perihal: '',
        asal: '',
        file: null,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      // Handle file separately
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="nomor"
          fullWidth
          placeholder="Nomor Surat"
          value={formData.nomor}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="tanggal"
          fullWidth
          placeholder="Tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          type="date"
        />
        <TextField
          margin="dense"
          name="perihal"
          fullWidth
          placeholder="Perihal"
          value={formData.perihal}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="asal"
          fullWidth
          placeholder="Asal"
          value={formData.asal}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="file"
          fullWidth
          placeholder="File"
          onChange={handleChange}
          type="file"
          inputProps={{ accept: '.doc,.docx,.pdf' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Batal
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalSuratMasuk.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
};

export default ModalSuratMasuk;
