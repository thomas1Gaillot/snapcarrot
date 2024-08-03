import {Button} from "@/components/ui/button";
import {Share2Icon, UndoIcon} from "lucide-react";
import {TypographyBlockquote, TypographyMuted} from "@/components/ui/typography";
import {toast} from "@/components/hooks/use-toast";
import {useParams, useRouter} from "next/navigation";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import {Contest} from "@/domain/contest/Contest";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/lib/axiosConfig";

export default function ContestHeader({contest}: {
    contest: Contest
}) {
    const params = useParams()
    const accessCode = params ? params.accessCode : null;

    const {data: generalStats} = useQuery({
        queryKey: ["contest", accessCode, "stats"],
        enabled: !!contest.id,
        queryFn: async () => {
            const res = await apiClient.get(`/api/contest/${contest.id}/general-stats`);
            const {numberOfParticipants, numberOfThemes, numberOfPhotos, userAdminName} = res.data;
            return {numberOfParticipants, numberOfThemes, numberOfPhotos, userAdminName}
        }
    })

    const router = useRouter()
    const {copyToClipboard, buttonRef} = useCopyToClipboard()

    function handleCopyToClipboardClick() {
        copyToClipboard(contest.accessCode || '')
        toast({
            title: `Code ${contest.accessCode} copié !`,
            description: "Le code d'accès a été copié dans votre presse-papier."
        })
    }

    return <>
        <div className={'flex items-center justify-between gap-4'}>
            <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')}
                    variant={'secondary'}>
                <UndoIcon className={"text-gray-800 size-4"}/>
            </Button>
            <div className={"flex flex-col w-full"}>
                <p className={"font-semibold text-sm"}>{contest.title}</p>
                <TypographyMuted>
                    <>{`publié par ${generalStats?.userAdminName}`}</>
                </TypographyMuted>
            </div>
            <Button ref={buttonRef} onClick={handleCopyToClipboardClick} variant={'secondary'}>
                <Share2Icon className={"text-gray-800 size-4"}/>
            </Button>
        </div>
        <div className={"grid grid-cols-3"}>
            <div className={"grid gap-1 text-center"}>
                <p className={'font-bold'}>{generalStats?.numberOfParticipants}</p>
                <p className={'text-xs'}>participants</p>
            </div>
            <div className={"grid gap-1 text-center"}>
                <p className={'font-bold'}>{generalStats?.numberOfThemes}</p>
                <p className={'text-xs'}>thèmes</p>
            </div>
            <div className={"grid gap-1 text-center"}>
                <p className={'font-bold'}>{generalStats?.numberOfPhotos}</p>
                <p className={'text-xs'}>photos publiées</p>
            </div>
        </div>
        <TypographyBlockquote>{contest.description}</TypographyBlockquote>
    </>
}