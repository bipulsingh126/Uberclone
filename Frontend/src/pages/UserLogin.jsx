import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      email: email,
      password: password,
    })
    setEmail('')
    setPassword('')
  }
  const handleGoogleLogin = () => {
    // Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google OAuth client ID
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
      client_id=YOUR_GOOGLE_CLIENT_ID&
      redirect_uri=${encodeURIComponent(
        window.location.origin + '/auth/google/callback',
      )}&
      scope=email profile&
      response_type=code`

    window.location.href = googleAuthUrl
  }

  const handleTwitterLogin = () => {
    // Replace 'YOUR_TWITTER_CLIENT_ID' with your actual Twitter OAuth client ID
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?
      client_id=YOUR_TWITTER_CLIENT_ID&
      redirect_uri=${encodeURIComponent(
        window.location.origin + '/auth/twitter/callback',
      )}&
      scope=tweet.read users.read&
      response_type=code&
      state=state`

    window.location.href = twitterAuthUrl
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path
              d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"
              fill="black"
            />
            <circle cx="7.5" cy="14.5" r="1.5" />
            <circle cx="16.5" cy="14.5" r="1.5" />
          </svg>
          <h2 className="mt-2 text-3xl font-bold">UBER</h2>
          <p className="mt-2 text-gray-600">Welcome back!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => submitHandler(e)}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="name@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-4 text-center text-gray-500">or</div>

          <div className="mt-4 space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleTwitterLogin}
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
            >
              <FaTwitter className="text-xl text-blue-400" />
              <span>Continue with Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
