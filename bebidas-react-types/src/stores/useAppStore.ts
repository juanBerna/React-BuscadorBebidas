import {create} from "zustand";
import {createRecipeSlice, type RecipeSlice} from "./recipeSlice";
import { devtools } from "zustand/middleware";

//set nos permite escribir en el createRecipeSlice y get nos permite leer de createRecipeSlice
export const useAppStore = create<RecipeSlice>()(devtools((...args) => ({
    ...createRecipeSlice(...args)
})));