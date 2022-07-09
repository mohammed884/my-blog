import { Route, Routes } from "solid-app-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:title" element={<Blog/>}/>
        <Route path="/blog/add" element={<AddBlog/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
