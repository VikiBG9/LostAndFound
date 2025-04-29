import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ScrollToTop } from "./components/ScrollToTop";
import { ReportFound } from "./components/ReportFound";
import { Team } from "./components/Team";
import { ReportLost } from "./components/ReportLost";
import { Login } from "./components/Login";  
import { Register } from "./components/Register";
import { FAQ } from "./components/FAQ";

import "./App.css";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/session", { withCredentials: true });
        setUser(response.data.username);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={
          <>
            <Hero user={user} />
            <About />
            <HowItWorks />
            <Team />
            <Newsletter />
          </>
        } />

        <Route path="/report-lost" element={user ? <ReportLost /> : <Navigate to="/login" />} />
        <Route path="/report-found" element={user ? <ReportFound /> : <Navigate to="/login" />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        <Route path="/faq" element={<FAQ />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
