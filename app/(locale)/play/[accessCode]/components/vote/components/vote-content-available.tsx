import {TypographySmall} from "@/components/ui/typography";
import {Progress} from "@/components/ui/progress";
import {Theme} from "@/domain/theme/Theme";
import CarouselVote from "@/app/(locale)/play/[accessCode]/components/vote/components/CarousselVote";
import React from "react";
import {fetchAllStoredPhotos} from "@/domain/photo/use-all-stored-photos";
import {useAllPhotoPreviews} from "@/domain/photo/use-all-photos-preview";
import {Photo} from "@/domain/photo/Photo";
import {Contest} from "@/domain/contest/Contest";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/lib/axiosConfig";
import {useParams} from "next/navigation";
import {fetchContest} from "@/domain/contest/fetch-contest";
import {fetchThemes} from "@/domain/contest/fetch-themes";

export default function VoteContentAvailable() {
    const params = useParams()
    const accessCode = params ? params.accessCode : null;

    const {data: contest, isLoading, error} = useQuery({
        queryKey: ['contest', accessCode],
        enabled: !!accessCode,
        queryFn: () => fetchContest(accessCode as string),
    })
    const {data: themes, isLoading: themesLoading, error: themesError} = useQuery({
        queryKey: ['themes', contest?.id],
        enabled: !!contest?.id,
        queryFn: () => fetchThemes(contest?.id),
    });
    const selectedThemes: Theme[] = themes?.filter((theme: Theme) => theme.selected) || [];

    const {data: storedPhotos, isLoading: photosLoading, status} = useQuery({
        queryKey: ["contest", accessCode, "all-stored-photos"],
        enabled: !!contest?.id && selectedThemes.length >0,
        queryFn: () =>  fetchAllStoredPhotos(selectedThemes, contest?.id)
    })
    const {data: numberOfVotes} = useQuery({
        queryKey: ["contest", accessCode, "vote", "number"],
        enabled: !!contest?.id,
        queryFn: async () => {
            const res = await apiClient.get(`/api/contest/${contest?.id}/number-of-votes`)
            return res.data
        }
    })
    const {data: generalStats} = useQuery({
        queryKey: ["contest", accessCode, "stats"],
        enabled: !!contest?.id,
        queryFn: async () => {
            const res = await apiClient.get(`/api/contest/${contest?.id}/general-stats`);
            const {numberOfParticipants, numberOfThemes, numberOfPhotos, userAdminName} = res.data;
            return {numberOfParticipants, numberOfThemes, numberOfPhotos, userAdminName}
        }
    })

    const {previews} = useAllPhotoPreviews();
    const getStoredPhotosForTheme = (themeId: string): Photo[] => {
        const themeIndex = selectedThemes.findIndex(theme => theme.id === themeId);
        return storedPhotos ? storedPhotos[themeIndex] || [] : [];
    };

    const numberOfTotalVotes = selectedThemes?.length * Number(generalStats?.numberOfParticipants);

    return <>
        <div className={'grid py-4 gap-1'}>
            <TypographySmall>
                <> {numberOfVotes} votes ont été attribués sur {numberOfTotalVotes}.</>
            </TypographySmall>
            <Progress value={(numberOfVotes / numberOfTotalVotes) * 100}/>
        </div>
        <div className="grid w-full gap-8 py-4">
            {selectedThemes?.map((theme: Theme, index) => (
                <CarouselVote
                    key={index}
                    loading={photosLoading}
                    theme={theme}
                    photos={getStoredPhotosForTheme(theme.id!)}
                    previews={previews[theme.id!] || {}}
                />
            ))}
        </div>

    </>
}