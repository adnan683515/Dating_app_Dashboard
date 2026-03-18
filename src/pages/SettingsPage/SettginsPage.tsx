import { KeyRound, Lock, Save, Upload, User } from 'lucide-react';
// import AuthHook from '../../Hooks/AuthHook';

const SettginsPage = () => {


// const {user} = AuthHook()

// console.log(user, "user")




  return (
    <div className=" bg-[#0a0f1c] text-slate-300 ">
      <div className=" mx-auto space-y-6">
        
        {/* --- Profile Management Section --- */}
        <section className="bg-[#111827] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center gap-2">
            <User size={20} className="text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Profile Management</h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Avatar Row */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-[#1e293b] rounded-full flex items-center justify-center border-2 border-slate-700 shadow-inner">
                {/* <User size={40} className="text-slate-500" /> */}
                <img className='w-full h-full rounded-full' src={""} alt="" />
              </div>
              <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                <Upload size={16} />
                Change Avatar
              </button>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400   tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={"nai"}
                  className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400   tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  // value={user?.email}
                  disabled
                  className="w-full cursor-not-allowed bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-slate-400   tracking-wider">Role</label>
                <input 
                  type="text" 
                  // defaultValue={user?.role}
                  disabled
                  className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed italic"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 bg-[#1F3A5F] cursor-pointer text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </section>

        {/* --- Change Password Section --- */}
        <section className="bg-[#111827] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center gap-2">
            <Lock size={20} className="text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400   tracking-wider">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full md:w-1/2 bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400   tracking-wider">New Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400   tracking-wider">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 bg-[#1F3A5F] hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold border border-slate-700 transition-all active:scale-95">
              <KeyRound size={18} />
              Update Password
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettginsPage;