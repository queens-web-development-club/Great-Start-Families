import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

function App() {
  return (
    <div className='App'>
      <Header />
      <HomePage />
      <AboutPage />
    </div>
  );
}

export default App;
