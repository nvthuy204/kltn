import { HashRouter, Routes, Route } from "react-router-dom";


// Pages
import Login from "../pages/Login/Login";

import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users/Users";
import Courses from "../pages/Courses/Courses";
import Dictionary from "../pages/Dictionary/Dictionary";
import Exams from "../pages/Exams/Exams";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

import AddCourse from "../pages/AddCourse/AddCourse";
import AddWord from "../pages/AddWord/AddWord";



function AppRoutes() {

  return (

    <HashRouter>

      <Routes>


        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />



        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />



        {/* USERS */}

        <Route
          path="/users"
          element={<Users />}
        />



        {/* COURSES */}

        <Route
          path="/courses"
          element={<Courses />}
        />


        {/* ADD COURSE */}

        <Route
          path="/courses/new"
          element={<AddCourse />}
        />



        {/* DICTIONARY */}

        <Route
          path="/dictionary"
          element={<Dictionary />}
        />


        {/* ADD WORD */}

        <Route
          path="/dictionary/new"
          element={<AddWord />}
        />



        {/* EXAMS */}

        <Route
          path="/exams"
          element={<Exams />}
        />



        {/* REPORTS */}

        <Route
          path="/reports"
          element={<Reports />}
        />



        {/* SETTINGS */}

        <Route
          path="/settings"
          element={<Settings />}
        />



        {/* DEFAULT */}

        <Route
          path="*"
          element={<Dashboard />}
        />


      </Routes>


    </HashRouter>

  );

}


export default AppRoutes;