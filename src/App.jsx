import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Me from "./pages/Me.jsx";
import Reading from "./pages/Reading.jsx";
import Investments from "./pages/Investments.jsx";
import Blog from "./pages/Blog.jsx";
import Gym from "./pages/Gym.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Me />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gym" element={<Gym />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
