import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Layout/navbar";
import Footer from "./components/Layout/footer";
import PGRegistrationForm from "./student/PgRegistrationForm";
import Home from "./components/home";
import PgRegistration from "./student/PgRegistration";
import ResidentRegistrationForm from "./student/ResidentRegistrationForm";
import NotFound from "./components/NotFound";
import PGOwnerRegistration from "./student/PgOwnerRegistraion";
import LoginForm from "./components/Auth/LoginForm";

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
    <div className="w-full mx-auto">
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/create" element={<ResidentRegistrationForm />} />
          <Route path="/pgregister" element={<PGRegistrationForm />} />
          <Route path="/pgregister" element={<PgRegistration />} />
          <Route path="/owneregister" element={<PGOwnerRegistration />} />
          <Route path="/login" element={<LoginForm />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
