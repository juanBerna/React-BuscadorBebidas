import axios from "axios";
import { CategoriesApiResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import type { Drink, SearchFilter } from "../interfaces";

export async function getCategories() {
    try {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        const {data} = await axios.get(url);
        const result = CategoriesApiResponseSchema.safeParse(data);
        if (!result.success) {
            console.error("Error parsing categories:", result.error);
            return { drinks: [] }; // ✅ Retorna la estructura correcta en lugar de un array vacío
        }
        return result.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { drinks: [] }; // ✅ Retorna la estructura correcta aquí también
    }
}

export async function getRecipies(filters: SearchFilter) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.search}`;
        const {data} = await axios.get(url);
        const result = DrinksAPIResponse.safeParse(data);
        if (!result.success) {
            console.error("Error parsing categories:", result.error);
            //     return { drinks: [] }; // ✅ Retorna la estructura correcta en lugar de un array vacío
        }
        return result.data;
       
    } catch (error) {
       console.error("Error fetching categories:", error);
    }
}

export async function getDrinckDetails(id: Drink['idDrink']) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const {data} = await axios.get(url);
        const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
        if (!result.success) {
            console.error("Error parsing categories:", result.error);
            //     //     return { drinks: [] }; // ✅ Retorna la estructura correcta en lugar de un array vacío
        }
        return result.data;
       
    } catch (error) {
       console.error("Error fetching categories:", error);
    }
}
