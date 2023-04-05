import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import AdminRoute from "./Routes/AdminRoute";
import Developer from "./Routes/Developer";

function App() {
  return (
    <div>
      <AdminRoute />
      <Developer />
    </div>
  );
}

export default App;
