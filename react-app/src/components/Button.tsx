interface buttonProps {
  children: string;
  color?: "primary" | "secondary" | "success";
  onClick: () => void;
}

const Button = ({ children, color = "primary", onClick }: buttonProps) => {
  return (
    <button onClick={onClick} type="button" className={"btn btn-" + color}>
      {children}
    </button>
  );
};

export default Button;
