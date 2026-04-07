import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  // função para deletar tarefa
  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    // chama a api para deletar a tarefa
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa! Por favor, tente novamente"
      );
    }
    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };

  // variação de estilo segundo o status da tarefa
  const getStatusClasses = () => {
    if (task.status == "done") {
      return "bg-brand-primary text-brand-dark-blue";
    }

    if (task.status == "in_progress") {
      return "bg-brand-process text-brand-process";
    }

    if (task.status == "not_started") {
      return "bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue";
    }
  };

  return (
    <div
      className={`bg-op flex justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        {/* checkbox */}
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-opacity-100 ${getStatusClasses()}`}
        >
          <input
            className="absolute h-full cursor-pointer opacity-0"
            type="checkbox"
            checked={task.status == "done"}
            onChange={() => handleCheckboxClick(task.id)} // sintaxe para chamar uma função recebida como prop, que irá receber um parametro
          />
          {task.status == "done" && <CheckIcon />}
          {task.status == "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {/* tarefa */}
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        {/* botão para remover tarefa */}
        <Button
          color="ghost"
          onClick={() => handleDeleteClick(task.id)} // sintaxe para chamar uma função recebida como prop, que irá receber um parametro
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        {/* botão ver detalhes */}
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "night"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }),
  handleCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default TaskItem;
