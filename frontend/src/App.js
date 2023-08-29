import Home from "./screens/Home";
import Login from "./screens/Login";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Navbar from "./utils/Navbar";
import "./App.css"
import Create from "./screens/Create";
import Groups from "./screens/Groups";
function App() {
  return (


    <div className="App">
  <Router>
  <Navbar/>
    <Routes>
    
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/create" element={<Create/>}></Route>
    <Route path="/group" element={<Groups/>}></Route>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
