import "./PhotoItem.css";

import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";

interface PhotoItemProps {
  photo: any;
}

const PhotoItem = (props: PhotoItemProps) => {
  return (
    <div className="photo-item">
      {props.photo.image && (
        <img
          src={`${uploads}/photos/${props.photo.image}`}
          alt={props.photo.title}
        />
      )}
      <h2>{props.photo.title}</h2>
      <p className="photo-author">
        Publicada por:{" "}
        <Link to={`/users/${props.photo.userId}`}>{props.photo.userName}</Link>
      </p>
    </div>
  );
};

export default PhotoItem;
