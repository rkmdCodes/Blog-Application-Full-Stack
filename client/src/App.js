import "./App.css";
import DataProvider from "./contex/DataProvider";
import { BrowserRouter, Routes, Route,Outlet,Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./Components/Account/Login";
import Home from "./Components/home/Home.jsx";
import Header from "./Components/Header/Header";
import CreatePost from "./Components/create/CreatePost";

const PrivateRoute = ({isAuthenticated,...props})=>{

  return isAuthenticated?
  <>
     <Header/>
     <Outlet/>
  </>
  : <Navigate replace to="/login" />


}




function App() {
   
  const [isAuthenticated,isUserAuthenticated] = useState(false);


  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
           
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/' element={<Home/>} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
               <Route path='/create' element={<CreatePost/>} />
           </Route>


          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
