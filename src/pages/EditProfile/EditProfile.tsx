import "./EditProfile.css"

import { uploads } from "../../utils/config";

import { FormEvent, useState, useEffect, ChangeEvent } from "react";

import { useSelector, useDispatch } from "react-redux";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { store } from "../../store";
import Message from "../../components/Message/Message";

const EditProfile = () => {

  const dispatch = useDispatch()

  const {user, message, error, loading} = useSelector((state: any) => state.user)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [previewImage, setPreviewImage] = useState<File>()
  const [imageProfile, setImageProfile] = useState<File>()

  useEffect(() => {
    store.dispatch(profile())
  }, [dispatch])

  useEffect(() => {
    
    if (user){
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

        // Gather user data from states
    let userData : any = {
      name,
    };

    if (imageProfile) {
      userData.profileImage = imageProfile;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    let userFormData : any

    userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await store.dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files === null){
      return
    }

    const image = e.target.files[0]

    setPreviewImage(image)
    setImageProfile(image)
  }

  return (
    <div id="edit-profile">
      <h2>Edit you data</h2>
      <p className='subTitle'>Add a profile picture and tell me more about you :) </p>

      {(user.profileImage || previewImage) && (
        <img 
        className="profile-image"
        src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`}
        alt={user.name}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}} value={name || ""}/>
        <input type="email" placeholder="E-mail" disabled onChange={(e) => {setEmail(e.target.value)}} value={email || ""}/>
        <label>
          <span>Profile picture:</span>
          <input type="file" onChange={handleFile}/>
        </label>
        <label>
          <span>Bio:</span>
          <input type="text" placeholder="Profile description" onChange={(e) => {setBio(e.target.value)}} value={bio || ""}/>
        </label>
        <label>
          <span>Do you want to change your password?</span>
          <input type="password" placeholder="Enter your new password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
        </label>
        <input type="submit" value="Update" disabled={loading}/>
        {message && <Message message={message} type={error ? "error" : "success"} />} 
      </form>
    </div>
  )
}

export default EditProfile