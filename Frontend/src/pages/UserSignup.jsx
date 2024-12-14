import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaTwitter } from 'react-icons/fa'

const UserSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add your signup logic here
    console.log('Form submitted:', formData)
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
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Logo Section */}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Sign up to Uber</h2>
        </div>

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

        <div className="text-center mb-6">
          <span className="text-gray-500">or do via email</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
