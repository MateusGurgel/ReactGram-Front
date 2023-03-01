import { FormEvent, useState, useEffect } from "react";
import "./Profile.css"

const EditProfile = () => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
  }

  return (
    <div id="profile">
      <h2>Edit you data</h2>
      <p className='subTitle'>Add a profile picture and tell me more about you :) </p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name"/>
        <input type="email" placeholder="E-mail" disabled/>
        <label>
          <span>Profile picture:</span>
          <input type="file"/>
        </label>
        <label>
          <span>Bio:</span>
          <input type="text" placeholder="Profile description" />
        </label>
        <label>
          <span>Do you want to change your password?</span>
          <input type="password" placeholder="Enter your new password" />
        </label>
        <input type="submit" value="Update"/>
      </form>
    </div>
  )
}

export default EditProfile