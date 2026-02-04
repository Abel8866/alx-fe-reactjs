import ProfilePage from "./components/ProfilePage";
import UserContext from "./components/UserContext";
import "./App.css";

function App() {
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 25,
    bio: "Loves hiking and photography.",
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
