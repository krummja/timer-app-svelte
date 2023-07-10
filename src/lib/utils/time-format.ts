
export function durationString(duration: number): string {
    const minutes: string = Math.floor((duration / 60) % 60).toString().padStart(2, "0");
    const seconds: string = Math.floor(duration % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}
