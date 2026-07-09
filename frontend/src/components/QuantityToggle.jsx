function QuantityToggle({
  handleDecrementQuantity,
  quantity,
  handleIncrementQuantity,
  sizeBtn,
  sizeText,
  label,
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label
        htmlFor="counter-input"
        className={`block mt-.5 text-${sizeText} font-medium text-heading`}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm focus:outline-none h-${sizeBtn} w-${sizeBtn} cursor-pointer`}
          onClick={handleDecrementQuantity}
        >
          <svg
            className="w-3 h-3 text-heading"
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
              d="M5 12h14"
            />
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          className={`shrink-0 text-heading border-0 bg-transparent text-${sizeText} font-normal focus:outline-none focus:ring-0 max-w-6 text-center text-black`}
          placeholder=""
          value={quantity}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm focus:outline-none h-${sizeBtn} w-${sizeBtn} cursor-pointer`}
          onClick={handleIncrementQuantity}
        >
          <svg
            className="w-3 h-3 text-heading"
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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default QuantityToggle;
