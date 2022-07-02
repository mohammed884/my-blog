import { Route, Routes } from "solid-app-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Dashboard from "./pages/Dashboard";
import AddArticle from "./pages/AddArticle";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles/:title" element={<Article/>}/>
        <Route path="/article/add" element={<AddArticle/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
