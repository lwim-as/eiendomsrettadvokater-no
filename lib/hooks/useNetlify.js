import { isMobile } from 'mobile-device-detect'
export async function useNetlify(state) {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    let d = new Date()

    function checkTime(time) {
       return time < 10 ? "0" + time : time
    }

    let year = d.getFullYear().toString().substring(2)
    let month = checkTime(d.getMonth())
    let day = checkTime(d.getDay())
    let hour = checkTime(d.getHours())
    let minute = checkTime(d.getMinutes())

    return fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Device": isMobile ? "Mobile" : "Desktop",
            "DateStamp": day + '.' + month + '.' + year,
            "TimeStap": hour + ':' + minute
        },
        body: encode({ "form-name": "sidebar", ...state })
    })
}