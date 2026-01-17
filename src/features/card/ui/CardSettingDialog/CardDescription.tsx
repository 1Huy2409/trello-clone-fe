import { Textarea } from "@/shared/components/ui/textarea";
import { useState } from "react";

interface CardDescriptionProps {
    description?: string;
    onSave?: (description: string) => void;
}

export const CardDescription = ({ description = "", onSave }: CardDescriptionProps) => {
    const [value, setValue] = useState(description);

    const handleBlur = () => {
        if (value !== description && onSave) {
            onSave(value);
        }
    };

    return (
        <div className="mb-6">
            <h3 className="font-semibold text-base mb-2">Description</h3>
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                placeholder="Add user login and registration"
                className="min-h-[100px] resize-none"
            />
        </div>
    );
};
