import { useEffect, useState } from "react";
import { User, Mail, MapPin, Briefcase, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import API from "../api/axios";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    targetRole: "",
    location: "",
    bio: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await API.get("/auth/profile");

      setProfile({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        targetRole: res.data.data.targetRole || "",
        location: res.data.data.location || "",
        bio: res.data.data.bio || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);

      const res = await API.put("/auth/profile", {
        name: profile.name,
        targetRole: profile.targetRole,
        location: profile.location,
        bio: profile.bio,
      });

      setProfile({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        targetRole: res.data.data.targetRole || "",
        location: res.data.data.location || "",
        bio: res.data.data.bio || "",
      });

      localStorage.setItem("careerpilot_user", JSON.stringify(res.data.data));

      toast.success(res.data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const avatarLetter = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "U";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your career profile details."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
            {avatarLetter}
          </div>

          <h3 className="mt-5 text-xl font-bold text-dark">
            {profile.name || "Your Name"}
          </h3>

          <p className="mt-1 text-muted">
            {profile.targetRole || "Add your target role"}
          </p>

          <p className="mt-3 text-sm text-muted">
            {profile.location || "Add your location"}
          </p>
        </Card>

        <Card className="xl:col-span-2">
          <h3 className="text-xl font-bold text-dark">Personal Information</h3>

          <form onSubmit={handleSave} className="mt-6 grid gap-4 md:grid-cols-2">
            <Input
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
            />

            <Input
              name="email"
              placeholder="Email"
              value={profile.email}
              disabled
              className="cursor-not-allowed bg-slate-50"
            />

            <Input
              name="targetRole"
              placeholder="Target Role"
              value={profile.targetRole}
              onChange={handleChange}
            />

            <Input
              name="location"
              placeholder="Location"
              value={profile.location}
              onChange={handleChange}
            />

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="min-h-32 rounded-xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100 md:col-span-2"
              placeholder="Bio"
            />

            <Button type="submit" className="md:col-span-2" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: <User />, label: "Name", value: profile.name || "Not added" },
          { icon: <Mail />, label: "Email", value: profile.email || "Not added" },
          {
            icon: <MapPin />,
            label: "Location",
            value: profile.location || "Not added",
          },
          {
            icon: <Briefcase />,
            label: "Role",
            value: profile.targetRole || "Not added",
          },
        ].map((item) => (
          <Card key={item.label}>
            <div className="text-primary">{item.icon}</div>
            <p className="mt-4 text-sm text-muted">{item.label}</p>
            <h4 className="mt-1 font-bold text-dark">{item.value}</h4>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;