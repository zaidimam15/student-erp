import { useEffect, useState } from "react";
import api from "../api/axios";

const baseInput =
  "w-full px-3.5 py-2.5 rounded-lg border border-ink-900/[0.12] text-[13.5px] text-ink-900 placeholder:text-ink-500/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white";

const RelationField = ({ field, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .get(field.endpoint, { params: { limit: 500 } })
      .then((res) => {
        if (active) setOptions(res.data.data || []);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [field.endpoint]);

  return (
    <select
      className={baseInput}
      value={value || ""}
      required={field.required}
      onChange={(e) => {
        const selected = options.find((o) => o._id === e.target.value);
        onChange(field.name, e.target.value, selected ? field.extraFields?.(selected) : undefined);
      }}
    >
      <option value="">{loading ? "Loading…" : `Select ${field.label.toLowerCase()}`}</option>
      {options.map((o) => (
        <option key={o._id} value={o._id}>
          {field.labelFn(o)}
        </option>
      ))}
    </select>
  );
};

const FormField = ({ field, value, onChange }) => {
  if (field.type === "relation") {
    return <RelationField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "select") {
    return (
      <select
        className={baseInput}
        value={value ?? ""}
        required={field.required}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        <option value="">Select {field.label.toLowerCase()}</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        className={baseInput}
        rows={3}
        value={value ?? ""}
        required={field.required}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    );
  }

  return (
    <input
      type={field.type || "text"}
      className={baseInput}
      value={value ?? ""}
      required={field.required}
      placeholder={field.placeholder}
      step={field.type === "number" ? field.step || "any" : undefined}
      onChange={(e) => onChange(field.name, field.type === "number" ? e.target.valueAsNumber || e.target.value : e.target.value)}
    />
  );
};

const CrudForm = ({ fields, formData, setFormData, onSubmit, submitting, submitLabel = "Save" }) => {
  const handleChange = (name, value, extra) => {
    setFormData((prev) => ({ ...prev, [name]: value, ...(extra || {}) }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
            <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <FormField field={field} value={formData[field.name]} onChange={handleChange} />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-accent text-white hover:bg-accent-dark transition-colors disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CrudForm;
