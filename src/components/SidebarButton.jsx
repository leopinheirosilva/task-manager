import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, color, href }) => {
  // criação de variantes de estilos para os botões
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
    <a href={href} className={sidebar({ color })}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["default","selected"]),
};

export default SidebarButton;
