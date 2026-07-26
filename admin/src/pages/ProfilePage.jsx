import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useUpdateUserProfile from "../hooks/user/useUpdateUserProfile";
import useUpdatePassword from "../hooks/user/useUpdatePassword";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Save, User, Mail, Shield, Calendar, Lock } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const { updateProfile, isPending } = useUpdateUserProfile();
  const { updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) return null;

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      const res = await updateProfile(formData);
      login(res);
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error!",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: "Error!",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    try {
      await updatePassword({ oldPassword, newPassword });
      toast({
        title: "Success!",
        description: "Password updated successfully.",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.image_url} />
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge className="mt-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              <Shield className="h-3 w-3 mr-1" />
              {user.role}
            </Badge>

            <div className="w-full mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">Joined</p>
                  <p className="text-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {user.last_login && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Last Login</p>
                    <p className="text-foreground">
                      {new Date(user.last_login).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                  Role
                </Label>
                <Input value={user.role} disabled className="opacity-60" />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Input value={user.status} disabled className="opacity-60" />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="oldPassword"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  Current Password
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isUpdatingPassword}>
                  <Lock className="h-4 w-4 mr-2" />
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
