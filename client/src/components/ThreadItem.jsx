// Already wired (PUT + DELETE). Do NOT edit.
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateThread, deleteThread } from "../services/threads.service";

export default function ThreadItem({ thread }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(thread.title);
  const [body, setBody] = useState(thread.body);
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["threads"] });

  const editMutation = useMutation({
    mutationFn: () => updateThread(thread.id, { title, body }),
    onSuccess: () => { setEditing(false); invalidate(); },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteThread(thread.id),
    onSuccess: invalidate,
  });

  if (editing) {
    return (
      <li className="thread">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={body} onChange={(e) => setBody(e.target.value)} />
        <div className="row">
          <button onClick={() => editMutation.mutate()} disabled={editMutation.isPending}>Save</button>
          <button className="ghost" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className="thread">
      <h3>{thread.title}</h3>
      <p>{thread.body}</p>
      <div className="row">
        <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>Delete</button>
      </div>
    </li>
  );
}
