import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import { useAddTask } from "../hooks/data/use-add-task";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  // hook do react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      time: "morning",
    },
  });

  // hook para chamar a API
  const { mutate: addTask, isPending: addTaskisPending } = useAddTask();

  // função para adicionar tarefa
  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: "not_started",
    };
    addTask(task, {
      onSuccess: () => {
        toast.success("Tarefa adicionada com sucesso!");
        handleDialogClose();
        reset({
          title: "",
          description: "",
          time: "morning",
        });
      },
      onError: () => {
        toast.error("Erro ao adicionar a tarefa! Por favor, tente novamente");
      },
    });
  };

  const nodeRef = useRef();

  return (
    <div>
      {/* transição do dialog com react-transition-group */}
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={500}
        classNames="add-task-dialog"
        unmountOnExit
      >
        {/* dialog */}
        <div>
          {createPortal(
            <div
              className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-brand-dark-blue bg-opacity-50"
              ref={nodeRef}
            >
              <div className="w-[336px] rounded-xl bg-white p-5 text-center shadow">
                <h2 className="text-xl font-semibold text-brand-dark-blue">
                  Nova Tarefa
                </h2>
                <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                  Insira as informações abaixo
                </p>

                {/* formulário */}
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit(handleSaveClick)}
                >
                  {/* input de título */}
                  <Input
                    placeholder="Título da tarefa"
                    label="Título"
                    id="tilte"
                    errorMessage={errors?.title?.message}
                    disabled={addTaskisPending}
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
                  {/* input de descrição */}
                  <Input
                    placeholder="Descreva a tarefa"
                    label="Descrição"
                    id="description"
                    errorMessage={errors?.description?.message}
                    disabled={addTaskisPending}
                    {...register("description", {
                      required: "A descrição é obrigatóira!",
                      validate: (value) => {
                        if (!value.trim()) {
                          return "O campo deve ser preenchido!";
                        }
                        return true;
                      },
                    })}
                  />
                  {/* input de horário */}
                  <TimeSelect
                    disabled={addTaskisPending}
                    {...register("time")}
                  />

                  {/* botões salvar e cancelar */}
                  <div className="flex justify-center gap-3">
                    <Button
                      className="w-full"
                      size="large"
                      color="secondary"
                      type="button"
                      onClick={handleDialogClose}
                      disabled={addTaskisPending}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="w-full"
                      size="large"
                      type="submit"
                      disabled={addTaskisPending}
                    >
                      {addTaskisPending ? (
                        <LoaderIcon className="animate-spin" />
                      ) : (
                        <p>Salvar</p>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>,
            document.body // local do DOM onde será mostrado o Portal
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default AddTaskDialog;
