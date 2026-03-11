import { Link } from 'react-router-dom';
import { BookOpen, Home, SquarePen as PenSquare, LogIn } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">BlogHub</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/create"
              className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <PenSquare className="h-5 w-5" />
              <span className="hidden sm:inline">Create</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;