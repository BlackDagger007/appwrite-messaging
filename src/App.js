import { useState } from 'react'
import googlePlayStoreLogo from './images/google-play-logo.png'
import appleStoreLogo from './images/apple-app-store-logo.png'

const App = () => {
  const [user, setUser] = useState(null)


  const RegisterUser = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch('http://localhost:8000/register', options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const UpdateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  console.log(user)

  return (
    <div className="auth-modal">
      <div className="close-modal">🚫</div>
      <h2>Sign Up</h2>
      <p>By signing up you agree to our terms and conditions for using the app.</p>
      <form onSubmit={RegisterUser}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={UpdateUser}
          value={user?.email}
        />
        <input
          type="tel"
          id="tel"
          name="tel"
          placeholder="Phone Number"
          onChange={UpdateUser}
          value={user?.tel}
        />
        <label>
          <input type="checkbox" required />
          I agree to the terms and conditions
        </label>
        <input type="submit" className="form-button" />

      </form>

      <hr />

      <h2>Download the app</h2>

      <div className="link-container">
        <a href="https://play.google.com/store">
          <img src={googlePlayStoreLogo} alt="google play store icon" />
        </a>
        <a href="https://apps.apple.com/">
          <img src={appleStoreLogo} alt="apple store icon" />
        </a>
      </div>

    </div>
  );
}

export default App
