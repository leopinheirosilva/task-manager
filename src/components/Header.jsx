import { useState } from "react";
import { toast } from "sonner";

import { AddIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { useDeleteTasks } from "../hooks/data/use-delete-tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

const Header = ({ title, subtitle }) => {
  const [addTaskDialogIsOpen, setaddTaskDialogIsOpen] = useState(false);

  // hook para chamar a API
  const { mutate: deleteAllTasks, isPending: deleteAllTasksisPending } =
    useDeleteTasks();

  // função para remover todas as tarefas
  const handleDeleteAllTasks = () => {
    deleteAllTasks(undefined, {
      onSuccess: () => {
        toast.success("Todas as tarefas foram removidas!");
      },
      onError: () => {
        toast.error("Erro ao remover as tarefas");
      },
    });
  };

  // função para fechar a janela de Nova Tarefa
  const handleDialogClose = () => {
    setaddTaskDialogIsOpen(false);
  };

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button
          color="ghost"
          onClick={handleDeleteAllTasks}
          disabled={deleteAllTasksisPending}
        >
          Limpar tarefas
          {deleteAllTasksisPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <Button
          onClick={() => setaddTaskDialogIsOpen(true)}
          disabled={deleteAllTasksisPending}
        >
          Nova tarefa <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleDialogClose={handleDialogClose}
        />
      </div>
    </div>
  );
};

export default Header;
