"use client";
import { useState } from "react";
import { useBoomerMode } from "./BoomerModeProvider";
import UserLevelTips from "./UserLevelTips";
import { motion } from "framer-motion";

const SupportTicketForm = () => {
    const [form, setForm] = useState({ subject: "", priority: "low", description: "", name: "", ph: "", email: "" });
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const { boomerMode, advancedMode, toggleAdvancedMode } = useBoomerMode();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);

            // Create preview URLs
            const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Ensure at least one contact method is provided
        if (!form.email && !form.ph) {
            setError("Please provide at least an email or phone number.");
            return;
        }

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("subject", form.subject);
        formData.append("priority", form.priority);
        formData.append("description", form.description);
        formData.append("name", form.name);
        formData.append("ph", form.ph);
        formData.append("email", form.email);
        files.forEach((file) => {
            formData.append("screenshot", file);
        });

        try {
            const res = await fetch("/api/send-ticket", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            console.log("Uploaded to R2:", data);
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const closePopup = () => {
        setSubmitted(false);
        setForm({ subject: "", priority: "low", description: "", name: "", ph: "", email: "" });
        setFiles([]);
        setPreviews([]);
    };

    return (
        <div className={boomerMode ? `max-w-7xl w-full h-full mx-auto flex flex-col md:flex-row gap-6 p-4 bg-white rounded shadow` : `max-w-7xl w-full h-full mx-auto flex flex-col md:flex-row gap-6 p-4 bg-zinc-900 text-white rounded shadow`}>
            {submitted && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-green-600">Ticket Submitted!</h2>
                        <p className="mt-2 text-gray-700">Your support ticket has been successfully submitted.</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {loading && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-blue-600">Sending message...</h2>
                        <motion.div
                            className="mt-4 w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        ></motion.div>
                    </div>
                </motion.div>
            )}


            {boomerMode ? (
                <form onSubmit={handleSubmit} className="max-w-6xl h-1/2 w-full mx-auto p-4 bg-white rounded shadow space-y-4" encType="multipart/form-data">
                    <h2 className="text-xl font-semibold text-gray-800">Submit a Ticket</h2>

                    <div>
                        <label className="block font-medium text-sm text-gray-700">Subject</label>
                        <input
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Enter a subject of the issue"
                            required
                            className="mt-1 w-full border text-zinc-950 border-gray-300 p-2 rounded placeholder:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-900">Priority Level</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 text-gray-900 p-2 rounded"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-900">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the issue you're facing"
                            required
                            className="mt-1 w-full border border-gray-300 p-2 rounded text-gray-900 placeholder:text-gray-400"
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-900">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="First or last name"
                            className="mt-1 w-4/5 border border-gray-300 p-2 rounded placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg text-gray-900 font-medium">
                            Best way to reach you - you can choose either or both
                        </h3>
                        <div className="flex gap-2">
                            <span>
                                <label className="block font-medium text-sm text-gray-900">Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder={boomerMode ? "itsbarbara1961@aol.net" : "you@example.com"}
                                    className="mt-1 w-full border border-gray-300 p-2 rounded placeholder:text-gray-400"
                                />
                            </span>
                            <span>
                                <label className="block font-medium text-sm text-gray-900">Phone Number</label>
                                <input
                                    name="ph"
                                    value={form.ph}
                                    onChange={handleChange}
                                    placeholder="(555) 867-5309"
                                    className="mt-1 w-full border border-gray-300 p-2 rounded placeholder:text-gray-400"
                                />
                            </span>
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700 mb-1">Attach Screenshots</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 mb-2 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16V4m0 0L3 8m4-4l4 4m4 12h6m-6 0a2 2 0 100-4m0 4a2 2 0 010-4m0 4v-4m0 0h-2a2 2 0 00-2 2v2"
                                        ></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG, JFIF, PDF (Max 2MB each)</p>
                                </div>
                                <input
                                    type="file"
                                    name="screenshot"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {previews.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {previews.map((src, index) => (
                                    <div key={index} className="border p-1 rounded">
                                        <img src={src} alt={`Preview ${index + 1}`} className="object-contain h-32 w-full" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Submit Ticket"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                        />
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-6xl h-1/2 w-full mx-auto p-4 bg-zinc-900 text-white rounded shadow space-y-4" encType="multipart/form-data">
                    <h2 className="text-xl font-semibold text-gray-50">Submit a Ticket</h2>
                    <div>
                        <label className="block font-medium text-sm text-gray-50">Subject</label>
                        <input
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Enter a subject of the issue"
                            required
                            className="mt-1 w-full border text-zinc-950 border-gray-300 p-2 rounded placeholder:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-white">Priority Level</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300  text-white p-2 rounded"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-white">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the issue you're facing"
                            required
                            className="mt-1 w-full border border-gray-300 p-2 rounded  text-zinc-950 placeholder:text-gray-400"
                            rows={5}
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-white">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="First or last name"
                            className="mt-1 w-4/5 border border-gray-300 text-zinc-950 p-2 rounded placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg text-white font-medium">
                            Best way to reach you - you can choose either or both
                        </h3>
                        <div className="flex gap-2">
                            <span>
                                <label className="block font-medium text-sm text-white">Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder={boomerMode ? "itsbarbara1961@aol.net" : "you@example.com"}
                                    className="mt-1 w-full border border-gray-300 text-zinc-950 p-2 rounded placeholder:text-gray-400"
                                />
                            </span>
                            <span>
                                <label className="block font-medium text-sm text-white">Phone Number</label>
                                <input
                                    name="ph"
                                    value={form.ph}
                                    onChange={handleChange}
                                    placeholder="(555) 867-5309"
                                    className="mt-1 w-full border border-gray-300 p-2 rounded placeholder:text-gray-400"
                                />
                            </span>
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700 mb-1">Attach Screenshots</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 mb-2 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16V4m0 0L3 8m4-4l4 4m4 12h6m-6 0a2 2 0 100-4m0 4a2 2 0 010-4m0 4v-4m0 0h-2a2 2 0 00-2 2v2"
                                        ></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG, JFIF, PDF (Max 2MB each)</p>
                                </div>
                                <input
                                    type="file"
                                    name="screenshot"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {previews.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {previews.map((src, index) => (
                                    <div key={index} className="border p-1 rounded">
                                        <img src={src} alt={`Preview ${index + 1}`} className="object-contain h-32 w-full" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Submit Ticket"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                        />
                    </div>
                </form>
            )}
            <UserLevelTips />
        </div>
    );
};

export default SupportTicketForm;