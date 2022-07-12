import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Section from "./components/Section/Section";
import Footer from "./components/Footer/Footer";

// Components
import AboutSection from "./pages/Homepage/Components/AboutSection";
import ImageSection from "./pages/Homepage/Components/ImageSection";
import ProjectsSection from "./pages/Homepage/Components/ProjectsSection";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div class="grid-container">
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
