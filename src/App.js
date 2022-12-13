import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import KupSiSvojiCastPozemkuPage from "./pages/KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuPage";
import ProjectDetailDonatePage from "./pages/ProjectDetailPage/ProjectDetailDonatePage";

import "./App.scss";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";

function App() {
  return (
    <div className="App">
      <div class="grid-container">
        {/* Tady bylo DiaLogoBackground */}
        <Header />
        <Main classes="main-content--wide(tedNe)">
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/kup-si-svoji-cast-pozemku"
                element={<KupSiSvojiCastPozemkuPage />}
              />
              <Route path={`/projekt/:urlPath`}
              element={<ProjectDetailPage />}
              />
            </Routes>
          </Router>
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
