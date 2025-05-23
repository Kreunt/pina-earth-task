# Recipe Ingredient Finder

A simple React web app to search for a dish, view its ingredients, remove unwanted ones, and add your own custom ingredients.

## Features
- Search for a dish by name and fetch its ingredients from [TheMealDB API](https://www.themealdb.com/api.php)
- Remove ingredients you don’t need
- Add your own custom ingredients
- Clean, accessible, and responsive UI
- Includes a test for the main component

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm or yarn

### Install dependencies
```
yarn install
```

### Run the development server
```
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run tests
```
yarn test
```

### Build for production
```
yarn build
```

## Project Structure
- `src/components/RecipeIngredients.tsx`: Main component for searching and managing ingredients
- `src/components/RecipeIngredients.test.tsx`: Test for the component
- `src/components/IngredientLine.tsx`: Component for displaying and removing an ingredient line
- `src/hooks/useIngredients.ts`: Custom hook for managing ingredients
