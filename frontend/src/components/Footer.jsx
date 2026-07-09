function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-6 mt-auto max-h-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <p>
            <span className="font-semibold text-gray-700">Svea</span> —{" "}
            {currentYear}
          </p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
