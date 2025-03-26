"use client";
import { useState } from "react";

const SupportTicketForm = () => {
    const [form, setForm] = useState({ subject: "", priority: "low", description: "" });
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);

            // Create preview URLs
            const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append("subject", form.subject);
        formData.append("priority", form.priority);
        formData.append("description", form.description);
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
        }
    };

    const closePopup = () => {
        setSubmitted(false);
        setForm({ subject: "", priority: "low", description: "" });
        setFiles([]);
        setPreviews([]);
    };

    return (
        <div className="max-w-6xl w-full h-fullmx-auto flex flex-col md:flex-row gap-6 p-4 bg-white rounded shadow">
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

            <form onSubmit={handleSubmit} className="max-w-6xl  h-1/2 w-full mx-auto p-4 bg-white rounded shadow space-y-4" encType="multipart/form-data">
                <h2 className="text-xl font-semibold text-gray-800">Submit a Ticket</h2>

                <div>
                    <label className="block font-medium text-sm text-gray-700">Subject</label>
                    <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium text-sm text-gray-700">Priority Level</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium text-sm text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-gray-300 p-2 rounded"
                        rows={5}
                    />
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
                                <p className="text-xs text-gray-500">PNG, JPG (Max 2MB each)</p>
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

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={false} // Ensure this is not set to true
                >
                    Submit Ticket
                </button>
            </form>
            <aside className="h-1/2 max-h-[650px] overflow-y-auto w-full md:w-2/5 bg-gray-50 border border-gray-200 rounded p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📸 How to Take a Screenshot</h3>
                <p className="text-sm text-gray-700 mb-2">
                    Submitting a screenshot with your ticket helps us resolve your issue faster.
                </p>

                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-800">🪟 Windows:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                        <li>Press <kbd className="bg-gray-200 px-1 rounded">Win</kbd> + <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> + <kbd className="bg-gray-200 px-1 rounded">S</kbd></li>
                        <li>Select an area to capture</li>
                        <li>Paste into Paint or attach the saved image here</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-800">🍏 Mac:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                        <li>Press <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> + <kbd className="bg-gray-200 px-1 rounded">Command</kbd> + <kbd className="bg-gray-200 px-1 rounded">4</kbd></li>
                        <li>Select an area</li>
                        <li>Find the screenshot on your desktop and attach it</li>
                    </ul>
                </div>

                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-sm text-gray-800">💡 Extra Tips</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside ml-2 space-y-1">
                        <li>Be specific — what were you trying to do?</li>
                        <li>Include any error messages (copy or screenshot them)</li>
                        <li>Don’t panic — just describe what happened</li>
                        <li>“It broke” is fine, but “I clicked the blue button and it froze” is gold</li>
                    </ul>
                </div>

                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-sm text-gray-800">🧓 Common Issues (and Fixes)</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside ml-2 space-y-1">
                        <li><b>🖱️ Mouse not working?</b> Try unplugging and plugging it back in.</li>
                        <li><b>🌐 No internet?</b> Try restarting your Wi-Fi or modem.</li>
                        <li><b>📄 Can’t find a file?</b> Try searching the file name in the bottom left (Windows) or top right (Mac).</li>
                        <li><b>🔊 No sound?</b> Check your volume and headphones aren't unplugged.</li>
                        <li><b>💻 Computer acting weird?</b> Restarting fixes 95% of issues.</li>
                        <li><b>⏳ Slow computer?</b> Close unused tabs or programs (seriously, you don’t need 47 open).</li>
                        <li><b>💬 Got a weird pop-up?</b> Screenshot it and send it with your ticket — don’t click anything.</li>
                    </ul>
                </div>
            </aside>

        </div>
    );
};

export default SupportTicketForm;