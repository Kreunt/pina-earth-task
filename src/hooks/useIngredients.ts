import { useState } from "react";
import type { Ingredient } from "../types";

export function useIngredients() {
    const [dish, setDish] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [customIngredient, setCustomIngredient] = useState("");

    const fetchIngredients = async () => {
        if (!dish.trim()) return;
        setLoading(true);
        setError("");
        setIngredients([]);
        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(dish)}`
            );
            const data = await res.json();
            if (!data.meals || data.meals.length === 0) {
                setError("No recipe found.");
                setIngredients([]);
            } else {
                const meal = data.meals[0];
                const ingr: Ingredient[] = [];
                for (let i = 1; i <= 20; i++) {
                    const ing = meal[`strIngredient${i}`];
                    if (ing && ing.trim()) {
                        ingr.push({ name: ing });
                    }
                }
                setIngredients(ingr);
            }
        } catch (e) {
            setError("Failed to fetch recipe.");
        } finally {
            setLoading(false);
        }
    };

    const removeIngredient = (idx: number) => {
        setIngredients((ings) => ings.filter((_, i) => i !== idx));
    };

    const addCustomIngredient = () => {
        if (customIngredient.trim()) {
            setIngredients((ings) => [
                ...ings,
                { name: customIngredient.trim(), isCustom: true },
            ]);
            setCustomIngredient("");
        }
    };

    return {
        dish,
        setDish,
        ingredients,
        loading,
        error,
        customIngredient,
        setCustomIngredient,
        fetchIngredients,
        removeIngredient,
        addCustomIngredient,
    };
}