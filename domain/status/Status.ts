export enum Status {
    open = "open",
    voting = "voting",
    results = "results",
}

export function getStatus(status: Status) {
    switch (status) {
        case Status.open:
            return "Ouvert";
        case Status.voting:
            return "Vote";
        case Status.results:
            return "Terminé";
    }
}
