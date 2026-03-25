import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import sequreApi from "../../axios/axiosSequre";
import { EventTags } from "../../config/type";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { X } from "lucide-react";

export default function AddEventModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<any>({
    title: "",
    fee: "",
    category: "",
    venue: "",
    description: "",
    start: "",
    end: "",
    open: "",
    lat: null,
    long: null,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [mapCenter, setMapCenter] = useState({ lat: 23.8103, lng: 90.4125 });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("fee", form.fee);
      fd.append("category", form.category);
      fd.append("venue", form.venue);
      fd.append("description", form.description);
      fd.append("lat", String(form.lat));
      fd.append("long", String(form.long));
      fd.append("start_date_time", form.start);
      fd.append("end_date_time", form.end);
      fd.append("openDoor", form.open);
      fd.append("tags", JSON.stringify(tags));
      if (image) fd.append("file", image);
      const res = await sequreApi.post("/event/create-event", fd);
      return res.data;
    },
    onSuccess: () => {
      alert("Event Created 🎉");
      onClose();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed");
    },
  });

  const validate = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.fee) newErrors.fee = "Fee is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.venue) newErrors.venue = "Venue is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.start) newErrors.start = "Start date/time required";
    if (!form.end) newErrors.end = "End date/time required";
    if (!form.open) newErrors.open = "Open door time required";
    if (!form.lat || !form.long) newErrors.location = "Select location on map";
    if (!image) newErrors.image = "Event image is required";
    if (tags.length === 0) newErrors.tags = "Select at least one tag";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="relative w-full max-w-3xl bg-black rounded-xl p-5 border border-[#C7B268]/30 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white p-1 rounded-full hover:bg-gray-800"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Create Event</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title & Fee */}
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                placeholder="Title"
                className="w-full p-2 rounded border border-gray-500 bg-black text-white"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
            </div>
            <div className="flex-1">
              <input
                placeholder="Fee"
                className="w-full p-2 rounded border border-gray-500 bg-black text-white"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
              {errors.fee && <p className="text-red-500 text-xs">{errors.fee}</p>}
            </div>
          </div>

          {/* Category & Venue */}
          <div className="flex gap-2">
            <div className="flex-1">
              <select
                className="w-full p-2 rounded border border-gray-500 bg-black text-white"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="1">Music</option>
                <option value="2">Sports</option>
                <option value="3">Art</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            </div>
            <div className="flex-1">
              <input
                placeholder="Venue"
                className="w-full p-2 rounded border border-gray-500 bg-black text-white"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
              />
              {errors.venue && <p className="text-red-500 text-xs">{errors.venue}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              className="w-full p-2 rounded border border-gray-500 bg-black text-white"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
          </div>

          {/* Date/Time */}
          <div className="grid grid-cols-3 gap-2">
            {(["start", "end", "open"] as const).map((key) => (
              <div key={key}>
                <label className="text-xs text-gray-300">{key === "open" ? "Open Door" : `${key} Date/Time`}</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 rounded border border-gray-500 bg-black text-white"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
                {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="w-full h-48 rounded overflow-hidden border border-gray-500">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={12}
                onClick={(e) => {
                  if (e.latLng) {
                    setForm({
                      ...form,
                      lat: e.latLng.lat(),
                      long: e.latLng.lng(),
                    });
                  }
                }}
              >
                {form.lat && form.long && <Marker position={{ lat: form.lat, lng: form.long }} />}
              </GoogleMap>
            )}
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mt-2">
            {Object.values(EventTags).map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() =>
                  setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                }
                className={`px-3 py-1 rounded-full border text-sm ${
                  tags.includes(tag) ? "bg-[#FF00FF] text-white" : "border-white/30 text-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-xs">{errors.tags}</p>}

          {/* Image */}
          <div>
            <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 mt-3 rounded-xl bg-[#C7B268] text-black font-bold hover:scale-105 transition-transform"
          >
            {isPending ? "Posting..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}