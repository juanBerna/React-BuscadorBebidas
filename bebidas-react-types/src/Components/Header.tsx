import { useMemo } from "react";
import {NavLink, useLocation} from "react-router-dom";

export default function Header() {
  const {pathname} = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <header className="bg-slate-800">
        <div className="mx-auto container px-5 py-16">
            <div className="flex items-center justify-between">
                <div>
                    <img className="w-32" src="/logo.svg" alt="Logo" />
                </div>
                <nav>
                    <NavLink to="/"
                    className={({isActive}) => isActive ?
                     'bg-slate-700 text-orange-500 font-bold text-lg mr-5 px-3 py-2 rounded' : 'text-white font-bold text-lg mr-5'}>
                    Inicio
                    </NavLink>
                    <NavLink to="/favoritos"
                    className={({isActive}) => isActive ?
                     'bg-slate-700 text-orange-500 font-bold text-lg px-3 py-2 rounded' : 'text-white font-bold text-lg'}>
                    Favoritos
                    </NavLink>
                </nav>
            </div>
            {isHome && (
                <form className="md:w-1/2 2xl:w-1/3 bg-slate-700 mt-10 p-5 rounded-lg">
                    <div className="space-y-4">
                        <label 
                        htmlFor="search" 
                        className="block text-white font-extrabold text-lg">Buscar Bebidas</label>
                    <input
                    id="search"
                    type="text"
                    name="search"
                    placeholder="Buscar Bebidas"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    />
                    </div>
                </form>
            )}
        </div>

    </header>
  )
}
