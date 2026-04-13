import { useEffect, useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import ProfileHeader from "./ProfileHeader";
import useGetUserProfile from "../../hooks/user/useGetUserProfile";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";
import useUpdateUserProfile from "../../hooks/user/useUpdateUserProfile";
import { toast } from "react-toastify";

const defaultUser = {
  name: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  joinDate: "",
  image: "",
  dateBirth: "",
  gender: "",
};
const mapUser = (u) => ({
  name: u?.name ?? "",
  email: u?.email ?? "",
  phone: u?.phone ?? "",
  location: u?.location ?? "",
  bio: u?.bio ?? "",
  joinDate: u?.created_at ?? "",
  image: u?.image_url ?? "",
  dateBirth: u?.date_birth ?? "",
  gender: u?.gender ?? "",
});
function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [draft, setDraft] = useState(defaultUser);
  const { data, isPending, error } = useGetUserProfile();
  const { updateProfile, isPending: isUpdatePending } = useUpdateUserProfile();
  const [errors, setErrors] = useState({});
  // ✅ Load data from API
  useEffect(() => {
    if (!data?.data) return;
    const mapped = mapUser(data.data);
    setUser(mapped);
    setDraft(mapped);
  }, [data?.data]);

  const field = (key) => (editMode ? draft[key] : user[key]);
  const update = (key) =>
    editMode ? (v) => setDraft((prev) => ({ ...prev, [key]: v })) : undefined;

  const handleSaveProfile = async () => {
    setErrors({});
    const errors = {};
    const required = ["name", "email"];
    for (const key of required) {
      if (!draft[key] || draft[key] === "") {
        errors[key] = "This field is required";
      }
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const formData = new FormData();
    Object.entries(draft).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });
    for (let [k, v] of formData.entries()) {
      console.log(k, v);
    }
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setUser(draft);
      setEditMode(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setDraft(user);
    setEditMode(false);
  };
  const handleOpenEdit = () => {
    setDraft(user);
    setEditMode(true);
  };
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <ProfileHeader
        editMode={editMode}
        field={field}
        update={update}
        handleSaveProfile={handleSaveProfile}
        handleCancelEdit={handleCancelEdit}
        handleOpenEdit={handleOpenEdit}
        isUpdatePending={isUpdatePending}
        errors={errors}
      />
      <PersonalInfoSection
        field={field}
        update={update}
        editMode={editMode}
        errors={errors}
      />
    </>
  );
}

export default UserProfile;
