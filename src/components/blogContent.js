import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import LoadingComponent from "./loading";
import axios from "axios";
const BlogContent = () => {
  const id = useParams();
  console.log(id);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${id.blogid}`
        );
        setBlog(res);

        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error!</p>;

  return (
    <div className="font-mono w-full pb-10 bg-[#f9f9f9]">
      <div className="font-mono max-w-[1240px] mx-auto">
        <div
          className="font-mono grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
            md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black"
        >
          <div className="font-mono col-span-2 ">
            <img
              className="font-mono h-56 w-full object-cover"
              src={`https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg?w=1060&t=st=1710578482~exp=1710579082~hmac=96da3e2ff43cf0872c21a635d91cbf095ef7f24ea7048e3d28f1df931dda84db`}
              alt={blog.data.data.blogTitle}
            />
            <h1 className="font-mono font-bold text-2xl my-1 pt-5">
              {blog.data.data.blogTitle}
            </h1>
            <div
              className="font-mono pt-5"
              dangerouslySetInnerHTML={{ __html: blog.data.data.blogContent }}
            />
          </div>

          <div className="font-mono items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[250px]">
            <div>
              <img
                className="font-mono h-48 w-full object-cover"
                src={`https://robohash.org/${blog.data.data.authorName}?size =300x300`} // Use proper null checks
                alt={blog?.blogTitle} // Use proper null checks
              />
              <h1 className="font-mono font-bold text-2xl text-center text-gray-900 pt-3">
                {blog.data.data.authorName}
              </h1>
              <p className="font-mono text-center text-gray-900 font-medium">
                {blog.data.data.authorDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
