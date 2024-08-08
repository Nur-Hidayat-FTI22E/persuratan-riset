// Import ikon dari pustaka
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings"; // Ikon untuk admin
import Create from "@mui/icons-material/Create"; // Ikon untuk membuat surat
import MailOutline from "@mui/icons-material/MailOutline"; // Ikon untuk surat masuk
import SendOutlined from "@mui/icons-material/SendOutlined"; // Ikon untuk surat keluar
import Shop from "@mui/icons-material/Shop";

// Soft UI Dashboard React layouts
import DaftarUser from "layouts/admin"; // Mengimpor dari index.js di layouts/admin
import SignIn from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import MyComponent from "layouts/MyComponent";
import SuratKeluar from "layouts/suratkeluar";
import Tables from "layouts/tables";
import FileUpload from "layouts/testing";

const routes = [
  {
    name: "login",
    route: "/login",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Surat Masuk",
    key: "masuk",
    route: "/masuk",
    icon: <MailOutline size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Surat Keluar",
    key: "keluar",
    route: "/keluar",
    icon: <SendOutlined size="12px" />,
    component: <SuratKeluar />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    route: "/admin",
    icon: <AdminPanelSettings size="12px" />,
    component: <DaftarUser />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Buat Surat",
    key: "buat",
    route: "/buatsurat",
    icon: <Create size="12px" />, // Ikon untuk membuat surat
    component: <MyComponent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "testing",
    key: "testing",
    route: "/testing",
    icon: <Create size="12px" />, // Ikon untuk membuat surat
    component: <FileUpload />,
    noCollapse: true,
  }
];

export default routes;
