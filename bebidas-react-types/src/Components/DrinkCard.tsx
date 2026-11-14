import type { Drink } from "../interfaces"

type DrinksPromps = {
    drink: Drink

}

export default function DrinkCard({drink}:DrinksPromps) {
  return (
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            <img src={drink.strDrinkThumb} 
            alt={drink.strDrink}
            className = "hover:scale-125 transition-transform hover:rotate-2" />
        </div>
        <div className="p-5">

        <h2 className="text-2xl truncate font-black">
            {drink.strDrink}
        </h2>
        <button className="bg-orange-400 hover:bg-amber-600 mt-5 w-full p-3 font-bold text-amber-50">
            Ver Recetas
        </button>
        </div>
    </div>
  )
}
