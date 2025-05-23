import type React from "react";
import type { Ingredient } from "../types";

interface props {
    idx: number;
    ing: Ingredient;
    removeIngredient: (idx: number) => void;
}

const IngredientLine: React.FC<props> = ({
    idx,
    ing,
    removeIngredient,
}) => {
    return (
        <li style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <span style={{ flex: 1 }}>
                {ing.name} {ing.isCustom && <span style={{ color: "#888", fontSize: 12 }}>(custom)</span>}
            </span>
            <button
                aria-label={`Remove ${ing.name}`}
                onClick={() => removeIngredient(idx)}
                style={{
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    padding: "2px 8px",
                    marginLeft: 8
                }}
            >
                Remove
            </button>
        </li>
    )
};
export default IngredientLine;