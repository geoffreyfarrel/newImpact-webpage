import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";

interface PropTypes {
  name: string;
  isActive?: boolean;
  onClick: (model: string) => void;
}

const ModelButton = (props: PropTypes) => {
  const { name, isActive, onClick } = props;
  return (
    <Button
      radius="none"
      variant="light"
      className={cn(
        "font-semibold uppercase text-gray-500 data-[hover=true]:bg-teal-500 data-[hover=true]:text-white dark:text-gray-400 data-[hover=true]:dark:bg-primary-500",
        {
          "border-b-3 border-teal-500 text-teal-500 data-[hover=true]:border-0 dark:border-blue-400 dark:text-blue-400":
            isActive,
        },
      )}
      onPress={() => onClick(name)}
    >
      {name}
    </Button>
  );
};

export default ModelButton;
