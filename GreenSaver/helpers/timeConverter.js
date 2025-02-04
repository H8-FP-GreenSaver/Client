export function timeSince(secs) {
    const output = new Date(secs * 1000);

    let seconds = Math.floor((new Date() - output) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export function daysCounter(since) {
    let now = new Date();
    let sinceDate = new Date(since)
    
    let interval = now.getTime() - sinceDate.getTime();
    let days = Math.round(interval / (1000 * 3600 * 24));
    return days;
}