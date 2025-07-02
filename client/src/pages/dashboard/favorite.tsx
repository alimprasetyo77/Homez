import { FavoriteCard } from "@/components/cards/property-card";
import { useMyFavorites } from "@/hooks/use-favorite";

const Favorite = () => {
  const { favorites } = useMyFavorites();

  if (favorites?.length === 0) return <div>Favorite not found</div>;

  return (
    <div className="container bg-white rounded-sm p-8 min-h-screen space-y-6">
      <h2 className="text-2xl font-medium">My Favorites </h2>
      <div className="grid grid-cols-4 gap-8">
        {favorites?.map((favorite) => (
          <FavoriteCard key={favorite.id} property={favorite.property} favoriteId={favorite.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
