// Already wired (GET). Do NOT edit.
import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import ThreadItem from "./ThreadItem.jsx";

export default function ThreadList() {
  const { data: threads, isLoading, isError, error } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  if (isLoading) return <p className="muted">Loading threads…</p>;
  if (isError) return <p className="error">Could not load threads: {error.message}</p>;
  if (!threads || threads.length === 0) {
    return <p className="muted">No threads yet. (An empty list from the database is a success!)</p>;
  }

  return (
    <ul className="threads">
      {threads.map((t) => (
        <ThreadItem key={t.id} thread={t} />
      ))}
    </ul>
  );
}
