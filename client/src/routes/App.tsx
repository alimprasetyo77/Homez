import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "@/pages/about";
import Search from "@/pages/properties/search";
import Layout from "@/components/layouts/layout";
import DetailProperty from "@/pages/properties/detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties">
            <Route path="search" element={<Search />} />
            <Route path=":slug" element={<DetailProperty />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
