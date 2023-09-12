import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Navbar from "./utils/Navbar/Navbar";
import "./App.css"
import Create from "./screens/Create/Create";
import Groups from "./screens/Groups/Groups";
import Documentation from "./screens/Documentation/Documentation";
import AllDocs from "./screens/AllDocs/AllDocs";
import { useSelector } from "react-redux";
import Group from "./screens/Group/Group";
import TOC from "./screens/TOC/TOC";

// import { TOC } from "./utils/Navbar/TOC/TOC";
function App() {

  const user = useSelector(state=>state.auth.currentUser)

  return (


    <div className="App">
  <Router>
  <Navbar/>
    <Routes>
    
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={user?<Home/>:<Login/>}></Route>
    <Route path="/create" element={<Create/>}></Route>
    <Route path="/groups" element={<Groups/>}></Route>
    <Route path="/document/:id" element={<Documentation/>}></Route>
    <Route path="/all/:type" element={<AllDocs/>}></Route>
    <Route path="/group/" element={<Group/>}></Route>
    <Route path="/toc/" element={<TOC/>}></Route>
    {/* <Route path="/folder/*" element={<TOC/>} /> */}
    
    </Routes>
  </Router>
    </div>
  );
}

export default App;
