import PropTypes from "prop-types";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            {...task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Tasks;
