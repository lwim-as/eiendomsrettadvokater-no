export async function useNetlify(state) {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    let data = {}

    state.forEach(item => {
        data = { ...data, [item.name]: item.value }
    })

    console.log(data)

    return fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "sidebar", ...data })
    })
}