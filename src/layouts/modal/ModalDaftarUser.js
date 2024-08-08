import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ModalDaftarUser = ({ isOpen, onClose, onSubmit, title, initialValues }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    handphone: '',
    angkatan: '',
    password: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData({
        nama: '',
        email: '',
        noHp: '',
        angkatan: '',
        password: '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          name="nama"
          fullWidth
          placeholder="Masukkan nama"
          value={formData.nama}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          fullWidth
          placeholder="Masukkan email"
          value={formData.email}
          onChange={handleChange}
        />
       <TextField
  margin="dense"
  name="handphone"
  fullWidth
  placeholder="No. Handphone"
  value={formData.handphone}
  onChange={handleChange}
/>
        <TextField
          margin="dense"
          name="angkatan"
          fullWidth
          placeholder="Angkatan"
          value={formData.angkatan}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          fullWidth
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
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

ModalDaftarUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
};

export default ModalDaftarUser;