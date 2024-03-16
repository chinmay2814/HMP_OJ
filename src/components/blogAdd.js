import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import axios from "axios";

const AddBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [authorDesc, setAuthorDesc] = useState("");
  let authorName = "";
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);

    authorName = userData.user.userName;
  }
  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setBlogDesc(event.target.value);
  };

  const handleContentChange = (content) => {
    setBlogContent(content);
  };

  const handleAuthorDescChange = (event) => {
    setAuthorDesc(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send form data to backend
    const formData = {
      blogTitle,
      blogDesc,
      blogContent,
      authorName,
      authorDesc,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createBlog",
        formData
      );

      console.log(response); // Response from the server
      // Redirect to /blogs
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="blogTitle" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="blogTitle"
            value={blogTitle}
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blogDesc" className="block text-gray-700">
            Description:
          </label>
          <input
            type="text"
            id="blogDesc"
            value={blogDesc}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blogContent" className="block text-gray-700">
            Content:
          </label>
          <ReactQuill
            value={blogContent}
            onChange={handleContentChange}
            className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorDesc" className="block text-gray-700">
            Author Description:
          </label>
          <input
            type="text"
            id="authorDesc"
            value={authorDesc}
            onChange={handleAuthorDescChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
