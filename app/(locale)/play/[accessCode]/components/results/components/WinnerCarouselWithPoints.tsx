import { useQueries, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axiosConfig";
import { useParams } from "next/navigation";
import React from "react";
import { Theme } from "@/domain/theme/Theme";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import { fetchPhoto } from "@/domain/photo/fetch-photo";

type Point = {
    theme: Theme;
    points: number;
    photoId: number;
    user : {
        id : string,
        name : string,
    }
};

// Fetch all points
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

    // Fetch the list of points first
    const { data: points, isLoading, error: isPointsError } = useQuery({
        queryKey: ["contest", accessCode, "points"],
        enabled: !!contestId,
        queryFn: () => fetchPoints(contestId),
    });

    // Use useQueries to fetch photos based on the list of points
    const photoQueries = useQueries({
        queries:
            points?.map((point) => ({
                queryKey: ["contest", accessCode, "points", "photo", point.photoId],
                queryFn: () => fetchPhoto(point.photoId),
                enabled: !!point.photoId,
            })) || [],
    });

    // Check if photos are still loading or if there are any errors
    const isPhotosLoading = photoQueries.some((query) => query.isLoading);
    const isPhotosError = photoQueries.some((query) => query.isError);

    if (isLoading || isPhotosLoading) return <LoaderCircleIcon className={"size-4 animate-spin"} />;

    if (isPointsError || isPhotosError) return <div>Error loading data</div>;

    // Collect all photos data
    const photos = photoQueries.map((query) => query.data).filter((photo) => photo !== null);
    return (
        <div className="w-full max-w-lg mx-auto py-8">
            <div className="grid gap-4">
                {points?.map((point, idx) => {
                    const photo = photos.find((p) => p?.id.toString() === point.photoId.toString());
                    return (
                        <div
                            key={idx}
                            className="relative bg-muted/60 hover:bg-muted p-4 flex flex-col items-center justify-center rounded-md shadow-md"
                        >
                            {/* Points and Medal Image Positioned on Top Left */}
                            <div className="absolute top-2 left-2 flex items-center">
                                <span className="text-lg font-bold text-primary mr-2">{point.points}</span>
                                <Image width={30} height={30} src={"/medal-1.svg"} alt={"medal"}/>
                                <span className="text-md font-medium text-primary ml-2">{point.user.name}</span>

                            </div>
                            <div className="absolute top-2 right-2">
                                <p className="text-sm truncate font-medium text-secondary-foreground">{point.theme.name}</p>
                            </div>
                            <div className="grid gap-2 text-center">

                                {photo && (
                                    <Image
                                        src={photo.path}
                                        alt={`Photo ${point.photoId}`}
                                        width={150}
                                        height={150}
                                        className="rounded"
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
