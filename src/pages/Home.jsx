import { GlassWater, LoaderIcon, TasksIcon, TasksIcon2 } from "../assets/icons";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  // hook para chamar a API
  const { data: tasks } = useGetTasks();

  // filtra as tarefas em andamento e as tarefas concluídas
  const inProgressTask = tasks?.filter(
    (task) => task.status == "in_progress"
  ).length;
  const doneTasks = tasks?.filter((task) => task.status == "done").length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Início" subtitle="Início" />
        <div className="grid grid-cols-4 gap-9">
          <Card
            icon={<TasksIcon2 />}
            title={tasks?.length}
            subtitle="Tarefas disponíveis"
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
          <Card icon={<GlassWater />} title="40%" subtitle="Água" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
