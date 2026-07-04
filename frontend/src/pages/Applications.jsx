import { useEffect, useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import API from "../api/axios";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const emptyForm = {
    company: "",
    role: "",
    location: "",
    jobLink: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications");
      setApplications(res.data.data.applications);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingApplication(null);
    setFormData(emptyForm);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingApplication(null);
  };

  const handleViewClick = (app) => {
    setViewingApplication(app);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (app) => {
    setEditingApplication(app);

    setFormData({
      company: app.company || "",
      role: app.role || "",
      location: app.location || "",
      jobLink: app.jobLink || "",
      status: app.status || "Applied",
      appliedDate: app.appliedDate ? app.appliedDate.slice(0, 10) : "",
      notes: app.notes || "",
    });

    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role) {
      toast.error("Company and role are required");
      return;
    }

    try {
      setSaving(true);

      if (editingApplication) {
        await API.put(`/applications/${editingApplication._id}`, formData);
        toast.success("Application updated successfully");
      } else {
        await API.post("/applications", formData);
        toast.success("Application added successfully");
      }

      closeModal();
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save application");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Applications"
        subtitle="Track and manage every opportunity in one place."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Add Application
          </Button>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              placeholder="Search company or role..."
              className="pl-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
          >
            <option>All Status</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <p className="py-10 text-center text-muted">Loading applications...</p>
          ) : filteredApplications.length === 0 ? (
            <p className="py-10 text-center text-muted">No applications found.</p>
          ) : (
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-border text-sm text-muted">
                  <th className="py-4 font-semibold">Company</th>
                  <th className="py-4 font-semibold">Role</th>
                  <th className="py-4 font-semibold">Location</th>
                  <th className="py-4 font-semibold">Status</th>
                  <th className="py-4 font-semibold">Applied Date</th>
                  <th className="py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4 font-semibold text-dark">
                      {app.company}
                    </td>
                    <td className="py-4 text-muted">{app.role}</td>
                    <td className="py-4 text-muted">{app.location || "N/A"}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-primary">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-muted">
                      {formatDate(app.appliedDate)}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewClick(app)}
                          className="rounded-lg border border-border p-2 text-muted hover:text-primary"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleEditClick(app)}
                          className="rounded-lg border border-border p-2 text-muted hover:text-primary"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(app._id)}
                          className="rounded-lg border border-border p-2 text-muted hover:text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <Card className="w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-dark">
                  {editingApplication ? "Edit Application" : "Add Application"}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {editingApplication
                    ? "Update this job opportunity."
                    : "Save a new job opportunity to your tracker."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-xl border border-border p-2 text-muted hover:text-dark"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmitApplication}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
              />

              <Input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Job role"
              />

              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />

              <Input
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                placeholder="Application link"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>

              <Input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="min-h-28 rounded-xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100 md:col-span-2"
              />

              <div className="flex justify-end gap-3 md:col-span-2">
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>

                <Button type="submit" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingApplication
                    ? "Update Application"
                    : "Save Application"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isViewModalOpen && viewingApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <Card className="w-full max-w-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-dark">
                  {viewingApplication.role}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {viewingApplication.company}
                </p>
              </div>

              <button
                onClick={closeViewModal}
                className="rounded-xl border border-border p-2 text-muted hover:text-dark"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Company
                  </p>
                  <p className="mt-1 font-semibold text-dark">
                    {viewingApplication.company}
                  </p>
                </div>

                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Role
                  </p>
                  <p className="mt-1 font-semibold text-dark">
                    {viewingApplication.role}
                  </p>
                </div>

                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Location
                  </p>
                  <p className="mt-1 font-semibold text-dark">
                    {viewingApplication.location || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Status
                  </p>
                  <p className="mt-1 font-semibold text-primary">
                    {viewingApplication.status}
                  </p>
                </div>

                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Applied Date
                  </p>
                  <p className="mt-1 font-semibold text-dark">
                    {formatDate(viewingApplication.appliedDate)}
                  </p>
                </div>

                <div className="rounded-xl bg-softBg p-4">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Job Link
                  </p>

                  {viewingApplication.jobLink ? (
                    <a
                      href={viewingApplication.jobLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block truncate font-semibold text-primary"
                    >
                      Open Link
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold text-dark">N/A</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-softBg p-4">
                <p className="text-xs font-semibold uppercase text-muted">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-dark">
                  {viewingApplication.notes || "No notes added."}
                </p>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={closeViewModal}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Applications;