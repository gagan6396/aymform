// components/EnrollmentForm.jsx
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const COURSES = [
  { label: "100-Hour Yoga Teacher Training",                value: "100hr_ytt",      durations: ["13 Days"] },
  { label: "200-Hour Yoga Teacher Training",                value: "200hr_ytt",      durations: ["26 Days"] },
  { label: "300-Hour Yoga Teacher Training",                value: "300hr_ytt",      durations: ["28 Days"] },
  { label: "500-Hour Yoga Teacher Training",                value: "500hr_ytt",      durations: ["56 Days"] },
  { label: "Kundalini Yoga Teacher Training",               value: "kundalini_yoga", durations: ["25 Days"] },
  { label: "Pregnancy Yoga Teacher Training",               value: "prenatal_yoga",  durations: ["8 Days"] },
  { label: "Ashtanga Vinyasa Yoga Teacher Training Course", value: "vinyasa_retreat",durations: ["25 Days"] },
  { label: "Yoga Teacher Training Course in Goa",           value: "goa_retreat",    durations: ["200 hour [23 days]", "300 hour [26 days]", "500 hour [57 days]"] },
];

const GF_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdmwzYhwfmkihIWWwoJ5sBeDJMlCwo6oqyhuLXDs5Cki2rxLQ/formResponse";

export default function EnrollmentForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const selectedCourse = watch("course");
  const courseObj = COURSES.find((c) => c.value === selectedCourse);

  useEffect(() => {
    if (courseObj?.durations.length === 1) {
      setValue("duration", courseObj.durations[0]);
    } else {
      setValue("duration", "");
    }
  }, [selectedCourse, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");

    const courseLabel = COURSES.find((c) => c.value === data.course)?.label ?? data.course;

    const body = new URLSearchParams();
    body.append("entry.1002069012", data.name);
    body.append("entry.844032593",  data.email);
    body.append("entry.11736650",   data.mobile);
    body.append("entry.1296177190", courseLabel);
    body.append("entry.1857002501", data.state);
    body.append("entry.56371616",   data.country);
    body.append("entry.1802059289", `${data.address}\nDuration: ${data.duration}`);
    body.append("entry.1023058625", data.duration);

    try {
      await fetch(GF_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      // Redirect to thank you page
      navigate('/thank-you');
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const field = (hasErr) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm bg-white/90 text-gray-800 outline-none
     focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400
     ${hasErr ? "border-red-400" : "border-gray-300"}`;

  const BgWrapper = ({ children }) => (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 0 }} />
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );

  return (
    <BgWrapper>
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src="/aym-logo.png" alt="AYM Yoga School" className="h-24 w-auto object-contain drop-shadow-lg" />
        <p className="text-white text-xl italic mt-2 tracking-wide drop-shadow font-medium">
          || योग: कर्मसु कौशलम् ||
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-orange-500 px-8 py-5 text-white text-center">
          <h1 className="text-xl font-bold tracking-tight">Course Enrollment Form</h1>
          <p className="text-sm text-orange-100 mt-0.5">Accredited by the Ministry of AYUSH, Govt. of India</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-5">

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input {...register("name", { required: "Required" })} placeholder="Arjun Sharma" className={field(errors.name)} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
              <input type="email" {...register("email", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })} placeholder="you@example.com" className={field(errors.email)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Mobile + Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
              <input type="tel" {...register("mobile", { required: "Required" })} placeholder="+91 98765 43210" className={field(errors.mobile)} />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Course *</label>
              <select {...register("course", { required: "Please select a course" })} className={field(errors.course) + " cursor-pointer"}>
                <option value="">— Choose a course —</option>
                {COURSES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
            </div>
          </div>

          {/* Duration */}
          {courseObj && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Duration</label>
              {courseObj.durations.length === 1 ? (
                <>
                  <input type="hidden" {...register("duration")} value={courseObj.durations[0]} />
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-100 border border-orange-300 rounded-lg px-4 py-2">
                    ✓ {courseObj.durations[0]}
                  </span>
                </>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {courseObj.durations.map((d) => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={d} {...register("duration", { required: "Please pick a duration" })} className="accent-orange-500 w-4 h-4" />
                      <span className="text-sm text-gray-700 font-medium">{d}</span>
                    </label>
                  ))}
                </div>
              )}
              {errors.duration && <p className="text-red-500 text-xs mt-2">{errors.duration.message}</p>}
            </div>
          )}

          {/* State + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
              <input {...register("state", { required: "Required" })} placeholder="e.g. Uttarakhand" className={field(errors.state)} />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Country *</label>
              <input {...register("country", { required: "Required" })} placeholder="e.g. India" className={field(errors.country)} />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
            <textarea rows={3} {...register("address", { required: "Required" })} placeholder="House / Street, City, PIN Code" className={field(errors.address) + " resize-none"} />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl text-sm tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting…" : "Submit Enrollment"}
          </button>

          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to be contacted by AYM Yoga School.
          </p>
        </form>
      </div>
    </BgWrapper>
  );
}