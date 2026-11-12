import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import Layout from "./layouts/Layout"
import FavoritesPage from "./views/FavoritesPage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        //element is the component that will be rendered when the route is matched
            <Route path="/" element={<IndexPage></IndexPage>} index />
            <Route path="/favoritos" element={<FavoritesPage></FavoritesPage>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
