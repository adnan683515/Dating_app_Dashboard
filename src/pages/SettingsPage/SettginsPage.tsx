import { Eye, EyeOff, KeyRound, Lock, Save, Upload, User } from 'lucide-react';
import AuthHook from '../../Hooks/AuthHook';
import { useEffect, useRef, useState } from 'react';
import { uploadProfile } from './setting';
import { toast } from 'sonner';
import sequreApi from '../../axios/axiosSequre';

const SettginsPage = () => {

  const { user, refetchUser } = AuthHook()
  const [preview, setPreview] = useState(user?.data?.image);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | "">("");
  const [displayName, setDisplayName] = useState<string | "">("")
  const [updateinfoLoad, setUpdateInfoLoad] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);
  const [newShowPass, setNewShowpass] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)


  const [currentPass, setCurrentPass] = useState<string >("")
  const [newPass, setNewPass] = useState<string>("")
  const [confirmPass, setConfirmPass] = useState<string>("")

  useEffect(() => {
    setPreview(user?.data?.image)
  }, [user])



  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFile(file);

    }
  };


  const updateInformation = async () => {

    setUpdateInfoLoad(true)

    try {

      if (user) {
        if (file || displayName) {
          const ans = await uploadProfile({
            file: file ?? file,
            id: user?.data?._id,
            displayName: displayName ?? ""
          });

          if (ans?.success) {
            toast.success(ans?.message)
            refetchUser();
          }

        } else {
          toast.warning("Please change at least one information before updating!");
        }
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setUpdateInfoLoad(false)
    }





  }

  const updatePassword = async () => {
  // ✅ Validation
  if (!currentPass || !newPass || !confirmPass) {
    toast.error("All fields are required ❌");
    return;
  }

    setLoading(true);

    try {
      const response = await sequreApi.patch(
        "/auth/changePassword",
        {
          currentPassword: currentPass,
          newPassword: newPass,
          confirmPassword: confirmPass,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Axios error থেকে message বের করা
      const errorMessage =
        error?.response?.data?.message || error.message || "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className=" ">
      <div className=" mx-auto space-y-6">

        {/* --- Profile Management Section --- */}
        <section className="bg-[#000000] rounded-2xl border border-pink-500/20 shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="p-6 border-b border-pink-500/20 flex items-center gap-2">
            <User size={20} className="text-pink-400" />
            <h2 className="text-lg font-semibold text-white">
              💖 Profile Management
            </h2>
          </div>

          <div className="p-8   space-y-8">

            <div className='flex gap-x-2'>
              <div className="w-24 h-24 rounded-full p-0.5 bg-linear-to-r from-[#FF1493] via-[#FF00FF] to-[#C7B268] shadow-lg">
                <div className="w-full h-full rounded-full bg-[#0B1120] flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={preview}
                    alt="avatar"
                  />
                </div>
              </div>

              <div className='flex items-center'>

                <div className=''>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Button */}
                  <button
                    onClick={handleClick}
                    className="flex items-center gap-2 
        bg-linear-to-r from-[#FF1493] to-[#FF00FF] 
        hover:opacity-90 text-white px-5 py-2.5 
        rounded-lg text-sm font-semibold shadow-lg transition-all"
                  >
                    <Upload size={16} />
                    Change Avatar
                  </button>



                </div>

              </div>


            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="text-xs font-medium text-pink-300 tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
                  defaultValue={user?.data?.displayName}
                  className="w-full bg-[#0a0f1c] border border-pink-500/30 rounded-lg px-4 py-3 
          text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 
          focus:border-pink-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-pink-300 tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.data?.email}
                  disabled
                  className="w-full cursor-not-allowed bg-[#0a0f1c] border border-slate-700 
          rounded-lg px-4 py-3 text-gray-400"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-pink-300 tracking-wider">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue={user?.data?.role}
                  disabled
                  className="w-full bg-[#0a0f1c] border border-slate-700 rounded-lg px-4 py-3 
          text-gray-500 italic cursor-not-allowed"
                />
              </div>
            </div>


            {/* SAVE BUTTON */}
            <button
              onClick={updateInformation}
              className="flex items-center gap-2 
  bg-linear-to-r from-[#FF1493] via-[#FF00FF] to-[#C7B268] 
  hover:scale-105 text-white px-6 py-3 rounded-xl 
  text-sm font-bold shadow-xl transition-all duration-300"
            >
              {updateinfoLoad ? (
                <div className="flex items-center gap-2">
                  {/* Spinner */}
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  loading...
                </div>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes 💖
                </>
              )}
            </button>
          </div>
        </section>



        {/* --- Change Password Section --- */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    updatePassword();
  }}
>
  {/* --- Change Password Section --- */}
  <section className=" bg-[#000000] rounded-2xl border border-pink-500/20 shadow-2xl overflow-hidden">
    <div className="p-6 border-b border-[#FF1493]/40 flex items-center gap-2">
      <Lock size={20} className="text-[#FF00FF]" />
      <h2 className="text-lg font-semibold text-white">
        Change Password
      </h2>
    </div>

    <div className="p-8 space-y-6">

      {/* Current Password */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-pink-300 tracking-wider">
          Current Password
        </label>

        <div className="relative">
          <input
            value={currentPass ?? ""}
            onChange={(e) => setCurrentPass(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            autoComplete='current-password'
            className="w-full bg-[#0a0f1c] border border-pink-500/30 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-400 transition-all"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-300 hover:text-pink-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New + Confirm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-pink-300 tracking-wider">
            New Password
          </label>

          <div className="relative">
            <input
              value={newPass ?? ""}
              onChange={(e) => setNewPass(e.target.value)}
              type={newShowPass ? "text" : "password"}
              placeholder="••••••••"
              required
                autoComplete="new-password"

              className="w-full bg-[#0a0f1c] border border-[#FF1493]/40 rounded-lg px-4 py-3 pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF00FF]/50 transition-all"
            />

            <button
              type="button"
              onClick={() => setNewShowpass((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-300 hover:text-pink-400"
            >
              {newShowPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-pink-300 tracking-wider">
            Confirm New Password
          </label>

          <input
            value={confirmPass ?? ""}
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
              autoComplete="confirm-password"

            className="w-full bg-[#0a0f1c] border border-[#FF1493]/40 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF00FF]/50 transition-all"
          />
        </div>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex items-center gap-2 
        bg-linear-to-r from-[#FF1493] via-[#FF00FF] to-[#C7B268] 
        hover:scale-105 text-white px-6 py-3 rounded-xl 
        text-sm font-bold shadow-xl transition-all duration-300"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            loading...
          </div>
        ) : (
          <>
            <KeyRound size={18} />
            Update Password 💖
          </>
        )}
      </button>

    </div>
  </section>
</form>
      </div>
    </div>
  );
};

export default SettginsPage;