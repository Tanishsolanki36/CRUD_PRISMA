// Already wired (POST). Do NOT edit.
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createThread({ title, body }),
    onSuccess: () => {
      setTitle("");
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  return (
    <form
      className="create"
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) mutation.mutate();
      }}
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Thread title" />
      <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body (optional)" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding…" : "Add thread"}
      </button>
    </form>
  );
}
