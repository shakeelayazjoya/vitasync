import { useMemo, useState } from "react";

type FoodItem = {
  id: number;
  name: string;
  servings: number;
  kcalPerServing: number;
};

const TABS = ["Feet & Inches", "Centimeters", "Meters"];

export default function CalculatorPage() {
  const [mode, setMode] = useState(0); // 0=ft, 1=cm, 2=m
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(7);
  const [cm, setCm] = useState(170);
  const [meters, setMeters] = useState(1.7);
  const [weightKg, setWeightKg] = useState(70);

  const [foodName, setFoodName] = useState("");
  const [servings, setServings] = useState(1);
  const [kcalPerServing, setKcalPerServing] = useState(200);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const heightCm = useMemo(() => {
    return mode === 0 ? ft * 30.48 + inch * 2.54 : mode === 1 ? cm : meters * 100;
  }, [mode, ft, inch, cm, meters]);

  const totalInches = heightCm / 2.54;
  const rawFeet = Math.floor(totalInches / 12);
  const rawInches = Math.round(totalInches - rawFeet * 12);
  const displayFt = rawInches === 12 ? rawFeet + 1 : rawFeet;
  const displayIn = rawInches === 12 ? 0 : rawInches;
  const displayCm = Math.round(heightCm);
  const displayM = (heightCm / 100).toFixed(2);

  const bmi = useMemo(
    () => (heightCm > 0 && weightKg > 0 ? weightKg / Math.pow(heightCm / 100, 2) : null),
    [heightCm, weightKg]
  );

  const bmiCategory = (bmiValue: number | null) => {
    if (bmiValue === null) return "";
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const bmiPct = (bmiValue: number | null) => {
    if (bmiValue === null) return 0;
    if (bmiValue < 18.5) return (bmiValue / 18.5) * 20;
    if (bmiValue < 25) return 20 + ((bmiValue - 18.5) / 6.5) * 30;
    if (bmiValue < 30) return 50 + ((bmiValue - 25) / 5) * 25;
    return Math.min(75 + ((bmiValue - 30) / 10) * 25, 100);
  };

  const handleModeChange = (idx: number) => {
    setMode(idx);

    if (idx === 0) {
      setFt(displayFt);
      setInch(displayIn);
    }

    if (idx === 1) {
      setCm(displayCm);
    }

    if (idx === 2) {
      setMeters(parseFloat(displayM));
    }
  };

  const addFood = () => {
    if (!foodName.trim() || servings <= 0 || kcalPerServing <= 0) return;

    setFoods((prev) => [
      { id: Date.now(), name: foodName.trim(), servings, kcalPerServing },
      ...prev,
    ]);
    setFoodName("");
    setServings(1);
    setKcalPerServing(200);
  };

  const removeFood = (id: number) => setFoods((prev) => prev.filter((f) => f.id !== id));

  const totalKcal = useMemo(
    () => foods.reduce((sum, f) => sum + f.servings * f.kcalPerServing, 0),
    [foods]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 pt-12 sm:px-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-5 text-base font-semibold text-foreground">Height converter</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleModeChange(index)}
              className={`rounded-2xl border px-4 py-2 text-sm transition-colors ${
                mode === index
                  ? "border-secondary bg-secondary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mode === 0 && (
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Feet</label>
              <input
                className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                type="number"
                min="0"
                max="9"
                value={ft}
                onChange={(e) => setFt(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Inches</label>
              <input
                className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                type="number"
                min="0"
                max="11"
                value={inch}
                onChange={(e) => setInch(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {mode === 1 && (
          <div className="mb-6">
            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Centimeters</label>
            <input
              className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              type="number"
              min="0"
              value={cm}
              onChange={(e) => setCm(Number(e.target.value))}
            />
          </div>
        )}

        {mode === 2 && (
          <div className="mb-6">
            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Meters</label>
            <input
              className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              type="number"
              min="0"
              step="0.01"
              value={meters}
              onChange={(e) => setMeters(Number(e.target.value))}
            />
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Feet & Inches", value: heightCm > 0 ? `${displayFt}' ${displayIn}?` : "�" },
            { label: "Centimeters", value: heightCm > 0 ? `${displayCm} cm` : "�" },
            { label: "Meters", value: heightCm > 0 ? `${displayM} m` : "�" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl bg-muted p-4">
              <div className="mb-2 text-[11px] text-muted-foreground">{label}</div>
              <div className="text-lg font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-5 text-base font-semibold text-foreground">BMI calculator</p>
        <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Weight (kg)</label>
        <input
          className="h-11 max-w-[200px] rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          type="number"
          min="0"
          value={weightKg}
          onChange={(e) => setWeightKg(Number(e.target.value))}
        />

        {bmi !== null && (
          <div className="mt-5 space-y-3">
            <div className="relative h-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500">
              <span
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-foreground shadow-sm transition-all"
                style={{ left: `${bmiPct(bmi).toFixed(1)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <p className="text-sm text-foreground">
              BMI: <strong>{bmi.toFixed(1)}</strong> � {bmiCategory(bmi)}
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-5 text-base font-semibold text-foreground">Food calorie tracker</p>

        <div className="grid gap-4 sm:grid-cols-3 mb-5">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Food name</label>
            <input
              className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              type="text"
              placeholder="e.g. Rice"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFood()}
            />
          </div>
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Servings</label>
            <input
              className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              type="number"
              min="0.1"
              step="0.1"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">kcal / serving</label>
            <input
              className="h-11 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              type="number"
              min="1"
              value={kcalPerServing}
              onChange={(e) => setKcalPerServing(Number(e.target.value))}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={addFood}
          className="mb-4 w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/70 hover:bg-primary/5"
        >
          + Add food
        </button>

        <div className="space-y-3 max-h-[240px] overflow-y-auto">
          {foods.length === 0 ? (
            <p className="text-sm text-muted-foreground">No foods added yet.</p>
          ) : (
            foods.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-muted p-4 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">{food.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {food.servings} � {food.kcalPerServing} kcal
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">{Math.round(food.servings * food.kcalPerServing)} kcal</span>
                  <button
                    type="button"
                    onClick={() => removeFood(food.id)}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    ?
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted-foreground">Total calories</span>
          <span className="text-2xl font-semibold text-foreground">{totalKcal.toLocaleString()} kcal</span>
        </div>
      </section>
    </div>
  );
}
