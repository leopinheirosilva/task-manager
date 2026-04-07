import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSun,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  // states
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setaddTaskDialogIsOpen] = useState(false);

  // API
  useEffect(() => {
    const fetchTasks = async () => {
      // pegar os dados da API
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });
      const tasks = await response.json();
      // autaliza o state "tasks"
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  // filtra todas as tarefas com o time igual à "morning"
  const morningTasks = tasks.filter((task) => task.time == "morning");

  // filtra todas as tarefas com o time igual à "afternoon"
  const afternoonTasks = tasks.filter((task) => task.time == "afternoon");

  // filtra todas as tarefas com o time igual à "night"
  const nightTasks = tasks.filter((task) => task.time == "night");

  // função para fechar a janela de Nova Tarefa
  const handleDialogClose = () => {
    setaddTaskDialogIsOpen(false);
  };

  // função para alterar o status da checkbox
  const handleCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) {
        return task;
      }
      // lógica para atualizar o status da tarefa
      if (task.status == "not_started") {
        toast.success("Tarefa iniciada!!"); // adiciona um toast da lib sonner
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
    setTasks(newTasks);
  };

  // lógica para deleção de tarefas
  const onDeleteTaskSuccess = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
    toast.success("Tarefa removida com sucesso!");
  };

  // função para adicionar tarefa
  const handleAddTask = async (task) => {
    // chama a api para salvar a tarefa
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar a tarefa! Por favor, tente novamente"
      );
    }
    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso!");
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
            handleSubmit={handleAddTask}
          />
        </div>
      </div>
      {/* lista de tarefas */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          {/* manhã */}
          <TasksSeparator title="manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick} // prop do componente TaskItem
              onDeleteSuccess={onDeleteTaskSuccess} // prop do componente taskItem
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          {/* tarde */}
          <TasksSeparator title="tarde" icon={<CloudSun />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick} // prop do componente TaskItem
              onDeleteSuccess={onDeleteTaskSuccess} // prop do componente taskItem
            />
          ))}
        </div>
        <div className="space-y-3">
          {/* noite */}
          <TasksSeparator title="noite" icon={<MoonIcon />} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick} // prop do componente TaskItem
              onDeleteSuccess={onDeleteTaskSuccess} // prop do componente taskItem
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
