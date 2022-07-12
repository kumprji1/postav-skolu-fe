import Header from "./components/Header/Header";
import Projects from "./components/Projects/Projects";

import Main from "./components/Main/Main";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div class="grid-container">
        <Header />
        <Main>
          <Projects />
        </Main>
      </div>
      <footer>Zde je patička</footer>
    </div>
  );
}

export default App;
