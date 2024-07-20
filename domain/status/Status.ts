export enum Status {
    open = "ouvert",
    voting = "votes",
    results = "terminé",
}

export function getStatus(status: Status) {
    switch(status) {
        case 'open':
            return "Ouvert";
        case 'voting':
            return "Votes";
        case 'results':
            return "Terminé";
        default:
            return "Inconnu";
    }
}

