import Home from "./screens/Home";
import Login from "./screens/Login";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Navbar from "./utils/Navbar";
import "./App.css"
import Create from "./screens/Create";
import Groups from "./screens/Groups";
import Documentation from "./screens/Documentation";
import AllDocs from "./screens/AllDocs";
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
    <Route path="/document/:id" element={<Documentation/>}></Route>
    <Route path="/all/:type" element={<AllDocs/>}></Route>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
