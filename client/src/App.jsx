import { Route, Routes, useNavigate } from "@solidjs/router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog/index";
import AddBlog from "./pages/Blog/Add";
import EditBlog from "./pages/Blog/Edit";
import AddTag from "./pages/Tag/Add";
import EditTag from "./pages/Tag/Edit";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import { createResource, Show } from "solid-js";
import { getRole } from "./actions/actions"
function App() {
  const [role] = createResource(getRole);
  const navigate = useNavigate()
  return (
    <Show when={!role.loading} fallback={<p>...Loading</p>}>
      <div>
        <Header />
        <Routes>
          <Route path="/" end element={<Home />} />
          <Route path="/blog/:title" element={<Blog />} role={role} />
          <Route path="/blog/add" element={role().success ? <AddBlog /> : navigate("/", { replace: true })} />
          <Route path="/blog/edit/:title" element={role().success ? <EditBlog /> : navigate("/", { replace: true })} />
          <Route path="/tag/add" element={role().success ? <AddTag /> : navigate("/", { replace: true })} />
          <Route path="/tag/edit/:title" element={role().success ? <EditTag /> : navigate("/", { replace: true })} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={role().success ? <Dashboard /> : navigate("/", { replace: true })} />
        </Routes>
      </div>
    </Show>
  );
}

export default App;
