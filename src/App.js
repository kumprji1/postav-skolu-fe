import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Components
import AboutSection from "./pages/Homepage/Components/AboutSection";
import ImageSection from "./pages/Homepage/Components/ImageSection";
import ProjectsSection from "./pages/Homepage/Components/ProjectsSection";

import DiaLogoBG from "./images/Diakonie/Diakonie_Logo_znak.png";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div class="grid-container">
        <div className="background">
          <div className="dia-logo-bg-up-wrapper">
            <img src={DiaLogoBG} />
          </div>
        </div>
        <Header />
        <Main>
          <AboutSection />
          <ImageSection />
          <ProjectsSection />
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
