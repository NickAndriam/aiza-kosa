import React from "react";
import { Button } from "../ui/button";
import { loginPuter } from "@/app/services/puter";

// Extend the Window interface to include 'puter'
declare global {
  interface Window {
    // @typescript-eslint/no-explicit-any
    puter?: unknown;
  }
}

interface PuterLoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
export default function PuterLogin({
  isLoggedIn,
  setIsLoggedIn,
}: PuterLoginProps) {
  async function onLoggingIn() {
    console.log("login");
    if (!isLoggedIn) {
      loginPuter();
      setIsLoggedIn(true);
    }
  }

  //   useEffect(() => {
  //     function checkLoggedIn() {
  //       if (
  //         typeof window === "undefined" ||
  //         typeof window.puter === "undefined"
  //       ) {
  //         console.error(
  //           "Puter is not available (not running in browser or script not loaded)"
  //         );
  //         return;
  //       }
  //       window.puter.auth.getUser().then((res: any) => {
  //         console.log("Puter User is: ", res);
  //         if (res.user) {
  //           setIsLoggedIn(true);
  //         } else {
  //           setIsLoggedIn(false);
  //         }
  //       });
  //     }
  //     checkLoggedIn();
  //     if (!isLoggedIn) {
  //       loginPuter();
  //       setIsLoggedIn(true);
  //     }
  //   }, [isLoggedIn]);

  return (
    <div>
      <Button
        onClick={onLoggingIn}
        // disabled={players.length < 2}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-cyan-500 hover:to-purple-600 text-white rounded-2xl h-14 text-lg font-semibold disabled:opacity-50
          mb-4"
      >
        Login
      </Button>
    </div>
  );
}
