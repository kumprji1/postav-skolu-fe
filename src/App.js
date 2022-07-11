import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import ProjectItem from './components/ProjectItem/ProjectItem';

function App() {
  return (
    <div className="App">
		<div class="grid-container">
      <Header />
			<main>
        <ProjectItem title="Kup si svoji část pozemku" />
			</main>
		</div>
		<footer>Zde je patička</footer>
    </div>
  );
}

export default App;
