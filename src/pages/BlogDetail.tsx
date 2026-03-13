import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import type { Blog } from "../types/blogs";

function BlogDetail() {
  const { objectId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/data/Blogcucu/${objectId}`);
        setBlog(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [objectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="text-center text-gray-500 mt-12">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="text-center text-gray-500 mt-12">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-yellow-500 hover:text-purple-600 font-semibold transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </Link>

        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.writedate).toLocaleDateString()}</span>
          </div>
        </div>

        {blog.quote && (
          <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-600 mb-8">
            {blog.quote}
          </blockquote>
        )}

        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {blog.bodytext}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
