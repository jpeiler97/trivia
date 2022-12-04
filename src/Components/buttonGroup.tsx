import Button from "./button";

type OptionsProps = {
  options: { text: string }[];
};

const ButtonGroup: React.FC<OptionsProps> = ({ options }) => {
  return (
    <div className="button-group">
      {options.map((btn) => {
        return <Button label={btn?.text} />;
      })}
    </div>
  );
};

export default ButtonGroup;
