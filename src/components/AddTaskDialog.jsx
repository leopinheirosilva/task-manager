import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleDialogClose, handleSubmit }) => {
  // states
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState([]);

  // refs
  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  // função para adicionar tarefa quando o botão de salvar é clicado
  const handleSaveClick = () => {
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
      return;
    }

    // adiciona a tarefa
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

  // reseta o Input Time quando o dialog é fechado
  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
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
                <h2 className="text-xl font-semibold text-brand-dark-blue">
                  Nova Tarefa
                </h2>
                <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                  Insira as informações abaixo
                </p>
                <div className="flex flex-col space-y-4">
                  {/* input de título */}
                  <Input
                    placeholder="Título da tarefa"
                    label="Título"
                    id="tilte"
                    ref={titleRef}
                    errorMessage={titleError?.message}
                  />

                  {/* input de descrição */}
                  <Input
                    placeholder="Descreva a tarefa"
                    label="Descrição"
                    id="description"
                    ref={descriptionRef}
                    errorMessage={descriptionError?.message}
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
                      color="secondary"
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
