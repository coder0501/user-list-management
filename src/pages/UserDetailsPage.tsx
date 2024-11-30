import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { Link } from "react-router-dom";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams();
  const user = useAppSelector((state) =>
    state.users.data.find((u) => u.id === Number(id))
  );

  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <Link to="/" className="max-w-lg w-half ">
          <div className="flex gap-1 items-center mb-4">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.25 1.5L1.75 10L10.25 18.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-blue-600 mb-4"> {user.name}</h1>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Website:</span>{" "}
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user.website}
            </a>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Company:</span> {user.company.name}
          </p>
          {/* Uncomment below line if address information is available */}
          <p className="text-gray-600"><span className="font-medium">Address:</span> {`${user.address?.city}, ${user.address?.street}`}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;