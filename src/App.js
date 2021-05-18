import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import Tasks from "./components/Tasks";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    getTasks();
  }, []);

  //   useEffect(() => {
  //     fetch("http://localhost:5000/tasks")
  //       .then((res) => res.json())
  //       .then((tasks) => {
  //         setTasks(tasks);
  //       });
  //   }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const putTask = async (id) => {
    const curTask = tasks.find((t) => t.id === id);

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...curTask, reminder: !curTask.reminder }),
    });
    const data = await res.json();

    return data;
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { ...task, id };
    // setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const togglerReminder = async (id) => {
    const newTask = await putTask(id);
    setTasks(tasks.map((task) => (task.id === id ? newTask : task)));
  };

  return (
    <Router>
      <div className="container">
        <Header
          showAdd={showAddTask}
          onToggleShowAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={togglerReminder}
                />
              ) : (
                "No Tasks To Show"
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
