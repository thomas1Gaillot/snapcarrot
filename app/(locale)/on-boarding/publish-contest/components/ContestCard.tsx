import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {TypographyH4, TypographyMuted, TypographyP} from "@/components/ui/typography";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";
import PlayContestContent from "@/app/(locale)/play/components/PlayContestContent";

export default function ContestCard() {

    const {user} = useUserStore()
    const {title, description, themes, endDate} = useContestStore()
    const selectedThemes = themes.filter(theme => theme.selected)

    return <Card className={' overflow-y-auto h-full'}>
        <CardContent className={"p-0"}>
            <CardHeader className={"flex flex-col "}>
                <TypographyH4>{title}</TypographyH4>
                <TypographyMuted>
                    <>{`publié par ${user.name}`}</>
                </TypographyMuted>
                <PlayContestContent/>
            </CardHeader>
        </CardContent>
    </Card>
}
