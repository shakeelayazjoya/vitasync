import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/shared/PageHeader";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="py-12 max-w-6xl mx-auto space-y-6">
      <PageHeader title="Settings" description="Manage your account preferences" />

      <Card>
        <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={user?.name || ""} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email || ""} type="email" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Receive meal reminders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Weekly Reports</p>
              <p className="text-xs text-muted-foreground">Email weekly summary</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">AI Coaching</p>
              <p className="text-xs text-muted-foreground">Enable personalized tips</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader><CardTitle className="text-base text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Once deleted, your account cannot be recovered.</p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
