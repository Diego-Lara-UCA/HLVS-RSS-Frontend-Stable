import Sidebar from "./components/sidebar/Sidebar";
import LogIn from './pages/login/LogIn.jsx';
import Home from "./pages/Home/Home";
import "./app.css";

function App() {
  return(
    <div className="app">
      <LogIn />
      <Home/>
      <Sidebar />
    </div>
  );
}
export default App;
