import "./Photo.css";

import { uploads } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { store } from "../../store";
import { getPhoto, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state : any) => state.auth);
  const { photo, loading, error, message } = useSelector((state: any) => state.photo);

  useEffect(() => {
    store.dispatch(getPhoto(id || "undefined"));
  }, [dispatch, id]);

  const handleLike = () => {
    store.dispatch(like(photo._id));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
