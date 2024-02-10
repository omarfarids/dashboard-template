interface ButtonProps {
  icon?: string;
  iconWrapperClassName?: string;
  isLoading?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  icon,
  iconWrapperClassName,
  isLoading,
  className,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn btn-primary bg-primary-500 w-full relative capitalize text-base ${className} ${
        icon ? "justify-start" : ""
      }`}
      {...props}
    >
      <span>
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          label
        )}
        {icon && isLoading && <span className="loading loading-ring"></span>}
      </span>
      {icon && (
        <span
          className={`absolute inset-[4px] start-auto w-[38px] rounded-full inline-flex items-center justify-center text-lg bg-white/20 ${iconWrapperClassName}`}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <i className={`icon ${icon}`}></i>
          )}
        </span>
      )}
    </button>
  );
};

export default Button;
