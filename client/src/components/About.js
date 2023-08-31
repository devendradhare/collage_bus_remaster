import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function About() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    loginWithRedirect();
  }
  return (
    <div>
      <h1>this is about</h1>
    </div>
  );
}
