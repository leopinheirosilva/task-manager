import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ChevronRight, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  // hooks do react router DOM
  const { taskId } = useParams();
  const navigate = useNavigate();

  // hook do react hook form
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  // states
  const [task, setTask] = useState();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  // chamada da API
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  // função para voltar para a página inicial
  const handleBackClick = () => {
    navigate(-1);
  };

  // função para deletar tarefa
  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa! Por favor, tente novamente"
      );
    }
    toast.success("Tarefa deletada com sucesso!");
    navigate(-1);
    setDeleteIsLoading(false);
  };

  // função para alterar a tarefa quando o botão de salvar é clicado
  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    });
    if (!response.ok) {
      return toast.error("Erro ao salvar a tarefa! Por favor, tente novamente");
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success("Tarefa salva com sucesso!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* cabeçalho */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
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
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              <TimeSelect disabled={isSubmitting} {...register("time")} />
            </div>
          </div>

          {/* botões salvar e cancelar */}
          <div className="mt-3 flex w-full justify-end gap-3">
            <Button
              size="large"
              color="secondary"
              onClick={handleBackClick}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
