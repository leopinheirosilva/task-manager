import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-update-task";
import Button from "./Button";

const TaskItem = ({ task }) => {
  // hooks para chamar a API
  const { mutate: deleteTask, isPending: deleteTaskisPending } = useDeleteTask(
    task.id
  );
  const { mutate: updateTask, isPending: updateStatusisPending } =
    useUpdateTask(task.id);

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

  // lógica para atualizar o status da tarefa
  const getNewStatus = () => {
    if (task.status == "done") {
      return "not_started";
    }
    if (task.status == "in_progress") {
      return "done";
    }
    if (task.status == "not_started") {
      return "in_progress";
    }
  };

  // função para atualizar o status da tarefa
  const handleCheckboxClick = () => {
    updateTask(
      { status: getNewStatus() },
      {
        onSuccess: () => {
          toast.success("Status da tarefa atualizado com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao atualizar o status da tarefa!");
        },
      }
    );
  };

  // função para deletar tarefa
  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa! Por favor, tente novamente");
      },
    });
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
            onChange={handleCheckboxClick}
            disabled={updateStatusisPending}
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
          onClick={handleDeleteClick}
          disabled={deleteTaskisPending || updateStatusisPending}
        >
          {deleteTaskisPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        {/* botão ver detalhes */}
        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
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
};

export default TaskItem;
