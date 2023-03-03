import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { getUserPhotos, publishPhoto, resetMessage } from "../../slices/photoSlice";
import { getUserDetails } from "../../slices/userSlice";
import { store } from "../../store";
import { uploads } from "../../utils/config";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: any) => state.user);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: any) => state.photo);

  console.log(photos)

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File>();

  const newPhotoForm = React.useRef<HTMLDivElement>(null);
  const editPhotoForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.dispatch(getUserPhotos(id || "undefined"));
    store.dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gather user data from states
    let photoData: any = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    let userFormData: any;

    userFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", userFormData);

    store.dispatch(publishPhoto(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    const image = e.target.files[0];

    setImage(image);
  };

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
            <form onSubmit={submitHandle}>
              <label>
                <span>Picture title</span>
                <input
                  type="text"
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Image:</span>
                <input type="file" onChange={handleFile} />
              </label>

              <input type="submit" value="Post" disabled={loading} />
              {messagePhoto && <Message message={messagePhoto} type={errorPhoto ? "error" : "success"} />} 
            </form>
          </div>
        </>
      )}
            <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            
            photos.map((photo : any) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === user._id ? (
                  <div className="actions">
                  <Link to={`/photos/${photo._id}`}>
                    <BsEyeFill />
                  </Link>
                  <BsPencilFill/>
                  <BsXLg  />
                </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
