import { RefreshCwIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function Filter({ filterState, onFilterChange }) {
  const [isSpinning, setIsSpinning] = useState(false);

  const filter = filterState || {
    sortBy: "recent",
    category: "allCategory",
    featured: "allFeatured",
  };

  const handleSortChange = (value) => {
    onFilterChange({
      ...filter,
      sortBy: value,
    });
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filter,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);
    const resetState = {
      sortBy: "recent",
      category: "allCategory",
      featured: "allFeatured",
    };
    onFilterChange(resetState);
  };

  return (
    <motion.div
      className="hidden 3xl:block absolute top-25 left-10 p-4"
      initial={{ x: -40 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-row items-center justify-between mb-8">
        <span className="font-semibold text-xl text-gray-500">Filters: </span>
        <span className="text-sm font-normal text-gray-600">
          <button
            className="cursor-pointer flex flex-row gap-1 items-center"
            onClick={resetFilters}
          >
            <span>Reset</span>{" "}
            <RefreshCwIcon
              size="15"
              className={`cursor-pointer transition-transform duration-500 ${
                isSpinning ? "rotate-180" : ""
              }`}
            />
          </button>
        </span>
      </div>

      {/* ✅ Sort By - Mutually Exclusive Radio Group */}
      <div className="mb-3">
        <h3>Sort By:</h3>

        {/* Created */}
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="recent"
            name="sortBy"
            value="recent"
            onChange={() => handleSortChange("recent")}
            checked={filter.sortBy === "recent"}
          />
          <label htmlFor="recent" className="tracking-widest">
            Recent
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="oldest"
            name="sortBy"
            value="oldest"
            onChange={() => handleSortChange("oldest")}
            checked={filter.sortBy === "oldest"}
          />
          <label htmlFor="oldest" className="tracking-widest">
            Oldest
          </label>
        </div>

        {/* Name */}
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="a-z"
            name="sortBy"
            value="a-z"
            onChange={() => handleSortChange("a-z")}
            checked={filter.sortBy === "a-z"}
          />
          <label htmlFor="a-z" className="tracking-widest">
            A - Z
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="z-a"
            name="sortBy"
            value="z-a"
            onChange={() => handleSortChange("z-a")}
            checked={filter.sortBy === "z-a"}
          />
          <label htmlFor="z-a" className="tracking-widest">
            Z - A
          </label>
        </div>

        {/* Price */}
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="high-low"
            name="sortBy"
            value="high-low"
            onChange={() => handleSortChange("high-low")}
            checked={filter.sortBy === "high-low"}
          />
          <label htmlFor="high-low" className="tracking-widest">
            Highest - Lowest
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="low-high"
            name="sortBy"
            value="low-high"
            onChange={() => handleSortChange("low-high")}
            checked={filter.sortBy === "low-high"}
          />
          <label htmlFor="low-high" className="tracking-widest">
            Lowest - Highest
          </label>
        </div>
      </div>

      {/* ✅ Category Filter - Independent */}
      <div className="mb-3">
        <h3>Category: </h3>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="allCategory"
            name="category"
            value="allCategory"
            onChange={() => handleFilterChange("category", "allCategory")}
            checked={filter.category === "allCategory"}
          />
          <label htmlFor="allCategory" className="tracking-widest">
            All
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="jeans"
            name="category"
            value="jeans"
            onChange={() => handleFilterChange("category", "jeans")}
            checked={filter.category === "jeans"}
          />
          <label htmlFor="jeans" className="tracking-widest">
            Jeans
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="t-shirts"
            name="category"
            value="t-shirts"
            onChange={() => handleFilterChange("category", "t-shirts")}
            checked={filter.category === "t-shirts"}
          />
          <label htmlFor="t-shirts" className="tracking-widest">
            T-Shirts
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="shoes"
            name="category"
            value="shoes"
            onChange={() => handleFilterChange("category", "shoes")}
            checked={filter.category === "shoes"}
          />
          <label htmlFor="shoes" className="tracking-widest">
            Shoes
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="glasses"
            name="category"
            value="glasses"
            onChange={() => handleFilterChange("category", "glasses")}
            checked={filter.category === "glasses"}
          />
          <label htmlFor="glasses" className="tracking-widest">
            Glasses
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="jackets"
            name="category"
            value="jackets"
            onChange={() => handleFilterChange("category", "jackets")}
            checked={filter.category === "jackets"}
          />
          <label htmlFor="jackets" className="tracking-widest">
            Jackets
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="suits"
            name="category"
            value="suits"
            onChange={() => handleFilterChange("category", "suits")}
            checked={filter.category === "suits"}
          />
          <label htmlFor="suits" className="tracking-widest">
            Suits
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="bags"
            name="category"
            value="bags"
            onChange={() => handleFilterChange("category", "bags")}
            checked={filter.category === "bags"}
          />
          <label htmlFor="bags" className="tracking-widest">
            Bags
          </label>
        </div>
      </div>

      {/* ✅ Featured Filter - Independent */}
      <div className="mb-3">
        <h3>Featured: </h3>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="allFeatured"
            name="isFeatured"
            value="allFeatured"
            onChange={() => handleFilterChange("featured", "allFeatured")}
            checked={filter.featured === "allFeatured"}
          />
          <label htmlFor="allFeatured" className="tracking-widest">
            All
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="featured"
            name="isFeatured"
            value="featured"
            onChange={() => handleFilterChange("featured", "featured")}
            checked={filter.featured === "featured"}
          />
          <label htmlFor="featured" className="tracking-widest">
            Featured
          </label>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <input
            type="radio"
            id="notFeatured"
            name="isFeatured"
            value="notFeatured"
            onChange={() => handleFilterChange("featured", "notFeatured")}
            checked={filter.featured === "notFeatured"}
          />
          <label htmlFor="notFeatured" className="tracking-widest">
            Not Featured
          </label>
        </div>
      </div>
    </motion.div>
  );
}

export default Filter;
