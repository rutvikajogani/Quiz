import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Auth from "./auth/auth";
import {Quiz} from "./pages/quiz";
import {Question} from "./pages/questions";
import Layout from "./theme/layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<Auth><Layout /></Auth>}>
          <Route path="users" element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="question" element={<Question />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App