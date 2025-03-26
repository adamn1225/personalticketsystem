// components/SupportTicketForm.tsx
"use client";
import { useState } from "react";

const SupportTicketForm = () => {
    const [form, setForm] = useState({ subject: "", priority: "low", description: "" });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("/.netlify/functions/send-ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send ticket");
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again later.");
        }
    };

    if (submitted) {
        return <p className="text-green-600 font-semibold">Your support ticket has been submitted.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto p-4 bg-white rounded shadow space-y-4">
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit Ticket
            </button>
        </form>
    );
};

export default SupportTicketForm;
