import { useState } from "react";
import { Lock, Trash2, ShieldCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import API from "../api/axios";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put("/auth/change-password", passwordForm);

      toast.success(res.data.message || "Password updated successfully");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const res = await API.delete("/auth/delete-account");

      toast.success(res.data.message || "Account deleted successfully");

      logout();

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your account security and account preferences."
      />

      <Card>
        <div className="flex items-center gap-3">
          <Lock className="text-primary" />
          <h3 className="text-xl font-bold text-dark">Change Password</h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={passwordForm.currentPassword}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={passwordForm.newPassword}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={passwordForm.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center gap-3">
            <Trash2 className="text-red-500" />
            <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
          </div>

          <p className="mt-4 text-sm leading-6 text-red-500">
            Deleting your account will permanently remove your profile, resumes,
            and account data.
          </p>

          <Button
            variant="danger"
            className="mt-6"
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>
        </Card>

        <Card className="bg-dark text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-indigo-300" />
            <h3 className="text-xl font-bold">Security Note</h3>
          </div>

          <p className="mt-4 text-slate-300">
            Your account is protected using JWT authentication, password hashing
            with bcrypt, and protected backend routes.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
