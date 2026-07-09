function MiniSpinner() {
  return (
    <div className="flex items-center justify-center h-full bg-transparent">
      <div className="relative">
        <div className="w-15 h-15 border-primary-200 border-3 rounded-full"></div>
        <div className="w-15 h-15 border-primary-500 border-t-3 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
}

export default MiniSpinner;
