import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { monasteryData } from "./../apiCalls/monastery";
import { motion } from "framer-motion";

const VirtualTour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await monasteryData();
        setTours(data.data || []);
      } catch (err) {
        console.error("Error fetching monasteries:", err);
      } finally {
        setTimeout(() => setLoading(false), 1200); // smooth transition
      }
    };
    fetchTours();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(search.toLowerCase())
  );

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
          className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-400"
        >
          Loading Virtual Tours...
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {[...Array(8)].map((_, i) => (
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero section */}
      <section className="relative h-[660px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="\videos\vecteezy_kathmandu-nepal-october-15-2019-svajambhunath-stupa-and_33892043 (1) (1).mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center h-full flex flex-col justify-center items-center px-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white/70 via-green-200/60 to-sky-200/70 bg-clip-text text-transparent drop-shadow-md"
          >
            Virtual Tour
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed"
          >
            Explore sacred monasteries of Sikkim through immersive virtual tours
            and panoramic views.
          </motion.p>
        </div>
      </section>

      {/* Virtual tours cards */}
      <section className="py-12 px-6">
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-center font-bold mb-6 bg-gradient-to-r from-white/70 via-green-200/60 to-sky-200/70 bg-clip-text text-transparent drop-shadow-md"
        >
          Featured Virtual Tours
        </motion.h3>

        {/* Search box */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search monasteries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour, i) => (
              <motion.div
                key={tour._id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.2}
                className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 flex flex-col group"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <motion.img
                  src={tour.image?.[0] || "./images/buddha.jpeg"}
                  alt={tour.name}
                  className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold mb-2">{tour.name}</h4>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {tour.description?.slice(0, 100)}...
                  </p>

                  {tour.panoramicImage ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/interactive-map/${tour._id}`)}
                      className="mt-auto w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
                    >
                      Explore 360° Tour
                    </motion.button>
                  ) : (
                    <p className="mt-auto text-gray-500 text-sm">
                      360° Tour Not Available
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No monasteries found matching "{search}"
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default VirtualTour;
