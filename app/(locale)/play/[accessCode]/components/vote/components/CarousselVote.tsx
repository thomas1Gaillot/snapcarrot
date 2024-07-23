import React, {useEffect, useState} from "react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Photo} from "@/domain/photo/Photo";
import {HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Theme} from "@/domain/theme/Theme";
import useVote from "@/domain/vote/useVote";
import LoadingComponent from "@/components/[locale]/loading-component";

interface CarouselVoteProps {
    theme: Theme;
    photos: Photo[];
    loading: boolean;
    previews: { [userId: string]: string | null };
}

const CarouselVote: React.FC<CarouselVoteProps> = ({theme, loading, photos, previews}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const {vote, like} = useVote(theme.id!);
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
                    {theme.icon.jsx && (
                        <div className={"p-1 rounded-full bg-primary/5 border-2 border-primary"}>
                            <theme.icon.jsx className={"text-primary size-5"}/>
                        </div>
                    )}
                    <p className={"text-xs truncate font-medium text-secondary-foreground"}>{theme.name}</p>
                </div>
            </div>
            <Carousel
                className={"relative bg-muted/60 hover:bg-muted flex flex-col justify-center items-center gap-4 aspect-[3/4] rounded"}
                setApi={setApi}>
                <CarouselContent className={'h-full'}>
                    {loading && <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
                        <LoadingComponent text={"Chargement de l'image"}/>
                    </div>}
                    {photos.map((photo, idx) => (
                        <CarouselItem key={idx}>
                            <div
                                className=" absolute inset-0 opacity-0 cursor-pointer"
                                key={`${theme.name}-${idx}`}
                            />
                            {previews[photo.userId] ? (
                                <img
                                    src={previews[photo.userId] || undefined}
                                    alt="Preview"
                                    className="object-cover w-full h-full rounded"/>
                            ) : (
                                <img src={photo.path} alt="Stored Preview"
                                     className="object-cover w-full h-full rounded"/>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex items-center justify-between w-full ">
                {photos.length > 0 && <Button size={'icon'} variant={'ghost'} onClick={() => like(photos[current - 1])}>
                    <HeartIcon
                        className={cn("size-7", photos[current - 1].id === vote?.id && 'size-9 fill-red-500 text-red-500')}/>
                </Button>}
                <div className={"flex gap-1 items-center"}>
                    {Array.from({length: photos.length}, (_, idx) =>
                        <span key={idx}
                              className={cn("w-[7px] h-[7px] bg-gray-200 rounded-full ", current === (idx + 1) && 'w-2 h-2 bg-primary rounded-full')}></span>
                    )}
                </div>
                <HeartIcon className={'opacity-0'}/>
            </div>
        </div>
    );
};

export default CarouselVote;
