import { useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import ProfileHeader from "./ProfileHeader";

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Alexandra Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    bio: "Product designer passionate about clean interfaces and thoughtful UX. Coffee addict. Dog person.",
    joinDate: "March 2022",
    plan: "Pro",
    avatar: "",
    dateBirth: "",
    gender: "",
  });

  const [draft, setDraft] = useState(user);
  const handleSaveProfile = () => {
    setUser(draft);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setDraft(user);
    setEditMode(false);
  };

  return (
    <>
      <ProfileHeader
        user={user}
        editMode={editMode}
        setEditMode={setEditMode}
        setDraft={setDraft}
        draft={draft}
        handleSaveProfile={handleSaveProfile}
        handleCancelEdit={handleCancelEdit}
      />
      <PersonalInfoSection
        user={user}
        editMode={editMode}
        setDraft={setDraft}
        setEditMode={setEditMode}
        draft={draft}
      />
    </>
  );
}

export default UserProfile;
