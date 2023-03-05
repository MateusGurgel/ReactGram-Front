import "./Photo.css";

import { uploads } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { store } from "../../store";
import { comment, getPhoto, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state: any) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  
  useEffect(() => {
    store.dispatch(getPhoto(id || "undefined"));
  }, [dispatch, id]);
  
  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    store.dispatch(comment(commentData));
    setCommentText("")
  };
  
  const handleLike = () => {
    store.dispatch(like(photo._id));
  };
  
  if (loading || !photo._id) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="comments">
        <h3>Comments: {photo.comments.length}</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="enter your comment"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText || ""}
          />
          <input type="submit" value="Send" />
        </form>
        {photo.comments.length === 0 && <p>There are no comments on this post...</p>}
        {photo.comments.map((comment: any, index: number) => (
          <div className="comment" key={index}>
            <div className="author">
              {comment.userImage && (
                <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName}/>
              )}
              <Link to={`/users/${comment.userId}`}>
                <p>{comment.userName}</p>
              </Link>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Photo;
