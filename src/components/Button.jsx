/* eslint-disable react/prop-types */
const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  // criação de variantes de estilos para os botões
  const getVariantClasses = () => {
    if (variant == "primary") {
      return "bg-brand-primary text-white";
    }

    if (variant == "secondary") {
      return "bg-brand-light-gray text-brand-dark-blue";
    }

    if (variant == "ghost") {
      return "bg-transparent text-brand-dark-gray";
    }
  };

  // criação de variantes de tamanho para os botões
  const getSizeClasses = () => {
    if (size == "small") {
      return " py-1 text-xs";
    }

    if (size == "large") {
      return " py-2 text-sm";
    }
  };

  return (
    <button
      {...rest} // prop que irá armazenar todos os atributos declarados dentro do componente (ex: onClick, onChange, autosave...)
      className={`flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
