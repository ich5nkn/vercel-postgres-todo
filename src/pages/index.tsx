import { useEffect, useState } from "react";

type Task = {
  name: string;
  status: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const addTask = () => {
    fetch("api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: input }),
    })
      .then(() => {
        setInput("");
        getTasks();
      })
      .catch((error) => console.error("Error:", error));
  };

  const getTasks = () => {
    fetch("api/task")
      .then((res) => res.json())
      .then((json) => setTasks(json.rows))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <div>
        {tasks.map((task, idx) => (
          <div key={idx}>{task.name}</div>
        ))}
      </div>
    </div>
  );
}
