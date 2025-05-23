import React from "react";
import { useIngredients } from "../hooks/useIngredients";
import IngredientLine from "./IngredientLine";

const RecipeIngredients: React.FC = () => {
    const {
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
    } = useIngredients();

    return (
        <div style={{
            maxWidth: 400,
            margin: "2rem auto",
            padding: 24,
            borderRadius: 8,
            boxShadow: "0 2px 8px #eee"
        }}>
            <h2>Recipe Ingredient Finder</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input
                    type="text"
                    value={dish}
                    placeholder="Enter dish name"
                    onChange={(e) => setDish(e.target.value)}
                    style={{ flex: 1, padding: 8 }}
                    onKeyDown={(e) => { if (e.key === "Enter") fetchIngredients() }}
                />
                <button
                    onClick={fetchIngredients}
                    disabled={loading || !dish.trim()}
                    style={{ padding: "8px 16px" }}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
            {ingredients.length > 0 && (
                <>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {ingredients.map((ing, idx) => (
                            <IngredientLine
                                key={idx}
                                idx={idx}
                                ing={ing}
                                removeIngredient={removeIngredient}
                            />
                        ))}
                    </ul>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <input
                            type="text"
                            value={customIngredient}
                            placeholder="Add custom ingredient"
                            onChange={(e) => setCustomIngredient(e.target.value)}
                            style={{ flex: 1, padding: 8 }}
                            onKeyDown={(e) => { if (e.key === "Enter") addCustomIngredient() }}
                        />
                        <button onClick={addCustomIngredient} style={{ padding: "8px 16px" }}>
                            Add
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeIngredients;