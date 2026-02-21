import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent.jsx";

const queryClient = new QueryClient();

function App() {
  const [activeView, setActiveView] = useState("posts");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="card">
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          <button type="button" onClick={() => setActiveView("posts")}>
            Posts
          </button>
          <button type="button" onClick={() => setActiveView("other")}>
            Other
          </button>
        </div>

        <p className="read-the-docs">
          Switch views to see cached data when returning.
        </p>

        {activeView === "posts" ? (
          <PostsComponent />
        ) : (
          <p>Other view (PostsComponent unmounted)</p>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
