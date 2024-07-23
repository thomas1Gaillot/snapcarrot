export enum Status {
    open = "open",
    voting = "voting",
    results = "result",
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

export function contestIcon(status ?: Status, on ?: boolean) {
    switch (status) {
        case Status.open:
            if (on) return '/open-on.svg';
            return '/open.svg';
        case Status.voting:
            if (on) return '/vote-on.svg';
            return '/vote.svg';
        case Status.results:
            if (on) return '/results-on.svg';
            return '/results.svg';
        default:
            return '/void.svg';
    }
}
