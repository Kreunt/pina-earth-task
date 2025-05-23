import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IngredientLine from "./IngredientLine";
import type { Ingredient } from "../types";

describe("IngredientLine", () => {
    const baseIngredient: Ingredient = { name: "Sugar", isCustom: false };

    it("renders the ingredient name", () => {
        render(
            <IngredientLine idx={0} ing={baseIngredient} removeIngredient={vi.fn()} />
        );
        expect(screen.getByText("Sugar")).toBeDefined();
    });

    it("shows (custom) label if ingredient is custom", () => {
        render(
            <IngredientLine idx={1} ing={{ ...baseIngredient, isCustom: true }} removeIngredient={vi.fn()} />
        );
        expect(screen.getByText("(custom)")).toBeDefined();
    });

    it("renders the remove button", () => {
        render(
            <IngredientLine idx={2} ing={baseIngredient} removeIngredient={vi.fn()} />
        );
        expect(screen.getByRole("button", { name: /remove/i })).toBeDefined();
    });

    it("calls removeIngredient with correct index when remove button is clicked", () => {
        const mockRemove = vi.fn();
        render(
            <IngredientLine idx={3} ing={baseIngredient} removeIngredient={mockRemove} />
        );
        fireEvent.click(screen.getByRole("button", { name: /remove/i }));
        expect(mockRemove).toHaveBeenCalledWith(3);
    });
});