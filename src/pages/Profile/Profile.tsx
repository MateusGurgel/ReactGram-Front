import React, { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../slices/userSlice";
import { store } from "../../store";
import { uploads } from "../../utils/config";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: any) => state.user);

  const newPhotoForm = React.useRef<HTMLDivElement>(null)
  const editPhotoForm = useRef<HTMLDivElement>(null)

  useEffect(() => {
    store.dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const submitHandle = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}

        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p>{user.id}</p>
        </div>
      </div>
      {id === user._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Share your moments:</h3>
            <form>
                <label>
                    <span>Picture title</span>
                    <input type="text" placeholder="Enter the title" />
                </label>
                <label>
                    <span>Image:</span>
                    <input type="file" />
                </label>

                <input type="submit" value="Post" />
            </form>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
