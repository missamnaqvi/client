import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PGRegistrationForm from "./components/PgRegistrationForm";

function App() {
  // const { isAuthenticated, loading } = useSelector(false);
  // const dispatch = useDispatch();

  // const loadUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:5000/api/users/verify-token",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     dispatch(setUser(data.user)); // ✅ will set loading to false
  //   } catch (error) {
  //     console.error("Token verification failed", error);
  //     dispatch(setUser(null)); // ✅ clear user, stop loading
  //   }
  // };
  // useEffect(() => {
  //   loadUser();
  // }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="loader"></div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className=" w-full mx-auto">
      <Router>
        <Toaster />
        <Navbar />
        <PGRegistrationForm />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
