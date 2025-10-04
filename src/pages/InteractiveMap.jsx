import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const InteractiveMap = () => {
  const { id } = useParams();
  const [monastery, setMonastery] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    const fetchMonastery = async () => {
      const startTime = Date.now(); // to ensure minimum loading duration
      try {
        const res = await fetch(
          `https://smartindiahackathonbackend.onrender.com/api/v1/monasteries/${id}`
        );
        const data = await res.json();
        setMonastery(data.data || null);
      } catch (err) {
        console.error("Error fetching monastery:", err);
      } finally {
        // ⏳ Ensure loading lasts at least 2.5 seconds for smoother animation
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 2500 - elapsed);
        setTimeout(() => setLoading(false), delay);
      }
    };

    fetchMonastery();
  }, [id]);

  // 🔥 Animated Loading Screen
  if (loading) {
    const loaderVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: [0.4, 1, 0.4],
        y: [0, -10, 0],
        transition: {
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"
        >
          Loading Monastery Experience...
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              variants={loaderVariants}
              initial="initial"
              animate="animate"
              className="bg-gray-800 rounded-lg border border-gray-700/60 overflow-hidden"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="h-40 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-[shimmer_1.8s_infinite]" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse" />
                <div className="h-9 bg-gray-700 rounded mt-4 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  // If not found
  if (!monastery)
    return (
      <p className="text-center text-gray-700 mt-20">
        Monastery not found!
      </p>
    );

  // 🌄 Main Monastery View
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          ← Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 360° Panoramic View */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden h-full"
          >
            {monastery.panoramicImage ? (
              <iframe
                src={monastery.panoramicImage}
                width="100%"
                height="500"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                title={monastery.name}
              ></iframe>
            ) : (
              <p className="text-center p-20 text-gray-500">
                Panoramic view not available
              </p>
            )}
          </motion.div>

          {/* 🏯 Monastery Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/3 bg-white rounded-xl shadow-md overflow-hidden h-full p-6"
          >
            <img
              src={monastery.image?.[0] || "./images/buddha.jpeg"}
              alt={monastery.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{monastery.name}</h2>
            <p className="text-gray-700 mb-2">{monastery.description}</p>
            <p className="text-gray-600 mb-2">
              📍 {monastery.location} | 🏛 Established: {monastery.founded}
            </p>

            {monastery.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {monastery.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveMap;
