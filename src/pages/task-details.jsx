import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeftIcon, ChevronRight, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  // hooks do react router DOM
  const { taskId } = useParams(); 
  const navigate = useNavigate();

  const [task, setTask] = useState();

  // função para voltar para a página inicial
  const handleBackClick = () => {
    navigate(-1);
  };

  // chamada da API
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button className="full mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary cursor-pointer hover:opacity-50">
              <ArrowLeftIcon onClick={handleBackClick} />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-brand-text-gray cursor-pointer" onClick={handleBackClick}>
                Minhas Tarefas
              </span>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* parte da direita */}
          <Button className="h-fit self-end px-3 py-1" color="danger">
            <TrashIcon /> Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              label="Título"
              id="tilte"
              value={task?.title}
              disabled={true}
            />
          </div>
          <div>
            <TimeSelect value={task?.time} disabled={true} />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              value={task?.description}
              disabled={true}
            />
          </div>
        </div>
        {/* botões salvar e cancelar */}
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
