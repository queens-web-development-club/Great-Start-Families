import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Resources from "./components/Resources";
import Calender from "./components/Calender";

function App() {
  return (
    <div className='App'>
      <Header />
      <HomePage />
      <AboutPage />
      <Resources />
      <Calender />
    </div>
  );
}

export default App;
