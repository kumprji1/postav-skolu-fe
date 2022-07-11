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
      <ProjectItem title="Zábavné učebny" />
      <ProjectItem title="Pohlazení duše" />
      <ProjectItem title="Nevídaná krása" />
      <ProjectItem title="Aktivní světluška" />
      <ProjectItem title="Práce šlechtí" />
      <ProjectItem title="Ráj na Zemi" />
      <ProjectItem title="Magický kruh bezpečí" />
      <ProjectItem title="Splněný sen" />
      <ProjectItem title="Věci s příběhem" />
      <ProjectItem title="Krásné zbytečnosti" />
			</main>
		</div>
		<footer>Zde je patička</footer>
    </div>
  );
}

export default App;
