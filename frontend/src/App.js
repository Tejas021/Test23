import Home from "./screens/Home";
import Login from "./screens/Login";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Navbar from "./utils/Navbar";
function App() {
  return (


    <div className="App">
  <Router>
  <Navbar/>
    <Routes>
    
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
