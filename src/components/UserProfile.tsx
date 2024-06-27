import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice/userSlice";
import { fetchUser } from "../store/userSlice/userThunk";
import { useAppSelector } from "../hooks/hooks";

const UserProfileComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profile) {
    return <p>User profile not available.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {profile.id}</p>
      <p>Username: {profile.userName}</p>
      <p>Email: {profile.email}</p>
  
    </div>
  );
};

export default UserProfileComponent;
