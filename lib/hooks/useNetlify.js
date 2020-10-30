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

    const emailData = {
        ...state,
        dateStamp: day + '.' + month + '.' + year,
        yearStamp: hour + ':' + minute,
        device: isMobile ? "Mobile" : "Desktop"
    }

    return fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "sidebar", ...emailData })
    })
}