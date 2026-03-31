import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../lib/axios";
import type { Blog } from "../types/blogs";

export default function Home() {
  // const [blogs, setBlogs] = useState<Blog[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await axiosInstance.get("/data/Blogcucu");
  //       console.log("Blogcucu response:", res.data);
  //       setBlogs(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  const { data : blogz , isPending ,error ,refetch} = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("https://toughground-us.backendless.app/api/data/Users?sortBy=%60created%60%20desc");
      return res.data;
    },
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Latest Blogs</h1>
            <Link
              to="/create"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-md"
            >
              Create Blog
            </Link>
          </div>

          {isPending ? (
            <p className="text-center text-gray-500">Loading blogs...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">Failed to load blogs.</p>
              <button
                onClick={() => refetch()}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(blogz as Blog[]).map((blog) => (
                <div
                  key={blog.objectId}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={blog.thumbnail ?? undefined}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.bodytext}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(blog.created).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${blog.objectId}`}
                      className="inline-flex items-center space-x-2 text-yellow-500 hover:text-purple-600 font-semibold transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
