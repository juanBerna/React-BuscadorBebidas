import axios from "axios";
import { CategoriesApiResponseSchema, DrinksAPIResponse } from "../utils/recipes-schema";
import type { SearchFilter } from "../interfaces";

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