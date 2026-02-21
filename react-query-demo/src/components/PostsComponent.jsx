import { useQuery } from "react-query";

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("posts", fetchPosts, {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError)
    return (
      <div>
        <p>Error: {error?.message}</p>
        <button type="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );

  return (
    <div>
      <h2>Posts</h2>
      {isFetching ? <p>Updating...</p> : null}
      <ul>
        {posts?.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
