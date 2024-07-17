export interface Photo {
    id: string;
    url: string;
    themeId: number;
    userId: number;
    contestId: number;
}
export const defaultPhoto: Photo = {
    id: '',
    url: '',
    themeId: 0,
    userId: 0,
    contestId: 0
}
