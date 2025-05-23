import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import RecipeIngredients from "./RecipeIngredients";
import * as useIngredientsHook from "../hooks/useIngredients";

const mockUseIngredients = {
    dish: "Pizza",
    setDish: vi.fn(),
    ingredients: [
        { name: "Cheese", isCustom: false },
        { name: "Tomato Sauce", isCustom: false },
    ],
    loading: false,
    error: "",
    customIngredient: "",
    setCustomIngredient: vi.fn(),
    fetchIngredients: vi.fn(),
    removeIngredient: vi.fn(),
    addCustomIngredient: vi.fn(),
};

describe("RecipeIngredients", () => {
    beforeEach(() => {
        vi.spyOn(useIngredientsHook, "useIngredients").mockReturnValue({ ...mockUseIngredients });
    });

    it("renders input and search button", () => {
        render(<RecipeIngredients />);
        expect(screen.getByPlaceholderText("Enter dish name")).toBeDefined();
        expect(screen.getByRole("button", { name: /search/i })).toBeDefined();
    });

    it("calls fetchIngredients on search button click", () => {
        render(<RecipeIngredients />);
        fireEvent.change(screen.getByPlaceholderText("Enter dish name"), { target: { value: "Pizza" } });
        fireEvent.click(screen.getByRole("button", { name: /search/i }));
        expect(mockUseIngredients.fetchIngredients).toHaveBeenCalled();
    });

    it("displays ingredients list", () => {
        render(<RecipeIngredients />);
        expect(screen.getByText("Cheese")).toBeDefined();
        expect(screen.getByText("Tomato Sauce")).toBeDefined();
    });

    it("removes an ingredient when removeIngredient is called", () => {
        render(<RecipeIngredients />);
        const removeButtons = screen.getAllByRole("button", { name: /remove/i });
        fireEvent.click(removeButtons[0]);
        expect(mockUseIngredients.removeIngredient).toHaveBeenCalledWith(0);
    });

    it("adds a custom ingredient", () => {
        render(<RecipeIngredients />);
        fireEvent.change(screen.getByPlaceholderText("Add custom ingredient"), { target: { value: "Basil" } });
        fireEvent.click(screen.getByRole("button", { name: /add/i }));
        expect(mockUseIngredients.addCustomIngredient).toHaveBeenCalled();
    });

    it("shows error message if error exists", () => {
        vi.spyOn(useIngredientsHook, "useIngredients").mockReturnValue({ ...mockUseIngredients, error: "Not found" });
        render(<RecipeIngredients />);
        expect(screen.getByText("Not found")).toBeDefined();
    });
});