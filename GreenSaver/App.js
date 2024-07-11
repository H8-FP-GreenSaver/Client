import React from "react";
import { AuthProvider } from "./contexts/Auth";
import MainStack from "./navigations/MainStack";

export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}
