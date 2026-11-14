import type { StateCreator } from "zustand";
import { getCategories, getDrinckDetails, getRecipies } from "../services/RecipeServices";
import type { Categories,  DrinkDetails,  Drinks, SearchFilter } from "../interfaces/index";
import type { Drink } from '../interfaces/index';

export type RecipeSlice = {
  categories: Categories;
  drinks: Drinks;
  detailDrink: DrinkDetails;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipies: (searchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink['idDrink'])=> Promise<void>;
  closeModal : () =>void;
};

export const createRecipeSlice: StateCreator<RecipeSlice> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  detailDrink:{  } as DrinkDetails,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipies: async (searchFilter: SearchFilter) => {
    const drinks = await getRecipies(searchFilter);
    set({ drinks });
  },
  selectRecipe: async(id)=> {
    const detailDrinks = await getDrinckDetails(id)
    set({detailDrink : detailDrinks, modal: true})
  },
  closeModal: ()=>{
    set({
      modal:false,
      detailDrink : {} as DrinkDetails,
    })
  }
});
