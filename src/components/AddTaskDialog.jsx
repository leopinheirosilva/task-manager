import "./AddTaskDialog.css";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

/* eslint-disable react/prop-types */
const AddTaskDialog = ({ isOpen, handleDialogClose, handleSubmit }) => {
  // states
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();

  // função para adicionar tarefa quando o botão de salvar é clicado
  const handleSaveClick = () => {
    // validação de campos do formulário
    const newErrors = [];
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
      return;
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    });
    handleDialogClose();
  };

  // mensagens de erro
  const titleError = errors.find((error) => error.inputField == "title");
  const descriptionError = errors.find(
    (error) => error.inputField == "description"
  );

  // reseta os Inputs quando o dialog é fechado
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setTime("morning");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <div>
      {/* definição da transição do dialog com react-transition-group */}
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
              className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
              ref={nodeRef}
            >
              <div className="w-[336px] rounded-xl bg-white p-5 text-center shadow">
                <h2 className="text-xl font-semibold text-[#35383E]">
                  Nova Tarefa
                </h2>
                <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                  Insira as informações abaixo
                </p>
                <div className="flex flex-col space-y-4">
                  {/* input de título */}
                  <Input
                    placeholder="Título da tarefa"
                    label="Título"
                    id="tilte"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    error={titleError}
                  />

                  {/* input de descrição */}
                  <Input
                    placeholder="Descreva a tarefa"
                    label="Descrição"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    error={descriptionError}
                  />

                  {/* input de horário */}
                  <TimeSelect
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />

                  {/* botões cancelar e salvar */}
                  <div className="flex justify-center gap-3">
                    <Button
                      className="w-full"
                      size="large"
                      variant="secondary"
                      onClick={handleDialogClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="w-full"
                      size="large"
                      onClick={handleSaveClick}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            </div>,
            document.body // local do DOM onde será mostrado o Portal
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default AddTaskDialog;
