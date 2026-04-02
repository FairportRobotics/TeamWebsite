export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 py-10">
      <p>©{year} My Website</p>
    </footer>
  );
}
