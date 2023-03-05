import "./Search.css";

// hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos, like, resetMessage } from "../../slices/photoSlice";
import { store } from "../../store";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();


  const { user } = useSelector((state: any) => state.auth);
  const { photos, loading } = useSelector((state: any) => state.photo);

  useEffect(() => {
    store.dispatch(searchPhotos(search || "undefined"));
  }, [dispatch, search]);

  const handleLike = (photo: any = null) => {
    store.dispatch(like(photo._id));

    resetComponentMessage();
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      store.dispatch(resetMessage());
    }, 2000);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo: any) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Search;