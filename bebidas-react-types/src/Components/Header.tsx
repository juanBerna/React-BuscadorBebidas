import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const [searchFilter, setSearchFilter] = useState({
    search:'',
    category:''
  });
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecepies = useAppStore((state) => state.searchRecipies);

  useEffect(() => {
  fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validar
    if(Object.values(searchFilter).includes('')){
      //manejar el error
      return
    }
    //consultamos el otro endpoint
    searchRecepies(searchFilter);
  }

  return (
    <header className={isHome ? "bg-hero-pattern bg-cover bg-center" : "bg-slate-800"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex items-center justify-between">
          <div>
            <img className="w-32" src="/logo.svg" alt="Logo" />
          </div>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-700 text-orange-500 font-bold text-lg mr-5 px-3 py-2 rounded"
                  : "text-white font-bold text-lg mr-5"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-700 text-orange-500 font-bold text-lg px-3 py-2 rounded"
                  : "text-white font-bold text-lg"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-slate-700 mt-10 p-5 rounded-lg"
          onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label
                htmlFor="search"
                className="block text-white font-extrabold text-lg"
              >
                Buscar Bebidas
              </label>
              <input
                id="search"
                type="text"
                name="search"
                placeholder="Buscar Bebidas"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilter.search}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white font-extrabold text-lg"
              >
                Categorias
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilter.category}
              >
                <option value="">--Seleccione--</option>
                {categories.drinks.map((category) => (
                  <option value={category.strCategory} 
                  key={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
                
              </select>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white font-bold text-lg px-3 py-2 rounded mt-5 hover:bg-orange-600 transition-colors"
            >
              Buscar
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
