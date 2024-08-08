import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ModalSuratKeluar = ({ isOpen, onClose, onSubmit, title, initialValues }) => {
  const [formData, setFormData] = useState({
    id: '',
    nomor: '',
    tanggal: '',
    perihal: '',
    ditujukan: '',
    file: null,
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
        ditujukan: '',
        file: null,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
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
          name="ditujukan"
          fullWidth
          placeholder="Tujuan"
          value={formData.ditujukan}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="file"
          fullWidth
          placeholder="File"
          onChange={handleChange}
          type="file"
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

ModalSuratKeluar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
};

export default ModalSuratKeluar;
