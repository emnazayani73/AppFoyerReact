import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Register from "./Pages/register/Register";
import DashboardAdmin from "./Pages/DashboardAdmin";
import LoginForm from "./Components/LoginForm";
import Login from "./Pages/login/Login";
import DashboardAgM from "./Pages/DashboardAgM";
import DashboardEtudiant from "./Pages/DashboardEtudiant";
import DashboardRF from "./Pages/DashboardRF";
import AjoutChambre from "./Pages/adminTask/AjoutChambre";
import ModifChambre from "./Pages/adminTask/ModifChambre";
import AffecteChambre from "./Pages/adminTask/AffecteChambre";
import AjoutRole from "./Pages/adminTask/AjoutRole";
import ValidationInscription from "./Pages/adminTask/ValidationInscription";
import GereRole from "./Pages/adminTask/GereRole";
import ConsultationEtudiant from "./Pages/adminTask/ConsultationEtudiant";
import VisulisationStat from "./Pages/adminTask/VisulisationStat";

const App = () => {
  /* let decodedToken;
  let storedTokenValue = localStorage.getItem("token");
  if (storedTokenValue) {
    decodedToken = jwtDecode(storedTokenValue);
  }*/

  return (
    <Router>
      <Routes>
        <Route path="/dashboardadmin" element={<DashboardAdmin />}>
          <Route
            path="validation-inscription"
            element={<ValidationInscription />}
          />
          <Route path="ajout-chambre" element={<AjoutChambre />} />
          <Route path="modification-chambre" element={<ModifChambre />} />
          <Route path="affectation-chambre" element={<AffecteChambre />} />
          <Route path="ajout-role" element={<AjoutRole />} />
          <Route path="modife-roles" element={<GereRole />} />
          <Route path="consult-etudiants" element={<ConsultationEtudiant />} />
          <Route path="consult-stat" element={<VisulisationStat />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardagm" element={<DashboardAgM />} />
        <Route path="/dashboardetudiant" element={<DashboardEtudiant />} />
        <Route path="/dashboardrf" element={<DashboardRF />} />
      </Routes>
    </Router>
  );
};

export default App;
