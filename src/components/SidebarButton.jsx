import { tv } from "tailwind-variants";

/* eslint-disable react/prop-types */
const SidebarButton = ({ children, color }) => {
  // criação de variantes de estilos para os botões e ícones
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        default: "text-brand-dark-blue",
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
      },
    },
  });

  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
