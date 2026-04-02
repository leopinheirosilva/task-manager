import { tv } from "tailwind-variants";

/* eslint-disable react/prop-types */
const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  // criação de variáveis utiliznado o Tailwind Variants
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75", //estilos em comum entre todas as variantes
    variants: {
      // criação de variantes de estilos para os botões
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
      {...rest} // prop que irá armazenar todos os atributos declarados dentro do componente (ex: onClick, onChange, autosave...)
      className={button({ color, size, className })}
    >
      {children}
    </button>
  );
};

export default Button;
