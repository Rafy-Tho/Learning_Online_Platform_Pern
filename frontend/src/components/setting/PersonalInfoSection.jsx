import { Calendar, Edit3, Mail, MapPin, Phone, User } from "lucide-react";
import InputField from "./InputField";
import SectionCard from "./SectionCard";

function PersonalInfoSection(props) {
  const { user, editMode, setDraft, setEditMode, draft } = props;
  return (
    <SectionCard title="Personal Information" icon={<User size={15} />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Email Address"
          icon={<Mail size={15} />}
          value={editMode ? draft.email : user.email}
          onChange={
            editMode ? (v) => setDraft({ ...draft, email: v }) : undefined
          }
          type="email"
          disabled={!editMode}
        />
        <InputField
          label="Phone Number"
          icon={<Phone size={15} />}
          value={editMode ? draft.phone : user.phone}
          onChange={
            editMode ? (v) => setDraft({ ...draft, phone: v }) : undefined
          }
          disabled={!editMode}
        />
        <InputField
          label="Location"
          icon={<MapPin size={15} />}
          value={editMode ? draft.location : user.location}
          onChange={
            editMode ? (v) => setDraft({ ...draft, location: v }) : undefined
          }
          disabled={!editMode}
        />
        <InputField
          label="Member Since"
          icon={<Calendar size={15} />}
          value={user.joinDate}
          disabled
        />
      </div>
      {!editMode && (
        <button
          onClick={() => {
            setDraft(user);
            setEditMode(true);
          }}
          className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
        >
          <Edit3 size={12} /> Edit information
        </button>
      )}
    </SectionCard>
  );
}

export default PersonalInfoSection;
