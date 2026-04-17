import "./AddTaskDialog.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  const nodeRef = useRef();

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

  // hooks do tanstack react query
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: "addTask",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    },
  });

  // função para adicionar tarefa quando o botão de salvar é clicado
  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: "not_started",
    };
    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData("tasks", (currentTasks) => {
          return [...currentTasks, task];
        });
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
                    disabled={isPending}
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
                    disabled={isPending}
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
                  <TimeSelect disabled={isPending} {...register("time")} />

                  {/* botões salvar e cancelar */}
                  <div className="flex justify-center gap-3">
                    <Button
                      className="w-full"
                      size="large"
                      color="secondary"
                      type="button"
                      onClick={handleDialogClose}
                      disabled={isPending}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="w-full"
                      size="large"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? (
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
