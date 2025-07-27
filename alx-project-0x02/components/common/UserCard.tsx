import React from 'react';
import { UserProps } from '@/interfaces';

const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col space-y-2">
      <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> {user.email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Address:</span>{' '}
        {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </p>
      {/* You can add more details here if needed, e.g., phone, website */}
      <p className="text-gray-600">
        <span className="font-medium">Phone:</span> {user.phone}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Website:</span>{' '}
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {user.website}
        </a>
      </p>
    </div>
  );
};

export default UserCard;