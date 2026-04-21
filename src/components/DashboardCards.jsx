import { LoaderIcon, TasksIcon, TasksIcon2, TasksIcon3 } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Card from "./Card";

const DashboardCards = () => {
  // hook para chamar a API
  const { data: tasks } = useGetTasks();

  // filtra as tarefas em andamento e as tarefas concluídas
  const doneTasks = tasks?.filter((task) => task.status == "done").length;
  const inProgressTask = tasks?.filter(
    (task) => task.status == "in_progress"
  ).length;
  const notStartedTasks = tasks?.filter(
    (task) => task.status == "not_started"
  ).length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <Card
        icon={<TasksIcon3 />}
        title={tasks?.length}
        subtitle="Tarefas disponíveis"
      />
      <Card
        icon={<TasksIcon2 />}
        title={notStartedTasks}
        subtitle="Tarefas não iniciadas"
      />
      <Card
        icon={<TasksIcon />}
        title={doneTasks}
        subtitle="Tarefas concluídas"
      />
      <Card
        icon={<LoaderIcon />}
        title={inProgressTask}
        subtitle="Tarefas em andamento"
      />
    </div>
  );
};

export default DashboardCards;
