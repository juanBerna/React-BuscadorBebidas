import type { StateCreator } from "zustand";
import { getCategories, getRecipies } from "../services/RecipeServices";
import type { Categories, Drinks, SearchFilter } from "../interfaces/index";

export type RecipeSlice = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipies: (searchFilter: SearchFilter) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipeSlice> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipies: async (searchFilter: SearchFilter) => {
    const drinks = await getRecipies(searchFilter);
    set({ drinks });
  },
});
