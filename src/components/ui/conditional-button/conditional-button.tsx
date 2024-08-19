import { cn } from "../../../utils/cn";

interface ConditionalButtonProps {
  showing: string;
  setShowing: (showing: string) => void;
  conditions: Array<string>;
}

export default function ConditionalButton({
  showing,
  setShowing,
  conditions,
}: ConditionalButtonProps) {
  return (
    <div className="w-full flex gap-1 bg-white p-1 rounded-xl">
      <div
        onClick={() => setShowing(conditions[0])}
        className={cn(
          "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
          showing === conditions[0] && "bg-gray-100 opacity-100"
        )}
      >
        {conditions[0].charAt(0).toUpperCase() + conditions[0].slice(1)}
      </div>
      <div
        onClick={() => setShowing(conditions[1])}
        className={cn(
          "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
          showing === conditions[1] && "bg-gray-100 opacity-100"
        )}
      >
        {conditions[1].charAt(0).toUpperCase() + conditions[1].slice(1)}
      </div>
    </div>
  );
}
