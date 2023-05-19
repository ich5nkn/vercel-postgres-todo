import { useEffect, useState } from "react";

type Task = {
  id: number;
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

  const onClickDone = (id: number, status: boolean) => {
    fetch("api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    })
      .then(() => {
        getTasks();
      })
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
        {tasks.map((task) => (
          <div key={task.id}>
            {task.name}
            <button onClick={() => onClickDone(task.id, !task.status)}>
              {task.status ? "REOPEN" : "DONE"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
