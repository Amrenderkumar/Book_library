import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";

const GuestRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
    const timeoutId = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000); // 5 second timeout

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setLoading(false);
      }
      clearTimeout(timeoutId);
    }).catch(() => {
      if (mounted) {
        setLoading(false);
      }
      clearTimeout(timeoutId);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) setSession(session);
      }
    );

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-dvh w-full bg-white text-gray-600">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );

  return session ? <Navigate to={paths.home} /> : children;
};

export default GuestRoute;