import "./Photo.css";

import { uploads } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { store } from "../../store";
import { getPhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { photo, loading, error, message } = useSelector((state: any) => state.photo);

  useEffect(() => {
    store.dispatch(getPhoto(id || "undefined"));
  }, [dispatch, id]);


  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log(photo)

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
