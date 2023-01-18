import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import KupSiSvojiCastPozemkuPage from "./pages/KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuPage";
import ProjectDetailDonatePage from "./pages/ProjectDetailPage/ProjectDetailDonatePage";
import SignupUserPage from "./pages/Auth/SignupUserPage";
import SigninPage from "./pages/Auth/SigninPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";

import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/auth-hook";

import "./App.scss";

function App() {
  const auth = useAuth()
  return (
    <AuthContext.Provider
    value = {auth}
    >
    <div className="App">
      <div class="grid-container">
        {/* Tady bylo DiaLogoBackground */}
        <Router>
        <Header auth={auth} />
        <Main classes="main-content--wide(tedNe)">
          
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/projekt/kup-si-svoji-cast-pozemku"
                element={<KupSiSvojiCastPozemkuPage />}
              />
              <Route path={`/projekt/:urlPath`}
              element={<ProjectDetailPage />}
              />
              <Route 
              path="/registrace"
              element={<SignupUserPage />}
              />
              <Route 
              path="/prihlaseni"
              element={<SigninPage />}
              />
            </Routes>          
        </Main>
       </Router>
      </div>
      <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
