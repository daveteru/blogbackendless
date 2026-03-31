import { File as FileEdit, FileText, Image, User } from "lucide-react";
import z from "zod";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.instanceof(File, { message: "Thumbnail is required" }),
});

type blogData = z.infer<typeof blogSchema>;

function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(blogSchema),
  });

  const navigate = useNavigate();
  
const {mutateAsync , isPending} = useMutation({
  mutationFn :async (payload:blogData)=>{
  const form = new FormData();
      form.append("file", payload.thumbnail);
      const folderName = "images";
      const fileName = Date.now() + Math.floor(Math.random() * 1000);
      const res = await axiosInstance.post(
        `/files/img/${folderName}/${fileName}`,
        form,
      );
      await axiosInstance.post(`/data/Blogcucu`, {
        title: payload.title,
        author: payload.author,
        description: payload.description,
        content: payload.content,
        thumbnail: res.data.fileURL,
      });
  },
    onSuccess: () => {
      toast.success("blog creation success!");
      navigate("/login");
    },
    onError: () => {
      toast.error("blog creation failed. Please try again.");
    },
})

  const onSubmit = (data: blogData) => {
    mutateAsync(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create New Blog
          </h1>
          <p className="text-gray-600 mb-8">
            Share your thoughts and ideas with the community
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your blog title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Write a brief description of your blog"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("author")}
                  type="text"
                  id="author"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
              </div>
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thumbnail Image
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("thumbnail", file, { shouldValidate: true });
                    }
                  }}
                />
              </div>
              {errors.thumbnail && (
                <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <div className="relative">
                <FileEdit className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  {...register("content")}
                  id="content"
                  rows={12}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Write your blog content here..."
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-md"
              >
                Publish Blog
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
