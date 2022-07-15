import { Route, Routes } from "solid-app-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog/index";
import AddBlog from "./pages/Blog/Add";
import EditBlog from "./pages/Blog/Edit";
import AddTag from "./pages/Tag/AddTag";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" end element={<Home/>}/>
        <Route path="/blog/:title" element={<Blog/>}/>
        <Route path="/blog/add" element={<AddBlog/>}/>
        <Route path="/blog/edit/:title" element={<EditBlog/>}/>
        <Route path="/tag/add" element={<AddTag/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
