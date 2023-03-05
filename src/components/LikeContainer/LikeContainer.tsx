import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

interface LikeContainerProps {
    photo: any,
    user: any,
    handleLike: any,
}

const LikeContainer = ({ photo, user, handleLike } : LikeContainerProps) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;