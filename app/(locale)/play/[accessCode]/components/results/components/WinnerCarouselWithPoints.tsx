import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axiosConfig";
import { useParams } from "next/navigation";
import React from "react";
import { Theme } from "@/domain/theme/Theme";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

type Point = {
    theme: Theme;
    points: number;
    photoId: number;
};

async function fetchPoints(contestId: string): Promise<Point[]> {
    const response = await apiClient(`/api/result/theme-points?contestId=${contestId}`);
    return response.data;
}

type WinnerCarouselWithPointsProps = {
    contestId: string;
};

export default function WinnerCarouselWithPoints({ contestId }: WinnerCarouselWithPointsProps) {
    const params = useParams();
    const accessCode = params ? params.accessCode : null;

    const { data: points, isLoading, error: isPointsError } = useQuery({
        queryKey: ['contest', accessCode, "points"],
        enabled: !!contestId,
        queryFn: () => fetchPoints(contestId),
    });

    if (isLoading) return <LoaderCircleIcon className={"size-4 animate-spin"} />;

    return (
        <div className="w-full max-w-lg mx-auto py-8">
            <div className="grid gap-4">
                {points?.map((point, idx) => (
                    <div key={idx} className="relative bg-muted/60 hover:bg-muted p-4 flex flex-col items-center justify-center rounded-md shadow-md">
                        {/* Points and Medal Image Positioned on Top Left */}
                        <div className="absolute top-2 left-2 flex ">
                            <span className="text-lg font-bold text-primary ">{point.points}</span>
                            <Image
                                width={30}
                                height={30}
                                src={'/medal-1.svg'}
                                alt={'medal'}
                            />
                        </div>
                        <div className={"absolute top-2 right-2"}>
                            <p className="text-sm truncate  text-secondary-foreground ">
                                {point.theme.name}</p>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                            {point.theme.icon.jsx && (
                                <div className="p-1 rounded-full bg-primary/5 border-2 border-primary">
                                    <point.theme.icon.jsx className="text-primary size-5" />
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2 text-center">
                            <p className="text-sm">Photo ID: {point.photoId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
