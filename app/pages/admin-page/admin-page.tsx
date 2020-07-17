import React from 'react'
import Link from "next/link";

import UsersService from "../../services/users-service";

const usersService = new UsersService({});

export default function AdminPage() {
  const authorizeUser = (): void => {
    usersService.authorizeUser();
  };

  const loginUser = (): void => {
    usersService.loginUser();
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={authorizeUser}>authorize</button>
      <button onClick={loginUser}>login</button>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  )
}
