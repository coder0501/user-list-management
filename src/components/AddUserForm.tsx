import React, { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { addUser } from "../redux/usersSlice";


const AddUserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.company) {
            setError("All fields are required.");
            return;
        }

        setError("");
        dispatch(
            addUser({
                name: form.name,
                email: form.email,
                phone: form.phone,
                company: { name: form.company },
                // Provide default values for optional fields
                address: {
                    street: "N/A",
                    city: "N/A",
                    zipcode: "N/A",
                },
                website: "N/A",
            })
        );

        setForm({ name: "", email: "", phone: "", company: "" });
    };

    return (

        <form onSubmit={handleSubmit} className=" container mx-auto m-4 max-w-lg p-4 space-y-4 bg-gray-100 rounded shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                    Add User
                </button>
            </div>
        </form>
    );
};

export default AddUserForm;
