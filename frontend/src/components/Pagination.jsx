import { motion } from "framer-motion";

function Pagination({
  onPageNext,
  onPagePrev,
  onPageChange,
  totalPages,
  currentPage,
  loading,
}) {
  if (loading) {
    return <div className="h-12" />;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.nav
      aria-label="Page navigation example"
      className="flex justify-center my-4"
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ul className="flex -space-x-px text-sm">
        <li>
          <button
            className={`flex items-center justify-center box-border border rounded-l-base text-sm px-3 h-9 focus:outline-none cursor-pointer ${
              currentPage <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-body hover:bg-gray-50 hover:text-heading border-gray-300"
            }`}
            onClick={onPagePrev}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          const isActive = pageNum === currentPage;

          return (
            <li key={index}>
              <button
                className={`flex items-center justify-center text-sm w-9 h-9 border focus:outline-none cursor-pointer ${
                  isActive
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-body hover:bg-gray-50 hover:text-heading border-gray-300"
                }`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={`flex items-center justify-center box-border border rounded-r-base text-sm px-3 h-9 focus:outline-none cursor-pointer ${
              currentPage >= totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-body hover:bg-gray-50 hover:text-heading border-gray-300"
            }`}
            onClick={onPageNext}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Pagination;
