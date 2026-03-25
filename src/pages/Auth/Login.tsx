


import { Lock, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import logo from '../../assets/DatingLogo.png'
import back from '../../assets/back.jpg'
import api from '../../axios/baseUlr'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const [errors, setErrors] = useState<{ email?: string; password?: string; api?: string }>({})
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()



  const handleLogin = async () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {}

    // ✅ Validation
    if (!email) newErrors.email = "Email is required"
    if (!password) newErrors.password = "Password is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      setErrors({})

      const res = await api.post("/auth/login", {
        email,
        password
      })

      console.log("Login Success:", res.data)

      // 👉 token save

      localStorage.setItem("Token", res.data?.data?.accessToken)

      // 👉 redirect (optional)
      navigate('/dashboard')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      // Axios error handling
      if (err.response) {
        // backend error
        setErrors({
          api: err.response.data?.message || "Login failed"
        })
      } else if (err.request) {
        // server not responding
        setErrors({
          api: "Server not responding. Try again."
        })
      } else {
        setErrors({
          api: err.message
        })
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundImage: `url(${back})`,
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
      className="p-2 flex justify-center items-center">

      <div className="flex items-center justify-center rounded-4xl">

        <div className="bg-[#000000CC] backdrop-blur-sm border border-white/30 shadow-2xl shadow-black space-y-6 px-8 py-10 w-full rounded-4xl">

          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-80" />
          </div>

          <h1 className="text-white text-3xl font-medium text-center tracking-wider">
            Admin Portal
          </h1>

          {/* API Error */}
          {errors.api && (
            <p className="text-red-400 text-sm text-center">{errors.api}</p>
          )}

          <div className="space-y-3">

            {/* Email */}
            <div>
              <div className="flex items-center border-b border-white/20 py-2 group focus-within:border-blue-500">
                <User size={20} className="text-gray-500 group-focus-within:text-blue-500" />
                <input
                  className="bg-transparent w-full text-gray-200 px-3 outline-none"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center border-b border-white/20 py-2 group focus-within:border-blue-500">
                <Lock size={20} className="text-gray-500 group-focus-within:text-blue-500" />
                <input
                  className="bg-transparent w-full text-gray-200 px-3 outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full cursor-pointer bg-[#C7B268] text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex mt-4 justify-center">
            <Link to={'forgetpass'}>
              <span className="text-sm text-gray-200 hover:text-blue-400">
                Forgot Password?
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}