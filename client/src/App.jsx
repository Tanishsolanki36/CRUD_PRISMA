// The frontend is complete and does NOT change in this assignment.
// It calls GET/POST/PUT/DELETE exactly as before — your work is server-side.
import CreateThreadForm from "./components/CreateThreadForm.jsx";
import ThreadList from "./components/ThreadList.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">Create, edit, and delete threads — all backed by PostgreSQL once you swap the routes.</p>
      <CreateThreadForm />
      <ThreadList />
    </div>
  );
}
