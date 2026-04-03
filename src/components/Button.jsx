import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  // criação de variáveis utilizando o Tailwind Variants
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75", //estilos em comum entre todas as variantes
    variants: {
      // criação de variantes de cor para os botões
      color: {
        primary: "bg-brand-primary text-white",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        ghost: "bg-transparent text-brand-dark-gray",
      },
      // criação de variantes de tamanho para os botões
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
      // variantes padrão
      defaultVariants: {
        color: "primary",
        size: "small",
      },
    },
  });

  return (
    <button
      className={button({ color, size, className })}
      {...rest} // prop que irá armazenar todos os atributos declarados dentro do componente (ex: onClick, onChange, autosave...)
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "ghost", "secondary"]),
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
};

export default Button;
