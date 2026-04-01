export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4">
      <p>©{year} My Website</p>
    </footer>
  );
}
