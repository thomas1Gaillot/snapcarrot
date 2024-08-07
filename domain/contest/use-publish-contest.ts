import {useState} from "react";
import axios from "axios";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";
import {Theme} from "@/domain/theme/Theme";
import {Status} from "@/domain/status/Status";
import {apiClient} from "@/lib/axiosConfig";

function add1MonthFromNowOn() {
    const newDate = new Date()
    newDate.setMonth(newDate.getMonth() + 1)
    return newDate
}

function serializeThemes(themes: Theme[]) {
    const selectedThemes = themes.filter(theme => theme.selected)
    return selectedThemes.map((theme: Theme) => ({
        name: theme.name,
        icon: theme.icon.name
    }))
}

function fromThemeObject(theme: any): Theme {
    return {
        name: theme.name,
        icon: {
            name: theme.icon,
            jsx: theme.icon
        },
        selected: true
    }

}

export default function usePublishContest() {
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useUserStore()
    const {
        title,
        description,
        themes,
        setThemes,
        setContest
    } = useContestStore()

    async function publishContest() {
        setIsLoading(true)
        const contestCreated = await apiClient.post('/api/contest/create', {
            title,
            description,
            themes: serializeThemes(themes),
            userId: user.id,
            endDate: add1MonthFromNowOn()
        })
        setContest({
            id: contestCreated.data.id,
            title: contestCreated.data.title,
            description: contestCreated.data.description,
            endDate: contestCreated.data.endDate,
            themes : [],
            winner: contestCreated.data.winner,
            status: Status.open,
            startDate: contestCreated.data.startDate,
            accessCode: contestCreated.data.accessCode,
            adminUser: user
        })

        let contestThemes: Theme[] = []
        const selectedThemes = themes.filter(theme => theme.selected)
        await selectedThemes.map(async (theme: Theme) => {
            const addedTheme = await apiClient.post(`/api/theme/${contestCreated.data.id}/create`, {
                name: theme.name,
                icon: theme.icon.name,
            });
            contestThemes.push(fromThemeObject(addedTheme.data))
        })
        setThemes(contestThemes)
        setIsLoading(false)
    }

    return {isPublishContestLoading: isLoading, publishContest}
}
