import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatProductName } from "../utils/formatProductName";
import { Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";

import useProductStore from "../store/useProductStore";
import useUserStore from "../store/useUserStore";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import MiniSpinner from "../components/MiniSpinner";
import Filter from "../components/Filter";
import CustomPopover from "../components/ProductPopover";

const tableHeads = ["Name", "Price", "Category", "Featured"];

function ProductsPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const {
    products,
    pagination,
    loading: loadingProducts,
    toggleIsFeatured,
    deleteProduct,
  } = useProductStore();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const limit = parseInt(searchParams.get("limit")) || 5;
  const page = parseInt(searchParams.get("page")) || 1;

  const [filterState, setFilterState] = useState({
    sortBy: "recent",
    category: "allCategory",
    featured: "allFeatured",
  });

  const handleFilterChange = (newFilter) => {
    setFilterState(newFilter);
    setSearchParams({
      page: 1,
      limit,
      ...newFilter,
    });
  };

  useEffect(() => {
    if (user) {
      useProductStore.getState().getProducts(page, limit, filterState);
    }
  }, [user, page, limit, filterState]);

  const handleDeleteClick = (productId) => {
    setDeleteModal({ isOpen: true, productId });
  };

  const handleCloseModal = () => {
    setDeleteModal({ isOpen: false, productId: null });
  };

  const handleDeleteConfirm = async (productId) => {
    await deleteProduct(productId);
    handleCloseModal();
  };

  const handleEditProduct = (product) => {
    navigate("/products/create", { state: { product } });
  };

  const handleToggleFeatured = async (productId) => {
    await toggleIsFeatured(productId);
  };

  const handlePageNext = () => {
    const { page, totalPages } = useProductStore.getState().pagination;

    if (page < totalPages) {
      setSearchParams({ page: page + 1, limit });
    }
  };

  const handlePagePrev = () => {
    const { page } = useProductStore.getState().pagination;

    if (page > 1) {
      setSearchParams({ page: page - 1, limit });
    }
  };

  const handlePageChange = (clickedPage) => {
    const { totalPages } = useProductStore.getState().pagination;

    if (clickedPage > 0 && clickedPage <= totalPages) {
      setSearchParams({ page: clickedPage, limit });
    }
  };

  if (loadingProducts) {
    return (
      <div className="mt-20">
        <MiniSpinner />
      </div>
    );
  }

  if (products.length === 0 && !loadingProducts) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first product{" "}
          <Link className="underline text-primary-600" to="/products/create">
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Filter filterState={filterState} onFilterChange={handleFilterChange} />
      <div className="overflow-x-auto mx-auto  mt-10 border-2 border-gray-200 rounded-lg max-w-7xl mb-10">
        <Table hoverable>
          <TableHead>
            <TableRow>
              {tableHeads.map((title) => (
                <TableHeadCell
                  className={`bg-primary-700 text-white text-lg `}
                  key={title}
                >
                  {title}
                </TableHeadCell>
              ))}
              <TableHeadCell className="bg-primary-700 text-white text-lg">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {products?.map((product) => (
              <TableRow
                className="bg-white border-primary-800 hover:bg-primary-300"
                key={product._id}
              >
                <TableCell className="whitespace-nowrap text-lg font-semibold text-gray-900 dark:text-white">
                  {formatProductName(product?.name) || "No name"}
                </TableCell>
                <TableCell className="text-lg">${product?.price}</TableCell>
                <TableCell className="text-lg">
                  {product?.category?.toUpperCase()}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center text-primary-600 bg-transparent focus:ring-4 focus:ring-primary-300 shadow-xs rounded-base w-12 h-12 focus:outline-none rounded-full p-2 cursor-pointer"
                    onClick={() => handleToggleFeatured(product?._id)}
                  >
                    <svg
                      className={`w-15 h-15 ${product.isFeatured ? "fill-primary-600" : ""}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    <span className="sr-only">Icon description</span>
                  </button>
                </TableCell>
                <TableCell className="flex flex-row gap-10 items-center justify-center">
                  <CustomPopover
                    trigger="hover"
                    placement="right"
                    content={
                      <div>
                        <div className="flex items-center justify-center mb-2 gap-5">
                          <img
                            className="w-40 h-40 rounded object-contain mb-7"
                            src={product?.image}
                            alt={product?.name}
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatProductName(product?.name)}
                        </p>
                        <p className="mb-3 text-sm font-normal text-gray-500">
                          {product?.category?.toUpperCase()}
                        </p>
                        <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                          {product?.description}
                        </p>
                        <ul className="flex text-sm text-gray-500 gap-4 mb-6">
                          <li>
                            <span className="font-medium text-gray-900">
                              ${product?.price}
                            </span>
                          </li>
                          <li>
                            <span className="font-medium text-gray-900">
                              {product?.isFeatured
                                ? "⭐ Featured"
                                : "Not Featured"}
                            </span>
                          </li>
                        </ul>
                        <ul>
                          <li className="flex flex-row items-center justify-start gap-2">
                            <span>Created by: </span>
                            <img
                              src={product?.createdBy?.image}
                              alt={product?.createdBy?.name}
                              className="w-7 h-7 rounded-full"
                            />
                            <span>{product?.createdBy?.name}</span>
                          </li>
                          <li className="flex flex-row items-center justify-start gap-2">
                            <span>Last modified by: </span>
                            <img
                              src={product?.lastModifiedBy?.image}
                              alt={product?.lastModifiedBy?.name}
                              className="w-7 h-7 rounded-full"
                            />
                            <span>{product?.lastModifiedBy?.name}</span>
                          </li>
                        </ul>
                      </div>
                    }
                  >
                    <button className="text-primary-600 hover:underline dark:text-primary-500 text-semibold text-lg cursor-pointer uppercase flex flex-row gap-1 items-center justify-center mt-3">
                      Details
                    </button>
                  </CustomPopover>
                  <button
                    className="text-primary-600 hover:underline dark:text-primary-500 text-semibold text-lg cursor-pointer uppercase flex flex-row gap-1 items-center justify-center mt-3"
                    onClick={() => handleEditProduct(product)}
                  >
                    <span>Edit</span> <Pencil size={15} className="-mt-1" />
                  </button>
                  <button
                    className="text-red-600 hover:underline dark:text-red-500 text-semibold text-lg cursor-pointer uppercase flex flex-row gap-1 items-center justify-center mt-3"
                    onClick={() => handleDeleteClick(product?._id)}
                  >
                    <span>Delete</span> <Trash size={15} className="-mt-1" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DeleteModal
          isOpen={deleteModal.isOpen}
          productId={deleteModal.productId}
          onDelete={handleDeleteConfirm}
          onClose={handleCloseModal}
        />
      </div>

      <Pagination
        onPageNext={handlePageNext}
        onPagePrev={handlePagePrev}
        onPageChange={handlePageChange}
        currentPage={page}
        totalPages={pagination.totalPages}
        loading={loadingProducts}
      />
    </motion.div>
  );
}
export default ProductsPage;
