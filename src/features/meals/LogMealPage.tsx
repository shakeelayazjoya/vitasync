import { useEffect, useState } from "react";
import { Search, Plus, X, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setSearchQuery, addFood, removeFood, clearSelection, updateFoodQuantity } from "@/redux/slices/meals";
import { fetchMeals } from "@/redux/thunks/meals";
import { fetchFamilyMembers } from "@/redux/thunks/family";
import { createMeal } from "@/redux/thunks/createMeal";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const LogMealPage = () => {
  const dispatch = useAppDispatch();
  const { foodDatabase, searchQuery, selectedFoods, isLoading } = useAppSelector((s) => s.meals);
  const { isLoading: isSubmitting } = useAppSelector((s) => s.createMeal);
  const { members: familyMembers } = useAppSelector((s) => s.family);

  const [mealType, setMealType] = useState("Lunch");
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState("self");
  const [familyMemberName, setFamilyMemberName] = useState("Self");
  const [familyMemberRelationship, setFamilyMemberRelationship] = useState("self");
  const [familyMemberCalorieGoal, setFamilyMemberCalorieGoal] = useState(1800);
  const [bodyEnergy, setBodyEnergy] = useState(4);
  const [bodyMood, setBodyMood] = useState("good");
  const [bodyDigestion, setBodyDigestion] = useState("fine");
  const [bodyFocus, setBodyFocus] = useState(4);
  const [loggedAt, setLoggedAt] = useState(() => new Date().toISOString().slice(0, 16));

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchFamilyMembers());
  }, [dispatch]);

  const handleFamilyMemberChange = (newValue: string) => {
    setSelectedFamilyMemberId(newValue);
    if (newValue === "self") {
      setFamilyMemberName("Self");
      setFamilyMemberRelationship("self");
      setFamilyMemberCalorieGoal(1800);
      return;
    }

    const member = familyMembers.find((item) => item.id === newValue);
    if (member) {
      setFamilyMemberName(member.name ?? "");
      setFamilyMemberRelationship(member.relationship ?? "other");
      setFamilyMemberCalorieGoal(member.calorieGoal ?? 1800);
    }
  };

  // Live search filtering
  const filteredFoods = foodDatabase.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total calories with quantity
  const totalCalories = selectedFoods.reduce((sum, f) => sum + f.calories * (f.quantity || 1), 0);

  const handleLog = async () => {
    if (selectedFoods.length === 0) {
      toast.error("Please select at least one food item");
      return;
    }

    if (bodyEnergy < 1 || bodyEnergy > 5) {
      toast.error("Body energy must be a number between 1 and 5.");
      return;
    }

    if (bodyFocus < 1 || bodyFocus > 5) {
      toast.error("Body focus must be a number between 1 and 5.");
      return;
    }

    if (!bodyMood.trim() || !bodyDigestion.trim()) {
      toast.error("Please provide mood and digestion details.");
      return;
    }

    if (!familyMemberName.trim()) {
      toast.error("Please provide a family member.");
      return;
    }

    const parsedLoggedAt = new Date(loggedAt);
    if (Number.isNaN(parsedLoggedAt.getTime())) {
      toast.error("Please provide a valid logged at date.");
      return;
    }

    const selectedMember =
      selectedFamilyMemberId === "self"
        ? null
        : familyMembers.find((member) => member.id === selectedFamilyMemberId) ?? null;

    const mealPayload = {
      mealType: mealType.toLowerCase(),
      familyMember: selectedMember ? selectedMember.name ?? "" : "self",
      familyMemberRelationship: selectedMember ? selectedMember.relationship ?? "" : "",
      foods: selectedFoods.map((food) => ({
        name: food.name,
        portion: food.portion * (food.quantity || 1),
        unit: food.unit,
        calories: food.calories * (food.quantity || 1), // Send total calories for this item
        protein: food.protein * (food.quantity || 1),
        carbs: food.carbs * (food.quantity || 1),
        fat: food.fat * (food.quantity || 1),
        isDesi: food.isDesi,
        quantity: food.quantity || 1,
      })),
      bodyResponse: {
        energy: bodyEnergy,
        mood: bodyMood,
        digestion: bodyDigestion,
        focus: bodyFocus,
      },
      loggedAt: parsedLoggedAt.toISOString(),
    };

    try {
      await dispatch(createMeal(mealPayload)).unwrap();
      toast.success(`${mealType} logged with ${totalCalories} kcal!`);
      dispatch(clearSelection());
      dispatch(setSearchQuery(""));
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to log meal. Please try again.");
    }
  };

  // Quantity handlers
  const increaseQuantity = (id: string) => {
    dispatch(updateFoodQuantity({ id, quantity: 1 }));
  };

  const decreaseQuantity = (id: string) => {
    dispatch(updateFoodQuantity({ id, quantity: -1 }));
  };

  return (
    <div className="space-y-6 py-12">
      <PageHeader title="Log Meal" description="Search and add desi food items to log your meal" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Search & Food List */}
        <div className="lg:col-span-2 order-last lg:order-none space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Type to search desi foods... (e.g. biryani, paratha, chai)"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </div>

            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Live Search Results */}
          <div className="grid sm:grid-cols-2 gap-3">
            {isLoading ? (
              <div className="sm:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <LoadingSpinner />
                  </CardContent>
                </Card>
              </div>
            ) : searchQuery.trim() === "" ? (
              <div className="sm:col-span-2">
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    <Search className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    Start typing to search for desi meals
                  </CardContent>
                </Card>
              </div>
            ) : filteredFoods.length === 0 ? (
              <div className="sm:col-span-2">
                <Card>
                  <CardContent className="p-8 text-center text-sm text-muted-foreground">
                    No foods found matching "{searchQuery}"
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredFoods.map((food) => {
                const isSelected = selectedFoods.some((f) => f.id === food.id);
                return (
                  <Card
                    key={food.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() =>
                      isSelected ? dispatch(removeFood(food.id)) : dispatch(addFood(food))
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{food.name}</h3>
                        <Badge variant="outline" className="font-mono text-xs">
                          {food.calories} kcal
                        </Badge>
                      </div>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>P: {food.protein}g</span>
                        <span>C: {food.carbs}g</span>
                        <span>F: {food.fat}g</span>
                        <span className="ml-auto">
                          {food.portion} {food.unit}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Foods Summary with Quantity */}
        <Card className="w-full order-first lg:order-none lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>{mealType} Summary</span>
              {selectedFoods.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(clearSelection())}
                  className="text-xs text-muted-foreground"
                >
                  Clear All <X className="h-3 w-3 ml-1" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {selectedFoods.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No items selected yet
              </p>
            ) : (
              selectedFoods.map((f) => {
                const quantity = f.quantity || 1;
                const itemTotal = f.calories * quantity;

                return (
                  <div key={f.id} className="flex items-center justify-between text-sm border-b pb-3 last:border-b-0">
                    <div className="flex-1">
                      <span className="text-foreground font-medium">{f.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {f.portion} {f.unit} × {quantity}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-r-none"
                          onClick={() => decreaseQuantity(f.id)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 font-mono text-sm font-medium">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-l-none"
                          onClick={() => increaseQuantity(f.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Item Total Calories */}
                      <div className="font-mono text-right min-w-[60px]">
                        {itemTotal} <span className="text-xs text-muted-foreground">kcal</span>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => dispatch(removeFood(f.id))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}

            <div className="border-t border-border pt-4 space-y-4">
              {/* All form fields remain the same */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="family-member-name" className="text-sm">Family member</Label>
                  <Select value={selectedFamilyMemberId} onValueChange={handleFamilyMemberChange}>
                    <SelectTrigger id="family-member-name" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      {familyMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family-member-relationship" className="text-sm">Relationship</Label>
                  <Select
                    value={familyMemberRelationship}
                    onValueChange={setFamilyMemberRelationship}
                    disabled={selectedFamilyMemberId !== "self"}
                  >
                    <SelectTrigger id="family-member-relationship" className="w-full">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="wife">Wife</SelectItem>
                      <SelectItem value="husband">Husband</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="family-member-goal" className="text-sm">Calorie goal</Label>
                  <Input
                    id="family-member-goal"
                    type="number"
                    min={0}
                    value={familyMemberCalorieGoal}
                    onChange={(e) => setFamilyMemberCalorieGoal(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logged-at" className="text-sm">Logged at</Label>
                  <Input
                    id="logged-at"
                    type="datetime-local"
                    value={loggedAt}
                    onChange={(e) => setLoggedAt(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="body-energy" className="text-sm">Energy (1-5)</Label>
                  <Input
                    id="body-energy"
                    type="number"
                    min={1}
                    max={5}
                    value={bodyEnergy}
                    onChange={(e) => setBodyEnergy(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-focus" className="text-sm">Focus (1-5)</Label>
                  <Input
                    id="body-focus"
                    type="number"
                    min={1}
                    max={5}
                    value={bodyFocus}
                    onChange={(e) => setBodyFocus(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="body-mood" className="text-sm">Mood</Label>
                  <Select value={bodyMood} onValueChange={setBodyMood}>
                    <SelectTrigger id="body-mood" className="w-full">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="great">Great</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="bad">Bad</SelectItem>
                      <SelectItem value="terrible">Terrible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-digestion" className="text-sm">Digestion</Label>
                  <Select value={bodyDigestion} onValueChange={setBodyDigestion}>
                    <SelectTrigger id="body-digestion" className="w-full">
                      <SelectValue placeholder="Select digestion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine">Fine</SelectItem>
                      <SelectItem value="bloated">Bloated</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                      <SelectItem value="nauseous">Nauseous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Grand Total */}
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="font-mono text-primary">{totalCalories} kcal</span>
            </div>

            <Button
              className="w-full"
              onClick={handleLog}
              disabled={selectedFoods.length === 0 || isSubmitting}
            >
              <Plus className="h-4 w-4 mr-1" /> 
              {isSubmitting ? "Logging..." : `Log ${mealType}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogMealPage;