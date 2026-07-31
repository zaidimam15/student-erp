import { useEffect, useState, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import api from "../api/axios";
import DataTable from "./DataTable";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import CrudForm from "./CrudForm";

const CrudPage = ({ title, subtitle, icon: Icon, endpoint, columns, fields, emptyDefaults, searchPlaceholder }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyDefaults || {});
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint, { params: search ? { search } : {} });
      setRows(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, search]);

  useEffect(() => {
    const timer = setTimeout(fetchRows, 300);
    return () => clearTimeout(timer);
  }, [fetchRows]);

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyDefaults || {});
    setError("");
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const initial = { ...row };
    fields.forEach((f) => {
      if (f.type === "date" && initial[f.name]) {
        initial[f.name] = initial[f.name].slice(0, 10);
      }
      if (f.type === "relation" && initial[f.name] && typeof initial[f.name] === "object") {
        initial[f.name] = initial[f.name]._id;
      }
    });
    setFormData(initial);
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editing) {
        await api.put(`${endpoint}/${editing._id}`, formData);
      } else {
        await api.post(endpoint, formData);
      }
      setModalOpen(false);
      fetchRows();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`${endpoint}/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchRows();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
          )}
          <div>
            <h1 className="font-display text-xl font-bold text-ink-900">{title}</h1>
            {subtitle && <p className="text-[13px] text-ink-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder || "Search…"}
              className="pl-9 pr-3.5 py-2.5 rounded-lg border border-ink-900/[0.12] text-[13px] w-full sm:w-64 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-white text-[13px] font-semibold hover:bg-accent-dark transition-colors shrink-0"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? `Edit ${title}` : `Add ${title}`}>
        {error && (
          <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12.5px]">
            {error}
          </div>
        )}
        <CrudForm
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel={editing ? "Save changes" : "Create"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`This will permanently delete this record from ${title}. This action cannot be undone.`}
      />
    </div>
  );
};

export default CrudPage;
