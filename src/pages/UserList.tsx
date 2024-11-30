import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchUsers } from "../redux/usersSlice";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddUserForm from "../components/AddUserForm";

const UserListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.data);
    const status = useAppSelector((state) => state.users.status);
    const error = useAppSelector((state) => state.users.error);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (status === "idle") dispatch(fetchUsers());
    }, [dispatch, status]);

    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>

            <div className="flex items-end flex-wrap">
                <AddUserForm />
                {status === "loading" && <p>Loading users...</p>}
                {status === "failed" && <p className="text-red-500">{error}</p>}
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
                {filteredUsers.map((user) => (
                    <Link
                        key={user.id}
                        to={`/users/${user.id}`}
                        className="no-underline"
                    >
                        <div className="flex flex-col items-start p-6 border rounded-lg shadow-md hover:shadow-lg transition bg-white w-80">
                            <h2 className="font-bold text-xl text-blue-600">{user.name}</h2>
                            <p className="text-gray-600">Email: {user.email}</p>
                            <p className="text-gray-600">Phone: {user.phone}</p>
                            <p className="text-gray-800 font-medium">Company: {user.company.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>

    );
};

export default UserListPage;
