import { Link } from "react-router-dom";

import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Início" subtitle="Início" />
        <DashboardCards />
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <Link to="/tasks" className="text-xl font-semibold">
                Tarefas
              </Link>
              <p className="text-sm text-brand-text-gray">
                Resumo das tarefas disponíveis
              </p>
            </div>
            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-y-6 rounded-[10px] bg-white p-6">
            <p className="text-brand-text-gray">
              &quot; Cada pequena ação de hoje te aproxima das grandes
              conquistas de amanhã. Faça o que precisa ser feito! &quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
