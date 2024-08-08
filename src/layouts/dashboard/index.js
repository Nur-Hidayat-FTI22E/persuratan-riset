import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [suratMasukCount, setSuratMasukCount] = useState(0);
  const [suratKeluarCount, setSuratKeluarCount] = useState(0); // Update similarly if needed

  // START - Count SUrat masuk
  useEffect(() => {
    const fetchSuratMasukCount = async () => {
      try {
        const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/suratmasuk/count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming token is stored in localStorage
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching surat masuk count');
        }

        const data   = await response.json();
        setSuratMasukCount(data.count);
      } catch (error) {
        console.error('Failed to fetch surat masuk count:', error);
      }
    };

    fetchSuratMasukCount();
  }, []);
  // END - Count SUrat masuk

  // START - Count SUrat keluar
  useEffect(() => {
    const fetchSuratKeluarCount = async () => {
      try {
        const response = await fetch('https://fc78-140-213-217-40.ngrok-free.app/suratkeluar/count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming token is stored in localStorage
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching surat masuk count');
        }

        const data   = await response.json();
        setSuratKeluarCount(data.count);
      } catch (error) {
        console.error('Failed to fetch surat masuk count:', error);
      }
    };

    fetchSuratKeluarCount();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={5}>
              <Link to="/masuk" style={{ textDecoration: 'none' }}>
                <MiniStatisticsCard
                  title={{ text: 'Surat Masuk' }}
                  count={suratMasukCount}
                  icon={{ color: 'info', component: 'inbox' }}
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} xl={5}>
              <Link to="/keluar" style={{ textDecoration: 'none' }}>
                <MiniStatisticsCard
                  title={{ text: 'Surat Keluar' }}
                  count={suratKeluarCount}
                  icon={{ color: 'info', component: 'outbox' }}
                />
              </Link>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
