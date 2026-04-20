export const APP_NAME = "NutriSync";
export const TOKEN_KEY = "vitasync_token";
export const USER_KEY = "vitasync_user";

export const GOALS = [
  { id: "weight-loss", label: "Weight Loss", icon: "TrendingDown" },
  { id: "muscle-gain", label: "Muscle Gain", icon: "Dumbbell" },
  { id: "diabetes", label: "Diabetes Control", icon: "Heart" },
  { id: "heart", label: "Heart Health", icon: "HeartPulse" },
  { id: "wellness", label: "General Wellness", icon: "Smile" },
] as const;

export const DIETARY_RESTRICTIONS = [
  "Vegetarian",
  "Halal Only",
  "No Dairy",
  "No Gluten",
] as const;
