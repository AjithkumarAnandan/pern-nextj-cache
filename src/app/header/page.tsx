"use client";
import { useStore } from "@/app/stores";

const Header = () => {
  const { user, increment } = useStore((state) => state);
  if (!user) return null;

  return (
    <div>
      <h1>Hello, {user?.name || "Guest"}!</h1>
      <button onClick={increment}>Click +1</button>
    </div>
  );
};
export default Header;
