import Button from "./button";

type OptionsProps = {
  options: { text: string; correct?: boolean | undefined }[];
};

const ButtonGroup: React.FC<OptionsProps> = ({ options }) => {
  return (
    <div className="button-group">
      {options.map((btn) => {
        return <Button label={btn?.text} isCorrect={btn.correct} animated />;
      })}
    </div>
  );
};

export default ButtonGroup;
