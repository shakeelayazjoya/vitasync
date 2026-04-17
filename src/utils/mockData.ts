export const mockUser = {
  id: "u1",
  name: "Ahmed Khan",
  email: "user@test.com",
  password: "Test1234",
  avatar: "",
  plan: "Pro" as const,
  role: "user" as const,
  goal: "Weight Loss",
  dailyCalorieGoal: 2000,
  language: "EN",
  joinedDate: "2025-12-15",
  streak: 12,
};

export const mockAdminUser = {
  id: "a1",
  name: "Admin User",
  email: "admin@test.com",
  password: "Admin1234",
  avatar: "",
  plan: "Pro" as const,
  role: "admin" as const,
  goal: "General Wellness",
  dailyCalorieGoal: 2200,
  language: "EN",
  joinedDate: "2025-01-01",
  streak: 45,
};

export const mockDashboardStats = {
  caloriesConsumed: 1458,
  caloriesGoal: 2000,
  waterIntake: 6,
  waterGoal: 8,
  mealsLogged: 3,
  activeStreak: 12,
  protein: { current: 85, goal: 120 },
  carbs: { current: 180, goal: 250 },
  fat: { current: 45, goal: 65 },
};

export const mockMeals = [
  {
    id: "m1",
    type: "Breakfast",
    time: "8:30 AM",
    foods: ["Paratha with egg", "Chai", "Banana"],
    calories: 520,
    mood: "😊",
    energy: "⚡",
    digestion: "👍",
  },
  {
    id: "m2",
    type: "Lunch",
    time: "1:15 PM",
    foods: ["Chicken Biryani", "Raita", "Salad"],
    calories: 680,
    mood: "😴",
    energy: "😐",
    digestion: "😐",
  },
  {
    id: "m3",
    type: "Snack",
    time: "4:00 PM",
    foods: ["Fruit Chaat", "Green Tea"],
    calories: 158,
    mood: "😊",
    energy: "⚡",
    digestion: "👍",
  },
  {
    id: "m4",
    type: "Dinner",
    time: "8:00 PM",
    foods: ["Daal Chawal", "Roti", "Achar"],
    calories: 100,
    mood: "",
    energy: "",
    digestion: "",
  },
];

export const mockWeeklyData = [
  { day: "Mon", calories: 1850, energy: 7 },
  { day: "Tue", calories: 2100, energy: 6 },
  { day: "Wed", calories: 1920, energy: 8 },
  { day: "Thu", calories: 1750, energy: 7 },
  { day: "Fri", calories: 2050, energy: 5 },
  { day: "Sat", calories: 2200, energy: 6 },
  { day: "Sun", calories: 1458, energy: 8 },
];

export const mockCoachMessages = [
  { id: "c1", role: "ai" as const, text: "Assalam o Alaikum Ahmed! 👋 I'm your VitaSync AI Coach. I noticed you've been tracking your meals consistently — great work!", timestamp: "10:00 AM" },
  { id: "c2", role: "user" as const, text: "I feel bloated after drinking chai with milk. Any suggestions?", timestamp: "10:02 AM" },
  { id: "c3", role: "ai" as const, text: "That's a common response! Your body might be sensitive to full-fat dairy. Try switching to low-fat milk or green tea for a week. I'll track your digestion pattern to confirm. 🍵", timestamp: "10:03 AM" },
  { id: "c4", role: "user" as const, text: "What should I eat before my morning workout?", timestamp: "10:05 AM" },
  { id: "c5", role: "ai" as const, text: "Based on your data, a banana with a small portion of oats 30 minutes before exercise gives you the best energy levels. Avoid paratha before workouts — it tends to make you sluggish! 🏃‍♂️", timestamp: "10:06 AM" },
];

export const mockAiTip = "Based on your last 7 days, you tend to eat 300+ extra calories on weekends. Try prepping a healthy snack box on Friday to avoid overeating on Saturday!";

export const mockHistory = [
  { date: "2026-04-12", calories: 1850, meals: 4, mood: "😊", goal: 2000 },
  { date: "2026-04-11", calories: 2100, meals: 3, mood: "😐", goal: 2000 },
  { date: "2026-04-10", calories: 1920, meals: 4, mood: "😊", goal: 2000 },
  { date: "2026-04-09", calories: 1750, meals: 3, mood: "😊", goal: 2000 },
  { date: "2026-04-08", calories: 2050, meals: 4, mood: "😴", goal: 2000 },
  { date: "2026-04-07", calories: 2200, meals: 5, mood: "😐", goal: 2000 },
  { date: "2026-04-06", calories: 1600, meals: 3, mood: "😊", goal: 2000 },
];

