import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      // duration: 10000,
      // once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
