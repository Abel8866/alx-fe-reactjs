import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Blog Post</h1>
      <p className="read-the-docs">
        Dynamic route param <code>slug</code>: <strong>{slug}</strong>
      </p>
    </div>
  );
}
