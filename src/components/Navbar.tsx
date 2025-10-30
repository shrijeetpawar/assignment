export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Care247</h1>
      <ul className="flex space-x-6">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
      </ul>
    </nav>
  )
}
