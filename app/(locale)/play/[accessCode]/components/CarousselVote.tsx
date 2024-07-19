import React, {ForwardRefExoticComponent, RefAttributes, useEffect, useState} from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Photo } from "@/domain/photo/Photo";
import {LucideProps} from "lucide-react";

interface CarouselVoteProps {
    themeName: string;
    themeIcon: {
        jsx ?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
        name: string
    };
    photos: Photo[];
    previews: { [userId: string]: string | null };
}

const CarouselVote: React.FC<CarouselVoteProps> = ({ themeName, themeIcon, photos, previews }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className={"grid gap-1 w-full"}>
            <div className={"flex w-full justify-between"}>
                <div className={"flex items-center gap-1"}>
                    {themeIcon.jsx && (
                        <div className={"p-1 rounded-full bg-primary/5 border-2 border-primary"}>
                            <themeIcon.jsx className={"text-primary size-5"}/>
                        </div>
                    )}
                    <p className={"text-xs truncate font-medium text-secondary-foreground"}>{themeName}</p>
                </div>
            </div>
            <Carousel
                className={"relative bg-muted/60 hover:bg-muted flex flex-col justify-center items-center gap-4 aspect-[3/4] rounded"}
                setApi={setApi}>
                <CarouselContent className={'h-full'}>
                    {photos.map((photo, idx) => (
                        <CarouselItem key={idx}>
                            <div
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                key={`${themeName}-${idx}`}
                            />
                            {previews[photo.userId] ? (
                                <img
                                    src={previews[photo.userId] || undefined}
                                    alt="Preview"
                                    className="object-cover w-full h-full rounded" />
                            ) : (
                                <img src={photo.path} alt="Stored Preview"
                                     className="object-cover w-full h-full rounded" />
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Photo {current} sur {photos.length}
            </div>
        </div>
    );
};

export default CarouselVote;