export const mockFamilyMembers = [
  { id: "f1", name: "Ahmed Khan", age: 32, goal: "Weight Loss", avatar: "", isActive: true },
  { id: "f2", name: "Fatima Khan", age: 28, goal: "General Wellness", avatar: "", isActive: false },
  { id: "f3", name: "Imran Khan", age: 55, goal: "Diabetes Control", avatar: "", isActive: false },
];

export const mockDesiFood = [
  { id: "d1", name: "Chicken Biryani", calories: 450, protein: 25, carbs: 55, fat: 15, serving: "1 plate" },
  { id: "d2", name: "Paratha (Plain)", calories: 220, protein: 5, carbs: 30, fat: 10, serving: "1 piece" },
  { id: "d3", name: "Daal Chana", calories: 180, protein: 12, carbs: 28, fat: 3, serving: "1 bowl" },
  { id: "d4", name: "Nihari", calories: 350, protein: 22, carbs: 10, fat: 25, serving: "1 bowl" },
  { id: "d5", name: "Roti", calories: 70, protein: 2, carbs: 15, fat: 0.5, serving: "1 piece" },
  { id: "d6", name: "Chai (with milk)", calories: 80, protein: 2, carbs: 10, fat: 3, serving: "1 cup" },
  { id: "d7", name: "Halwa Puri", calories: 520, protein: 8, carbs: 60, fat: 28, serving: "1 serving" },
  { id: "d8", name: "Seekh Kebab", calories: 180, protein: 18, carbs: 5, fat: 10, serving: "2 pieces" },
];

export const mockInsights = [
  { id: "i1", title: "Weekend Overeating Pattern", description: "You consume 300+ extra calories on Saturdays. Consider meal prepping.", type: "warning" as const },
  { id: "i2", title: "Chai Impact Detected", description: "Your energy drops 2 hours after having chai with sugar. Try reducing sugar.", type: "info" as const },
  { id: "i3", title: "Great Protein Consistency", description: "You've hit your protein goal 5 out of 7 days this week!", type: "success" as const },
  { id: "i4", title: "Hydration Reminder", description: "You average only 5 glasses of water daily. Target is 8 glasses.", type: "warning" as const },
];

export const mockAdminStats = {
  totalUsers: 10432,
  activeToday: 3215,
  mealsLoggedToday: 8943,
  aiMessagesSent: 1256,
};

export const mockAdminUsers = [
  { id: "au1", name: "Sara Ahmed", email: "sara@gmail.com", plan: "Pro", goal: "Weight Loss", streak: 45, joined: "2026-01-15", status: "active" },
  { id: "au2", name: "Ali Raza", email: "ali.raza@gmail.com", plan: "Free", goal: "Muscle Gain", streak: 12, joined: "2026-02-20", status: "active" },
  { id: "au3", name: "Hina Malik", email: "hina@gmail.com", plan: "Family", goal: "Diabetes Control", streak: 30, joined: "2026-01-05", status: "active" },
  { id: "au4", name: "Omar Farooq", email: "omar@gmail.com", plan: "Pro", goal: "Heart Health", streak: 8, joined: "2026-03-10", status: "active" },
  { id: "au5", name: "Zainab Bibi", email: "zainab@gmail.com", plan: "Free", goal: "General Wellness", streak: 3, joined: "2026-04-01", status: "suspended" },
  { id: "au6", name: "Usman Sheikh", email: "usman@gmail.com", plan: "Pro", goal: "Weight Loss", streak: 22, joined: "2026-02-14", status: "active" },
  { id: "au7", name: "Ayesha Tariq", email: "ayesha@gmail.com", plan: "Family", goal: "General Wellness", streak: 18, joined: "2026-03-05", status: "active" },
  { id: "au8", name: "Bilal Hussain", email: "bilal@gmail.com", plan: "Free", goal: "Muscle Gain", streak: 0, joined: "2026-04-10", status: "active" },
];

export const mockUserGrowth = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 1}`,
  users: 9800 + Math.floor(Math.random() * 200) + i * 20,
}));

export const mockPlanDistribution = [
  { name: "Free", value: 6200, fill: "hsl(var(--muted-foreground))" },
  { name: "Pro", value: 3100, fill: "hsl(var(--primary))" },
  { name: "Family", value: 900, fill: "hsl(var(--secondary))" },
  { name: "Clinic", value: 232, fill: "hsl(var(--accent))" },
];
