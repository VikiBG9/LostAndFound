import React, { useEffect, useState } from "react";
import axios from "axios";

interface FoundItem {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  username: string;
}

export const ReportFound: React.FC = () => {
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/session", {
          baseURL: "http://127.0.0.1:5000", 
          withCredentials: true, 
        });
        setCurrentUser(res.data["username"]);
      } catch (error) {
        console.error("Error fetching user session", error);
        setCurrentUser(null);
      }
    };


    const fetchFoundItems = async () => {
      try {
        const res = await axios.get("/api/report-found", {
          baseURL: "http://127.0.0.1:5000",
          withCredentials: true, 
        });
        setFoundItems(res.data);
      } catch (error) {
        console.error("Error fetching found items", error);
      }
    };

    fetchCurrentUser();
    fetchFoundItems();
  }, []);

  const handleDelete = async (itemId: string) => {
    if (!currentUser) return;

    try {
      await axios.delete(`/api/delete/${itemId}`, {
        baseURL: "http://127.0.0.1:5000", 
        withCredentials: true, 
      });

      setFoundItems(foundItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting found item", error);
    }
};

return (
  <div className="p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Found Items</h2>
    {foundItems.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foundItems.map((item) => (
          <div
            key={item._id}
            className="p-4 border border-gray-300 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            {(currentUser === item.username || currentUser === "admin") && (
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded hover:bg-red-600 transition-colors"
              >
                Take item
              </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400">No found items reported yet.</p>
    )}
  </div>
);
};

export default ReportFound;
