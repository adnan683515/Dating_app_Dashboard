import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import logo from '../../assets/Logo.png'
import { Link } from 'react-router'

export default function ForgetPassword() {



    return (
        <div className="bg-[url(/LoginImage.jpeg)] p-2 min-h-screen  bg-no-repeat bg-center flex justify-center items-center  bg-cover">


            <div className="flex items-center justify-center rounded-4xl">

                <div className="bg-[#000000CC] max-w-md backdrop-blur-sm border border-white/30 shadow-2xl shadow-black space-y-5 px-8 py-10 w-full rounded-4xl">
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="" />

                    </div>
                    <h1 className='text-xl font-bold text-center text-white'>Recover Access</h1>

                    <h2 className=' text-sm text-center font-medium tracking-wider w-[90%] mx-auto text-white'>Enter your email address and we'll send a secure reset link to your inbox.</h2>

                    <div>
                        <h1 className='text-[12px] text-white tracking-widest'>Email Address</h1>
                        <div className="flex items-center border-b border-white/20 py-2 group focus-within:border-blue-500 transition-colors">
                            <Mail size={20} className="text-gray-500 group-focus-within:text-blue-500" />
                            <input
                                className="bg-transparent w-full text-gray-200 px-3 outline-none placeholder:text-gray-600"
                                type="email"
                                placeholder="example670@gmail.com"
                            />
                        </div>


                        <button className="w-full my-8 cursor-pointer flex items-center  justify-center gap-x-2  bg-[#1F3A5F]  text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                            Send Reset Link <ArrowRight className='text-white'></ArrowRight>
                        </button>


                        <div className='flex justify-center items-center'>
                            <div className='flex items-center gap-x-2'>

                                <ArrowLeft className='text-white'></ArrowLeft>

                                <Link to={"/"}><h1 className='text-white text-sm'>Back to Secure Login</h1></Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
