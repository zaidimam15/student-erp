import { Pencil, Trash2, Inbox } from "lucide-react";

const DataTable = ({ columns, rows, loading, onEdit, onDelete, emptyLabel = "No records found" }) => {
  return (
    <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink-900/[0.07] bg-ink-900/[0.015]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-wide text-ink-500 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-wide text-ink-500 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-14 text-center text-ink-500 text-sm">
                  <div className="inline-block w-6 h-6 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-ink-500">
                    <Inbox size={26} strokeWidth={1.5} />
                    <p className="text-sm">{emptyLabel}</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row._id}
                  className="border-b border-ink-900/[0.05] last:border-0 hover:bg-ink-900/[0.015] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-[13.5px] text-ink-800 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key] ?? "—"}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg text-ink-500 hover:text-accent-dark hover:bg-accent/10 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-2 rounded-lg text-ink-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
