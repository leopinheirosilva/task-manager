import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSun,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  // hook do tanstack query
  const queryClient = useQueryClient();

  // hook para chamar a API
  const { data: tasks } = useGetTasks();

  const [addTaskDialogIsOpen, setaddTaskDialogIsOpen] = useState(false);

  // filtra todas as tarefas com o time igual à "morning", "afternoon" e "night"
  const morningTasks = tasks?.filter((task) => task.time == "morning");
  const afternoonTasks = tasks?.filter((task) => task.time == "afternoon");
  const nightTasks = tasks?.filter((task) => task.time == "night");

  // função para alterar o status da checkbox
  const handleCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) {
        return task;
      }
      if (task.status == "not_started") {
        toast.success("Tarefa iniciada!!");
        return { ...task, status: "in_progress" };
      }
      if (task.status == "in_progress") {
        toast.success("Tarefa concluída!");
        return { ...task, status: "done" };
      }
      if (task.status == "done") {
        toast.success("Tarefa reiniciada!");
        return { ...task, status: "not_started" };
      }
      return task;
    });
    queryClient.setQueryData("tasks", newTasks);
  };

  // função para fechar a janela de Nova Tarefa
  const handleDialogClose = () => {
    setaddTaskDialogIsOpen(false);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* cabeçalho e botões */}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas <TrashIcon />
          </Button>
          <Button onClick={() => setaddTaskDialogIsOpen(true)}>
            Nova tarefa <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleDialogClose={handleDialogClose}
          />
        </div>
      </div>
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
              handleCheckboxClick={handleCheckboxClick}
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
              handleCheckboxClick={handleCheckboxClick}
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
              handleCheckboxClick={handleCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
