import {Card} from "@/components/ui/card";

export default function EmptyContestLink({title, description}: {
    title: string,
    description: string
}) {

    return (
        <Card
            className="bg-gray-50 w-full max-w-3xl flex items-start gap-2 px-4 py-2 border-none shadow-none hover:shadow-none"
        >
            <div className="flex-1 grid">
                <h2 className={"font-medium"}>{title}</h2>
                <p className={"text-xs text-muted-foreground"}>{description}</p>
            </div>
        </Card>
    );
}
