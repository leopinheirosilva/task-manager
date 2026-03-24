import "./AddTaskDialog.css";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

/* eslint-disable react/prop-types */
const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  const nodeRef = useRef();

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
              ref={nodeRef}
              className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
            >
              <div className="w-[336px] rounded-xl bg-white p-5 text-center shadow">
                <h2 className="text-xl font-semibold text-[#35383E]">
                  Nova Tarefa
                </h2>
                <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                  Insira as informações abaixo
                </p>
                <div className="flex flex-col space-y-4">
                  <Input
                    placeholder="Título da tarefa"
                    label="Título"
                    id="tilte"
                  />

                  <TimeSelect />

                  <Input placeholder="Horário" label="Horário" id="time" />
                  <Input
                    placeholder="Descreva a tarefa"
                    label="Descrição"
                    id="description"
                  />
                  <div className="flex justify-center gap-3">
                    <Button
                      className="w-full"
                      size="large"
                      variant="secondary"
                      onClick={handleDialogClose}
                    >
                      Cancelar
                    </Button>
                    <Button size="large" className="w-full">
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
