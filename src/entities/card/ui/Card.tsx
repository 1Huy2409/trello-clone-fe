import { Draggable } from "@hello-pangea/dnd";
import {
    Card as ShadcnCard,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import type { Card as CardType } from "@/shared/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

interface CardProps {
    card: CardType;
    index: number;
}

export const Card = ({ card, index }: CardProps) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-2 ${snapshot.isDragging ? "opacity-50" : ""}`}
                >
                    <ShadcnCard className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                        {card.coverUrl && (
                            <div className="relative h-32 w-full overflow-hidden rounded-t-xl">
                                <img
                                    src={card.coverUrl}
                                    alt={card.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                        <CardHeader className="p-3 pb-0">
                            <CardTitle className="text-sm font-medium leading-none">
                                {card.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                            {/* Labels or Members can go here */}
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {card.cardMembers?.map((member) => (
                                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                            <AvatarImage src={member.avatarUrl} alt={member.fullname} />
                                            <AvatarFallback>{member.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </ShadcnCard>
                </div>
            )}
        </Draggable>
    );
};
