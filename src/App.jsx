import { BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./routes/AppRouter.jsx";
import 'animate.css';

function App() {
  return (
    <div className="app">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}
export default App;
