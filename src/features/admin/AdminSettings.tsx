import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const AdminSettings = () => (
  <div className="p-12  max-w-2xl">
    <Card>
      <CardHeader><CardTitle className="text-base">Platform Settings</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>App Name</Label>
          <Input defaultValue="VitaSync" />
        </div>
        <div className="space-y-2">
          <Label>Support Email</Label>
          <Input defaultValue="support@vitasync.pk" type="email" />
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="text-base">Feature Flags</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium">AI Coach</p><p className="text-xs text-muted-foreground">Enable AI coaching for all users</p></div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium">Family Plans</p><p className="text-xs text-muted-foreground">Allow family subscriptions</p></div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Put the app in maintenance</p></div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminSettings;
