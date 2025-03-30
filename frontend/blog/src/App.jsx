import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Navbarog from "./components/Navbar";
import Home from "./components/Home";
import ComingSoon from "./components/ComingSoon";
import Myblogs from "./components/Myblogs";
import BlogDetails from "./components/BlogDetails";
import { ToastContainer } from "react-toastify";
import UserProfile from "./components/UserProfile";
import Totalblogs from "./components/Totalblogs";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./components/AboutUs";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./store/authentication";
import { useContext } from "react";
import { isAuthenticated, isAdmin, isEditor } from "./utills/auth";
import Layout from "./admin/Layout";
import SongLyrics from "./Lyrics/SongLyrics";
function App() {
  let { Token } = useContext(AuthContext)
  console.log(Token)
  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Navbarog />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/login"
          element={Token ? <Home/> : <Login />
          }
        />

        <Route
          path="/signup"
          element={Token ? <Home /> : <Signup />
          }
        />
        <Route
          path="/admin/manage-users"
          element={isAuthenticated() && isAdmin() ? <Layout /> : <Navigate to="/login" />}
        />

<Route
          path="/user/myblogs"
          element={isAuthenticated() && isEditor() ? <Myblogs/> : <Navigate to="/login" />}
        />

        <Route
          path="/blog/:id"
          element={Token?<BlogDetails/>:<Login/>
          }
        />
        <Route path="/Userprofile" element={Token?<UserProfile/>:<Login/>} />
        <Route path="/totalblogs" element={<Totalblogs />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/vedio" element={<SongLyrics/>}/>
         <Route path="/soon" element={<ComingSoon/>}/>
   
      </Routes>
    </>
  );
}

export default App;
