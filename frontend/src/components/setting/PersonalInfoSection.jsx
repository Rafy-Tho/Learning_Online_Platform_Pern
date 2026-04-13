import { Calendar, Edit3, Mail, MapPin, Phone, User } from "lucide-react";
import InputField from "./InputField";
import SectionCard from "./SectionCard";
import SelectField from "./SelectField";

function PersonalInfoSection({ editMode, field, update, errors }) {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "nonbinary", label: "Non-binary" },
    { value: "prefer_not", label: "Prefer not to say" },
  ];

  return (
    <SectionCard title="Personal Information" icon={<User size={15} />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InputField
            label="Email Address"
            icon={<Mail size={15} />}
            value={field("email")}
            onChange={update("email")}
            type="email"
            disabled={!editMode}
          />
          {editMode && errors?.email && (
            <span className="text-red-500 text-sm">{errors?.email}</span>
          )}
        </div>

        <InputField
          label="Phone Number"
          icon={<Phone size={15} />}
          value={field("phone")}
          onChange={update("phone")}
          disabled={!editMode}
        />
        <InputField
          label="Location"
          icon={<MapPin size={15} />}
          value={field("location")}
          onChange={update("location")}
          disabled={!editMode}
        />
        <InputField
          label="Member Since"
          icon={<Calendar size={15} />}
          value={new Date(field("joinDate")).toLocaleDateString()}
          disabled={!editMode}
        />
        <SelectField
          label="Gender"
          icon={<User size={15} />}
          value={field("gender")}
          onChange={update("gender")}
          options={genderOptions}
          disabled={!editMode}
        />
        {editMode && (
          <InputField
            label="Date of Birth"
            icon={<Calendar size={15} />}
            value={field("dateBirth")}
            onChange={update("dateBirth")}
            type="date"
            disabled={!editMode}
          />
        )}
        {!editMode && (
          <InputField
            label="Date of Birth"
            icon={<Calendar size={15} />}
            value={
              field("dateBirth")
                ? new Date(field("dateBirth")).toLocaleDateString()
                : "mm/dd/yyyy"
            }
            disabled={!editMode}
          />
        )}
      </div>
    </SectionCard>
  );
}

export default PersonalInfoSection;
