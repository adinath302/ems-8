import React, { useContext, useEffect, useState } from "react";
import Login from "./Component/Auth/Login";
import EmployeeDashboard from "./Component/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Component/Dashboard/AdminDashboard";
import { AuthContext } from "./Context/AuthProvider";

// import { getLocalStorage, setLocalStorage } from "./Utils/localStorage";

const App = () => {
  const [user, setuser] = useState(null);
  const Authdata = useContext(AuthContext);

  useEffect(() => {  // check if user is logged in
    if (Authdata) {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        setuser(loggedInUser.role); // set user role from local storage to user state
      }
    }
  }, [Authdata]);


  const handleLogin = (email, password) => {
    if (email == "admin@me.com" && password == "123") {
      setuser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (
      Authdata &&
      Authdata.employees.find((e) => email == e.email && e.password == password)
    ) {
      setuser("employee");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee" })
      );
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? (
        <AdminDashboard />
      ) : user == "employee" ? (
        <EmployeeDashboard />
      ) : (
        ""
      )}
    </>
  );
};

export default App;
