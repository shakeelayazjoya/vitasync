import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toast } from "sonner";
import { addFamilyMember, fetchFamilyMembers } from "@/redux/thunks/family";
import { setActiveMember } from "@/redux/slices/family";
import PageHeader from "@/components/shared/PageHeader";

const FamilyPage = () => {
  const dispatch = useAppDispatch();
  const { members, activeMemberId, isLoading, error } = useAppSelector((s) => s.family);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    relationship: "",
    calorieGoal: 1800,
    age: 0,
    healthInfo: "",
    medicalConditions: "",
  });

  useEffect(() => {
    dispatch(fetchFamilyMembers());
  }, [dispatch]);

  const handleFieldChange = (field: keyof typeof form, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.relationship.trim()) {
      toast.error("Please enter the member name and relationship.");
      return;
    }

    if (form.age <= 0 || form.calorieGoal <= 0) {
      toast.error("Age and calorie goal must be positive numbers.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      relationship: form.relationship.trim(),
      calorieGoal: form.calorieGoal,
      age: form.age,
      healthInfo: form.healthInfo.trim(),
      medicalConditions: form.medicalConditions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      await dispatch(addFamilyMember(payload)).unwrap();
      toast.success(`${payload.name} was added successfully.`);
      setForm({ name: "", relationship: "", calorieGoal: 1800, age: 0, healthInfo: "", medicalConditions: "" });
      setShowAddForm(false);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to add family member.");
    }
  };

  return (
    <div className="space-y-6 py-12">
      <PageHeader title="Family Profiles" description="Manage and switch between family member profiles" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          className="cursor-pointer hover:shadow-md transition-all border-dashed border border-muted"
          onClick={() => setShowAddForm((current) => !current)}
        >
          <CardContent className="p-5 flex flex-col items-center justify-center min-h-[180px]">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Add Family Member</p>
          </CardContent>
        </Card>

        {members.map((member) => (
          <Card
            key={member.id}
            className={`cursor-pointer transition-all hover:shadow-md ${member.id === activeMemberId ? "ring-2 ring-primary" : ""}`}
            onClick={() => dispatch(setActiveMember(member.id))}
          >
            <CardContent className="p-5 text-center">
              <Avatar className="h-16 w-16 mx-auto mb-3">
                <AvatarFallback className="bg-primary/15 text-primary text-xl font-bold">{member.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground">{member.name ?? "Unnamed member"}</h3>
              <p className="text-sm text-muted-foreground">Age: {member.age ?? "—"}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {member.goal ?? (member.calorieGoal ? `${member.calorieGoal} kcal` : "No goal")}
              </Badge>
              {member.id === activeMemberId && (
                <Badge className="mt-2 ml-2 text-xs">Active</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {members.length === 0 && !isLoading && (
        <div className="rounded-lg border border-dashed border-muted p-6 text-center text-sm text-muted-foreground">
          No family members found. Add one below.
        </div>
      )}

      {showAddForm && (
        <Card className="p-6 ring-1 ring-primary/20 border border-primary/10">
          <CardHeader>
            <CardTitle>Add New Family Member</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="member-name">Name</Label>
              <Input
                id="member-name"
                value={form.name}
                onChange={(event) => handleFieldChange("name", event.target.value)}
                placeholder="Sana Khan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-relationship">Relationship</Label>
              <Input
                id="member-relationship"
                value={form.relationship}
                onChange={(event) => handleFieldChange("relationship", event.target.value)}
                placeholder="Daughter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-age">Age</Label>
              <Input
                id="member-age"
                type="number"
                value={form.age}
                onChange={(event) => handleFieldChange("age", Number(event.target.value))}
                placeholder="8"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-calorie-goal">Calorie Goal</Label>
              <Input
                id="member-calorie-goal"
                type="number"
                value={form.calorieGoal}
                onChange={(event) => handleFieldChange("calorieGoal", Number(event.target.value))}
                placeholder="1800"
                min={0}
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="member-health-info">Health Info</Label>
              <Textarea
                id="member-health-info"
                value={form.healthInfo}
                onChange={(event) => handleFieldChange("healthInfo", event.target.value)}
                placeholder="Healthy, mild seasonal allergies"
                rows={3}
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="member-medical-conditions">Medical Conditions</Label>
              <Input
                id="member-medical-conditions"
                value={form.medicalConditions}
                onChange={(event) => handleFieldChange("medicalConditions", event.target.value)}
                placeholder="allergy, asthma"
              />
              <p className="text-xs text-muted-foreground">Separate multiple conditions with commas.</p>
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Save Member"}
              </Button>
              <Button variant="outline" type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default FamilyPage;
