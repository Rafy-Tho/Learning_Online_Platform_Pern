import { Calendar, Camera, Check, Edit3, MapPin, User, X } from "lucide-react";
import { useState } from "react";
import Avatar from "./Avatar";
import InputField from "./InputField";
function ProfileHeader({
  editMode,
  handleSaveProfile,
  handleCancelEdit,
  update,
  field,
  handleOpenEdit,
  isUpdatePending,
  errors,
}) {
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    update("image")(file);
    // preview
    setPreview(URL.createObjectURL(file));
  };
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
            <Avatar src={preview || field("image")} name={field("name")} />
            {editMode && (
              <label
                htmlFor="avatar"
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              >
                <Camera size={13} />
              </label>
            )}
            <input
              htmlFor="avatar"
              type="file"
              className="hidden"
              id="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            {!editMode ? (
              <button
                onClick={handleOpenEdit}
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
                {!isUpdatePending && (
                  <button
                    onClick={handleSaveProfile}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm"
                  >
                    <Check size={13} /> Save Changes
                  </button>
                )}
                {isUpdatePending && (
                  <button
                    disabled={isUpdatePending}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm"
                  >
                    saving...
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {!editMode ? (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {field("name")}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {field("bio")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {field("location")}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                Joined {new Date(field("joinDate")).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <InputField
                label="Display Name"
                icon={<User size={15} />}
                value={field("name")}
                onChange={update("name")}
              />
              {editMode && errors?.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Bio
              </label>
              <textarea
                value={field("bio")}
                onChange={(e) => update("bio")(e.target.value)}
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
