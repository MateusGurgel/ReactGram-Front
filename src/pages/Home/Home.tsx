import "./Home.css";


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhotos, like, resetMessage } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import { Link } from "react-router-dom";
import { store } from "../../store";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { photos, loading } = useSelector((state: any) => state.photo);

  // Load all photos
  useEffect(() => {
    store.dispatch(getPhotos());
  }, [dispatch]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      store.dispatch(resetMessage());
    }, 2000);
  }

  const handleLike = (photo: any = null) => {
    store.dispatch(like(photo._id));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
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
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  );
};

export default Home;