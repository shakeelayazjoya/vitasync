import api from "@/services/api";
import type { MealItem } from "@/redux/slices/meals";
import type { CreateMealRequest, MealLogItem } from "@/redux/thunks/createMeal";

export const mealsService = {
  fetchDesiMeals: async (): Promise<MealItem[]> => {
    const response = await api.get<MealItem[]>("/meals/desi");
    const seenIds = new Set<string>();

    return response.data.map((item, index) => {
      let id = item.id ?? item.name;

      if (seenIds.has(id)) {
        id = `${item.name}-${index}`;
      }

      seenIds.add(id);
      return { id, ...item };
    });
  },

  fetchUserMeals: async (): Promise<MealLogItem[]> => {
    const response = await api.get<MealLogItem[]>("/meals");
    return response.data;
  },

  fetchTodayMeals: async (): Promise<MealLogItem[]> => {
    const response = await api.get<MealLogItem[] | { mealLogs: MealLogItem[] }>("/logs/today");
    const data = response.data as MealLogItem[] | { mealLogs: MealLogItem[] };

    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data.mealLogs)) {
      return data.mealLogs;
    }

    return [];
  },

  createMeal: async (mealData: CreateMealRequest): Promise<MealLogItem> => {
    const response = await api.post<MealLogItem>("/meals", mealData);
    return response.data;
  },
};
