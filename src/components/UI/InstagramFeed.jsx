import React, { useEffect, useState } from "react";

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  
  // 🔥 Jeton d'accès public d'exemple (Remplace-le plus tard par un vrai)
  const accessToken = "IGQVJ...JETON_EXEMPLE";
  const userId = "17841400000000000"; // ID public de test
  
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`
        );
        const data = await response.json();
        console.log("📸 Instagram Data:", data);

        if (data?.data) {
          setPosts(data.data);
        } else {
          throw new Error("Aucune donnée récupérée.");
        }
      } catch (error) {
        console.error("⚠️ Erreur lors du fetch des posts Instagram :", error);

        // 🛑 Si l'API ne fonctionne pas, fallback avec des données mockées
        setPosts([
          {
            id: "1",
            media_url: "https://via.placeholder.com/400",
            permalink: "#",
            caption: "Post de test 1",
          },
          {
            id: "2",
            media_url: "https://via.placeholder.com/400",
            permalink: "#",
            caption: "Post de test 2",
          },
          {
            id: "3",
            media_url: "https://via.placeholder.com/400",
            permalink: "#",
            caption: "Post de test 3",
          },
          {
            id: "5",
            media_url: "https://via.placeholder.com/400",
            permalink: "#",
            caption: "Post de test 3",
          },
          {
            id: "6",
            media_url: "https://via.placeholder.com/400",
            permalink: "#",
            caption: "Post de test 3",
          },
        ]);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img
              src={post.media_url}
              alt={post.caption || "Post Instagram"}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </a>
        ))
      ) : (
        // 🔥 Affiche un placeholder image au lieu du texte
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="relative w-full h-64 bg-gray-800 animate-pulse">
            <img
              src="https://via.placeholder.com/400" // ✅ Placeholder temporaire
              alt="Placeholder"
              className="w-full h-full object-cover rounded-lg opacity-50"
            />
          </div>
        ))
      )}
    </div>
  
    <div className="text-center mt-6">
      <a
        href="https://www.instagram.com/votrecompte"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-animated"
      >
        Voir plus sur Instagram
      </a>
    </div>
  </div>
  );
};

export default InstagramFeed;