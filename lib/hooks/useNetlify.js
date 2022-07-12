export async function useNetlify(state) {

    const data = {}
    data.county = state.state
    data.device = state.device
    data.email = state.email
    data.lawCategory = state.advokat_type
    data.message = state.description
    data.name = state.name
    data.origin = state.referer
    data.phone = state.phone
    data.serviceName = 'eiendomsrett_advokater'
    data.tag = state.seo
    data.sector = 'advokat'
    data.password = 'zn677RZnQDURJwqgplBZKucMe'

    console.log(typeof data)
    console.log(data)
    console.log(JSON.stringify(data))

    return await fetch('https://leadgen-333711.nw.r.appspot.com/leads/postLead/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
