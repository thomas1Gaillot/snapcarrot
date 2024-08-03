import {Theme} from "@/domain/theme/Theme";
import axios from "axios";
import {lucideStringToIcon} from "@/domain/theme/utils";

export async function fetchThemes(contestId?: string): Promise<Theme[]> {
    const response = await axios.get(`/api/theme/${contestId}/list`);
    return response.data.map((theme: any) => ({
        id: theme.id,
        name: theme.name,
        icon: {
            name: theme.icon,
            jsx: lucideStringToIcon(theme.icon).iconJSX,
        },
        selected: true,
    }));
}