import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h1>Blog Post</h1>
      <p className="read-the-docs">
        Dynamic route param <code>id</code>: <strong>{id}</strong>
      </p>
    </div>
  );
}
