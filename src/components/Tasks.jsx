import { CloudSun, MoonIcon, SunIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  // hook para chamar a API
  const { data: tasks } = useGetTasks();

  // filtra todas as tarefas com o time igual à "morning", "afternoon" e "night"
  const morningTasks = tasks?.filter((task) => task.time == "morning");
  const afternoonTasks = tasks?.filter((task) => task.time == "afternoon");
  const nightTasks = tasks?.filter((task) => task.time == "night");

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      {/* lista de tarefas */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          {/* manhã */}
          <TasksSeparator title="manhã" icon={<SunIcon />} />
          {morningTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          {/* tarde */}
          <TasksSeparator title="tarde" icon={<CloudSun />} />
          {afternoonTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className="space-y-3">
          {/* noite */}
          <TasksSeparator title="noite" icon={<MoonIcon />} />
          {nightTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
