import { useContext } from "react";

import UserContext from "./UserContext";

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <section>
      <h2>{userData?.name}</h2>
      <p>Age: {userData?.age ?? "N/A"}</p>
      <p>Bio: {userData?.bio ?? "N/A"}</p>
    </section>
  );
}

export default UserProfile;
