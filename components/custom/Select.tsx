import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MySelectProps {
  title?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export function MySelect({ title, options, onChange }: MySelectProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-2 text-white mb-2">
        {title && <label className="text-sm font-medium">{title}</label>}
      </div>
      <Select defaultValue={options?.[0]?.value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
