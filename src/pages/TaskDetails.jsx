import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ChevronRight, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useGetTask } from "../hooks/data/use-get-task";
import { useUpdateTask } from "../hooks/data/use-update-task";

const TaskDetailsPage = () => {
  // hooks do react router DOM
  const { taskId } = useParams();
  const navigate = useNavigate();

  // hook do react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // hooks para chamar a API
  const { mutate: updateTask, isPending: updateTaskisPending } =
    useUpdateTask(taskId);
  const { mutate: deleteTask, isPending: deleteTaskisPending } =
    useDeleteTask(taskId);
  const { data: task } = useGetTask({
    taskId,
    onSuccess: reset,
  });

  // função para alterar tarefa
  const handleSaveClick = async (taskId) => {
    updateTask(taskId, {
      onSuccess: () => {
        toast.success("Tarefa alterada com sucesso!");
        navigate(-1);
      },
      onError: () =>
        toast.error("Erro ao alterar a tarefa! Por favor, tente novamente"),
    });
  };

  // função para deletar tarefa
  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () =>
        toast.error("Erro ao deletar a tarefa! Por favor, tente novamente"),
    });
  };

  // função para voltar para a página inicial
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* cabeçalho */}
        <div className="flex w-full justify-between">
          {/* Título da tarefa */}
          <div>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/tasks">
                Minhas Tarefas
              </Link>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* botão de deletar tarefa */}
          <Button
            className="h-fit self-end px-3 py-2"
            color="danger"
            onClick={handleDeleteClick}
            disabled={updateTaskisPending || deleteTaskisPending}
          >
            {deleteTaskisPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar Tarefa
          </Button>
        </div>

        {/* formulário */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            {/* input de título */}
            <div>
              <Input
                label="Título"
                id="title"
                errorMessage={errors?.title?.message}
                disabled={updateTaskisPending || deleteTaskisPending}
                {...register("title", {
                  required: "O título é obrigatório!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O campo deve ser preenchido!";
                    }
                    return true;
                  },
                })}
              />
            </div>
            {/* input de descrição */}
            <div>
              <Input
                label="Descrição"
                id="description"
                disabled={updateTaskisPending || deleteTaskisPending}
                {...register("description", {
                  required: "A descrição é obrigatóira!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O campo deve ser preenchido!";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
            {/* input de horário */}
            <div>
              <TimeSelect
                disabled={updateTaskisPending || deleteTaskisPending}
                {...register("time")}
              />
            </div>
          </div>

          {/* botões salvar e cancelar */}
          <div className="mt-3 flex w-full justify-end gap-3">
            <Button
              size="large"
              color="secondary"
              onClick={handleBackClick}
              disabled={updateTaskisPending || deleteTaskisPending}
            >
              Cancelar
            </Button>
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateTaskisPending || deleteTaskisPending}
            >
              {updateTaskisPending ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <p>Salvar</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
