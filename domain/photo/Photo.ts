export interface Photo {
    id: string;
    path: string;
    themeId: number;
    userId: number;
    contestId: number;
}
export const defaultPhoto: Photo = {
    id: '',
    path: '',
    themeId: 0,
    userId: 0,
    contestId: 0
}
