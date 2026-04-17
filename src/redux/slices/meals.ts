import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeals } from "@/redux/thunks/meals";

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
      const existingFood = state.selectedFoods.find((f) => f.id === action.payload.id);
      if (existingFood) {
        existingFood.quantity = (existingFood.quantity || 1) + 1;
      } else {
        state.selectedFoods.push({ ...action.payload, quantity: 1 });
      }
    },
    updateFoodQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.selectedFoods.find((f) => f.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, (item.quantity || 1) + action.payload.quantity);
      }
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

export const { setSearchQuery, addFood, updateFoodQuantity, removeFood, clearSelection } = mealsSlice.actions;
export default mealsSlice.reducer;
