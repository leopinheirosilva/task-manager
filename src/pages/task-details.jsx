import { useEffect, useRef,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  ChevronRight,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  // hooks do react router DOM
  const { taskId } = useParams();
  const navigate = useNavigate();

  // refs
  const titleRef = useRef();
  const descriptionRef = useRef();

  // states
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // função para voltar para a página inicial
  const handleBackClick = () => {
    navigate(-1);
  };

  // função para alterar a tarefa quando o botão de salvar é clicado
  const handleSaveClick = async () => {
    setIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    // validação de campos do formulário
    if (!title.trim()) {
      newErrors.push({
        inputField: "title",
        message: "O título é obrigatório!",
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputField: "description",
        message: "A descrição é obrigatória!",
      });
    }
    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setIsLoading(false);
    }

    // chama a api para salvar a tarefa
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (!response.ok) {
      setIsLoading(false);
      return toast.error("Erro ao salvar a tarefa! Por favor, tente novamente");
    }
    const newTask = await response.json();
    setTask(newTask);
    setIsLoading(false);
    toast.success("Tarefa salva com sucesso!");
  };

  // mensagens de erro
  const titleError = errors.find((error) => error.inputField == "title");
  const descriptionError = errors.find(
    (error) => error.inputField == "description"
  );

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
          {/* parte da direita */}
          <Button className="h-fit self-end px-3 py-2" color="danger">
            <TrashIcon /> Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              label="Título"
              id="tilte"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={isLoading}
            />
          </div>
          <div>
            <TimeSelect defaultValue={task?.time} disabled={isLoading} />
          </div>
        </div>
        {/* botões salvar e cancelar */}
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary" onClick={handleBackClick}>
            Cancelar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <p>Salvar</p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
