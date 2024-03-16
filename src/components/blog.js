import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "./loading";
import axios from "axios";
const Blogs = () => {
  const [blogRes, setBlogRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs`);
        console.log(res);
        setBlogRes(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error!</p>;

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
          {blogRes.data.data.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
                <img
                  className="h-56 w-full object-cover"
                  src={`https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg?w=1060&t=st=1710578482~exp=1710579082~hmac=96da3e2ff43cf0872c21a635d91cbf095ef7f24ea7048e3d28f1df931dda84db`}
                  alt={blog.blogTitle}
                />
                <div className="p-8">
                  <h3 className="font-bold text-2xl my-1">{blog.blogTitle}</h3>
                  <p className="text-gray-600 text-xl">{blog.blogDesc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
