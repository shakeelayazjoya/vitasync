import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dna, Loader2, ChevronRight, ChevronLeft, TrendingDown, Dumbbell, Heart, HeartPulse, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { registerUser } from "@/redux/thunks/auth";
import { selectAuthLoading } from "@/redux/slices/auth";

const goals = [
  { id: "weightLoss", label: "Weight Loss", icon: TrendingDown },
  { id: "muscleGain", label: "Muscle Gain", icon: Dumbbell },
  { id: "diabetes", label: "Diabetes Control", icon: Heart },
  { id: "heartHealth", label: "Heart Health", icon: HeartPulse },
  { id: "pregnancy", label: "Pregnancy", icon: Smile },
  { id: "senior", label: "Senior Health", icon: Smile },
  { id: "child", label: "Child Health", icon: Smile },
];

const relationshipOptions = ["Wife", "Husband", "Child", "Parent", "Other"];

const initialFamilyMember = { name: "", relationship: "", calorieGoal: 1800 };

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    goalMode: "weightLoss",
    calorieGoal: 2000,
    waterGoal: 8,
    language: "en",
    familyMembers: [initialFamilyMember],
  });

  const updateFamilyMember = (index: number, field: keyof typeof initialFamilyMember, value: string | number) => {
    const familyMembers = [...form.familyMembers];
    familyMembers[index] = {
      ...familyMembers[index],
      [field]: value,
    };
    setForm({ ...form, familyMembers });
  };

  const addFamilyMember = () => {
    setForm({ ...form, familyMembers: [...form.familyMembers, initialFamilyMember] });
  };

  const removeFamilyMember = (index: number) => {
    setForm({
      ...form,
      familyMembers: form.familyMembers.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      goalMode: form.goalMode,
      calorieGoal: form.calorieGoal,
      waterGoal: form.waterGoal,
      language: form.language,
      familyMembers: form.familyMembers.filter((member) => member.name.trim().length > 0),
    };

    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created!");
      navigate("/dashboard");
    } else {
      toast.error("Unable to create account. Please try again.");
    }
  };

  const canNext = () => {
    if (step === 1) {
      return (
        form.name.trim().length > 0 &&
        form.email.trim().length > 0 &&
        form.password.length > 0 &&
        form.password === form.confirmPassword
      );
    }

    if (step === 2) {
      return !!form.goalMode;
    }

    return form.calorieGoal > 0 && form.waterGoal > 0 && form.language.length > 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />

      <Card className="w-full max-w-2xl relative z-10 shadow-lg border-border rounded-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Dna className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <div className="flex items-center gap-2 justify-center mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? "w-10 bg-primary" : s < step ? "w-10 bg-primary/40" : "w-10 bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Step {step} of 3</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Sara Khan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ali3@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setForm({ ...form, goalMode: goal.id })}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    form.goalMode === goal.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <goal.icon className={`h-6 w-6 mb-2 ${form.goalMode === goal.id ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-sm font-medium">{goal.label}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <Label>Daily Calorie Goal</Label>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-primary">{form.calorieGoal} kcal</span>
                    <span className="text-sm text-muted-foreground">Target</span>
                  </div>
                  <Slider
                    value={[form.calorieGoal]}
                    onValueChange={(value) => setForm({ ...form, calorieGoal: value[0] })}
                    min={1200}
                    max={4000}
                    step={50}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Daily Water Goal</Label>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-primary">{form.waterGoal} glasses</span>
                    <span className="text-sm text-muted-foreground">Minimum</span>
                  </div>
                  <Slider
                    value={[form.waterGoal]}
                    onValueChange={(value) => setForm({ ...form, waterGoal: value[0] })}
                    min={4}
                    max={15}
                    step={1}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Language</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "en", label: "English" },
                    { code: "ur", label: "اردو" },
                  ].map((option) => (
                    <Button
                      key={option.code}
                      type="button"
                      variant={form.language === option.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setForm({ ...form, language: option.code })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Family Members</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFamilyMember}>
                    Add member
                  </Button>
                </div>
                <div className="space-y-4">
                  {form.familyMembers.map((member, index) => (
                    <div key={index} className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_80px]">
                      <div className="space-y-2">
                        <Label>Member Name</Label>
                        <Input
                          placeholder="Sara"
                          value={member.name}
                          onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <select
                          className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                          value={member.relationship}
                          onChange={(e) => updateFamilyMember(index, "relationship", e.target.value)}
                        >
                          <option value="">Select relationship</option>
                          {relationshipOptions.map((relationship) => (
                            <option key={relationship} value={relationship.toLowerCase()}>
                              {relationship}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Calorie Goal</Label>
                        <Input
                          type="number"
                          min={1000}
                          max={4000}
                          value={member.calorieGoal}
                          onChange={(e) => updateFamilyMember(index, "calorieGoal", Number(e.target.value))}
                        />
                      </div>
                      {form.familyMembers.length > 1 && (
                        <div className="flex items-end justify-end">
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeFamilyMember(index)}>
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            {step > 1 && (
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button className="flex-1" disabled={!canNext()} onClick={() => setStep(step + 1)}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="flex-1" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
