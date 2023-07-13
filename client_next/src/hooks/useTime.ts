export const useTime = (time: string) => {
    let newTime;

    if (time.length === 4 && time[2] == ":") {
        newTime = time.slice(0, 3) + '0' + time.slice(3)
    } else  {
        newTime = time
    }

    return [newTime]
}
