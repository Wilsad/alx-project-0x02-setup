import React from 'react';
import { GetStaticProps } from 'next';
import UserCard from '@/components/common/UserCard';
import { ApiUser } from '@/interfaces';

interface UsersPageProps {
  users: ApiUser[];
}

const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

// Fetch data at build time
export const getStaticProps = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.statusText}`);
    }
    const users: ApiUser[] = await res.json();

    return {
      props: {
        users,
      },
      revalidate: 60, // Optional: Re-generate the page every 60 seconds
    };
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return {
      props: {
        users: [], // Return empty array on error
      },
    };
  }
};

export default UsersPage;