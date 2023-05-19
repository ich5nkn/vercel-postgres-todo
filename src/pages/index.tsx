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
    <div className="bg-gray-100 max-w-xl mx-auto p-8">
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-1 rounded-md mr-2"
        />
        <button
          onClick={addTask}
          className="border border-gray-400 shadow-sm rounded-md py-1 px-2 bg-white"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col gap-y-2 mt-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-gray-300 shadow-md p-4 flex justify-between"
          >
            <p className="flex items-center">{task.name}</p>
            <button
              className="border border-gray-400 shadow-sm rounded-md py-1 px-2"
              onClick={() => onClickDone(task.id, !task.status)}
            >
              {task.status ? "REOPEN" : "DONE"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
