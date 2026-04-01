import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  durations,
  filters,
  levels,
  ratings,
  skills,
} from "../../constants/courseFilterData";
import RatingStars from "../RatingStars";
import parseQueryToObject from "../../utils/parseQueryToObject";
import parseQueryToString from "../../utils/parseQueryToString";

// ---------------- RANGE CONFIG ----------------
const rangeConfig = {
  rating: (v) => ({ gte: Number(v), lt: Number(v) + 1 }),
  duration: (v) => {
    const map = {
      60: { gte: 60, lt: 180 },
      180: { gte: 180, lt: 300 },
      300: { gte: 300, lt: 420 },
      420: { gte: 420, lt: 600 },
      600: { gte: 600 },
    };
    return map[Number(v)]; // ✅ cast to Number so "1" matches key 1
  },
};

// ✅ Derive initial state directly from URL params — no useEffect needed
function getInitialSelected(searchParams) {
  return {
    isFree: searchParams.get("isFree") || "",
    level: searchParams.get("level") || "",
    rating: searchParams.get("rating[gte]") || "", // ✅ matches rangeConfig key
    duration: searchParams.get("duration[gte]") || "", // ✅ matches rangeConfig key
  };
}

// ---------------- COMPONENT ----------------
export function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(() =>
    getInitialSelected(searchParams),
  );
  const [selectedSkill, setSelectedSkill] = useState(
    () => searchParams.getAll("skill") || [],
  );
  const isRange = ["rating", "duration"];
  const queryFields = ["isFree", "level", "rating", "duration", "skill"];
  // ---------------- RADIO ----------------
  const handleSelectOne = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (selected[name] === value) {
        if (isRange.includes(name)) {
          params.delete(`${name}[gte]`);
          params.delete(`${name}[lt]`);
        } else {
          params.delete(name);
        }
        setSelected((p) => ({ ...p, [name]: "" }));
      } else {
        if (isRange.includes(name)) {
          const range = rangeConfig[name]?.(value);
          if (!range) return prev; // safety — return unchanged params
          params.delete(`${name}[gte]`);
          params.delete(`${name}[lt]`);
          if (range.gte !== undefined) params.set(`${name}[gte]`, range.gte);
          if (range.lt !== undefined) params.set(`${name}[lt]`, range.lt);
        } else {
          params.set(name, value);
        }
        setSelected((p) => ({ ...p, [name]: value }));
      }

      return params;
    });
  };

  // ---------------- CHECKBOX ----------------
  const handleSelectMany = (e) => {
    const { name, value, checked } = e.target;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (checked) {
        params.append(name, value);
        setSelectedSkill((p) => [...p, value]);
      } else {
        const updated = params.getAll(name).filter((v) => v !== value);
        params.delete(name);
        updated.forEach((v) => params.append(name, v));
        setSelectedSkill((p) => p.filter((v) => v !== value));
      }
      return params;
    });
  };

  // ---------------- CLEAR ----------------
  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    queryFields.forEach((f) => {
      if (isRange.includes(f)) {
        params.delete(`${f}[gte]`);
        params.delete(`${f}[lt]`);
      } else {
        params.delete(f);
      }
    });
    setSearchParams(params);
    setSelected({ isFree: "", level: "", rating: "", duration: "" });
    setSelectedSkill([]);
  };
  const object = parseQueryToObject(searchParams);
  const string = parseQueryToString(searchParams);
  console.log({ object, string });
  // ---------------- UI ----------------
  return (
    <div className="w-full md:w-64 bg-slate-100 dark:bg-slate-900 border-r p-4 md:p-6 flex flex-col gap-6 relative text-slate-700 dark:text-slate-300">
      <button className="md:hidden absolute -top-10 right-2">
        <X className="w-5 h-5 cursor-pointer" />
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <button
          onClick={handleClear}
          className="text-sm bg-slate-400 px-2 py-1 rounded dark:bg-slate-700 cursor-pointer"
        >
          Clear
        </button>
      </div>

      <Section title="Filter By">
        {filters.map((o) => (
          <Radio
            key={o.value}
            option={o}
            selected={selected}
            onChange={handleSelectOne}
            checked={selected[o.name] === o.value}
          />
        ))}
      </Section>

      <Section title="Skill Level">
        {levels.map((o) => (
          <Radio
            key={o.value}
            option={o}
            selected={selected}
            onChange={handleSelectOne}
            checked={selected[o.name] === o.value}
          />
        ))}
      </Section>

      <Section title="Rating">
        {ratings.map((o) => (
          <Radio
            key={o.value}
            option={o}
            selected={selected}
            onChange={handleSelectOne}
            checked={selected[o.name] === o.value}
          />
        ))}
      </Section>

      <Section title="Duration">
        {durations.map((o) => (
          <Radio
            key={o.value}
            option={o}
            selected={selected}
            onChange={handleSelectOne}
            checked={selected[o.name] === o.value}
          />
        ))}
      </Section>

      <Section title="Topics">
        {skills.map((s) => (
          <label
            key={s.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              name={s.name}
              value={s.value}
              checked={selectedSkill.includes(s.value)}
              onChange={handleSelectMany}
              className="w-4 h-4"
            />
            <span className="text-sm">{s.label}</span>
          </label>
        ))}
      </Section>
    </div>
  );
}

// ---------------- SMALL COMPONENTS ----------------
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Radio({ option, onChange, checked }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={option.name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      {option.name === "rating" ? (
        <span className="flex items-center gap-1 text-sm">
          <RatingStars rating={Number(option.value)} />
          {option.label}
        </span>
      ) : (
        <span className="text-sm">{option.label}</span>
      )}
    </label>
  );
}
