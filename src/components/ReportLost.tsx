import React, { useState } from "react";
import axios from "axios";

export const ReportLost: React.FC = () => {
  const [formData, setFormData] = useState({ item: "", description: "" });
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("item", formData.item);
      formDataToSend.append("description", formData.description);
      if (image) {
        formDataToSend.append("image", image);
      }
      
      const res = await axios.post("http://127.0.0.1:5000/api/report-lost", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
  type="text"
  name="item"
  placeholder="Item Name"
  value={formData.item}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded text-black bg-white"
  required
/>
<textarea
  name="description"
  placeholder="Item Description"
  value={formData.description}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded text-black bg-white"
  required
/>
<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full p-2 border border-gray-300 rounded text-black bg-white"
/>

        <button type="submit" className="w-full p-2 bg-red-700 text-white rounded">
          Submit
        </button>
      </form>
      {response && <p className="mt-4 text-green-500">{response}</p>}
    </div>
  );
};
