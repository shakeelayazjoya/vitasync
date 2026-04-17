import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeals } from "./mealsThunks";

export interface MealItem {
  id: string;
  name: string;
  portion: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isDesi: boolean;
  category: string;
  [key: string]: any;
}

interface MealsState {
  foodDatabase: MealItem[];
  searchQuery: string;
  selectedFoods: MealItem[];
  isLoading: boolean;
}

const initialState: MealsState = {
  foodDatabase: [],
  searchQuery: "",
  selectedFoods: [],
  isLoading: false,
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addFood: (state, action: PayloadAction<MealItem>) => {
      state.selectedFoods.push(action.payload);
    },
    removeFood: (state, action: PayloadAction<string>) => {
      state.selectedFoods = state.selectedFoods.filter((f) => f.id !== action.payload);
    },
    clearSelection: (state) => {
      state.selectedFoods = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<MealItem[]>) => {
        state.isLoading = false;
        state.foodDatabase = action.payload;
      })
      .addCase(fetchMeals.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchQuery, addFood, removeFood, clearSelection } = mealsSlice.actions;
export default mealsSlice.reducer;
