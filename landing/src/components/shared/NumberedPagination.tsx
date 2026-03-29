interface NumberedPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  showWhenSinglePage?: boolean;
}

export default function NumberedPagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  showWhenSinglePage = false,
}: NumberedPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  if (!showWhenSinglePage && safeTotalPages <= 1) return null;

  const visible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(safeTotalPages, page + 2);

  if (page <= 3) {
    start = 1;
    end = Math.min(safeTotalPages, visible);
  }

  if (page > safeTotalPages - 3) {
    end = safeTotalPages;
    start = Math.max(1, safeTotalPages - (visible - 1));
  }

  const nodes: (number | string)[] = [];

  if (start > 1) {
    nodes.push(1);
    if (start > 2) nodes.push("...");
  }

  for (let p = start; p <= end; p++) {
    nodes.push(p);
  }

  if (end < safeTotalPages) {
    if (end < safeTotalPages - 1) nodes.push("...");
    nodes.push(safeTotalPages);
  }

  return (
    <nav className="inline-flex items-center space-x-2" aria-label="Pagination">
      <button
        type="button"
        className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
      >
        Trước
      </button>

      {nodes.map((node, idx) =>
        typeof node === "string" ? (
          <span key={`sep-${idx}`} className="px-2 text-sm text-gray-400">
            {node}
          </span>
        ) : (
          <button
            key={node}
            type="button"
            onClick={() => onPageChange(Number(node))}
            disabled={disabled || node === page}
            className={
              `px-3 py-2 rounded-full text-sm font-medium border disabled:opacity-70 disabled:cursor-default ` +
              (node === page
                ? "bg-brand-yellow text-white border-brand-yellow"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100")
            }
          >
            {node}
          </button>
        ),
      )}

      <button
        type="button"
        className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= safeTotalPages}
      >
        Sau
      </button>
    </nav>
  );
}
