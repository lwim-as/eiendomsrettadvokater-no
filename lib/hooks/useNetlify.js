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
    data.serviceName = 'Eiendomsrett Advokater'
    data.tag = state.seo
    data.sector = 'advokat'
    data.password = 'zn677RZnQDURJwqgplBZKucMe'

    return await fetch('https://leadgen-333711.nw.r.appspot.com/leads/postLead/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
