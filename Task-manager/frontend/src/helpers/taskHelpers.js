export const populateTaskList = (tasks) => {
  const taskMap = new Map();

  tasks.forEach((task) => {
    taskMap.set(task._id, { ...task, subTasks: [] });
  });

  tasks.forEach((task) => {
    if (task.subTask && task.subTask.length > 0) {
      task.subTask.forEach((subTaskId) => {
        const subTask = taskMap.get(subTaskId);
        if (subTask) {
          taskMap.get(task._id).subTasks.push(subTask);
        }
      });
    }
  });

  const nestedTasks = tasks
    .filter(
      (task) => !tasks.some((t) => t.subTask && t.subTask.includes(task._id))
    )
    .map((task) => taskMap.get(task._id));

  return nestedTasks;
};
