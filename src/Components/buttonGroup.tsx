import Button from "./button";

type OptionsProps = {
  options: { text: string; correct?: boolean | undefined; status?: string }[];
};

const ButtonGroup: React.FC<OptionsProps> = ({ options }) => {
  return (
    <div className="button-group">
      {options.map((btn, i) => {
        return (
          <Button
            key={btn?.text + i}
            label={btn?.text}
            answerIndex={i}
            status={btn.status}
            animated
          />
        );
      })}
    </div>
  );
};

export default ButtonGroup;
