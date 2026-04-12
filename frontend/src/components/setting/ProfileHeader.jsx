import { Calendar, Camera, Check, Edit3, MapPin, User, X } from "lucide-react";
import Avatar from "./Avatar";
import InputField from "./InputField";

function ProfileHeader(props) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
  };

  const {
    user,
    editMode,
    setEditMode,
    setDraft,
    draft,
    handleSaveProfile,
    handleCancelEdit,
  } = props;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div
        className="h-24 relative"
        style={{
          background: "linear-gradient(to right, #334155, #475569, #64748b)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 mb-4">
          <div className="relative w-fit">
            <Avatar src={user.avatar} name={user.name} />
            {editMode && (
              <button
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              >
                <Camera size={13} />
              </button>
            )}
            <input
              type="file"
              className="hidden"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            {!editMode ? (
              <button
                onClick={() => {
                  setDraft(user);
                  setEditMode(true);
                }}
                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
              >
                <Edit3 size={13} /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <X size={13} /> Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm"
                >
                  <Check size={13} /> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {!editMode ? (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {user.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {user.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {user.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                Joined {user.joinDate}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <InputField
              label="Display Name"
              icon={<User size={15} />}
              value={draft.name}
              onChange={(v) => setDraft({ ...draft, name: v })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Bio
              </label>
              <textarea
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
