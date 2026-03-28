/* eslint-disable react/prop-types */
import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  // variação de estilo segundo o status da tarefa
  const getStatusClasses = () => {
    if (task.status == "done") {
      return "bg-[#00ADB5] text-[#002C2E]";
    }

    if (task.status == "in_progress") {
      return "bg-[#FFAA04] text-[#7F5502]";
    }

    if (task.status == "not_started") {
      return "bg-[#35383E] bg-opacity-5 text-[#35383E]";
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
            <LoaderIcon className="animate-spin" />
          )}
        </label>

        {/* tarefa */}
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        {/* botão para remover tarefa */}
        <Button
          variant="ghost"
          onClick={() => handleDeleteClick(task.id)} // sintaxe para chamar uma função recebida como prop, que irá receber um parametro
        >
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>
        
        {/* botão ver detalhes */}
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
