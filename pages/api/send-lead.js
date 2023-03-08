import axios from 'axios'
// import storeLeadData from './store-lead'

export default async function sendLead(req, res) {
  const data = {}
  data.county = req.state
  data.device = req.device
  data.email = req.email
  data.lawCategory = req.advokat_type
  data.message = req.description
  data.name = req.name
  data.origin = req.referer
  data.phone = req.phone
  data.serviceName = 'eiendomsrett_advokater'
  data.tag = req.seo
  data.sector = 'advokat'
  data.password = 'zn677RZnQDURJwqgplBZKucMe'

  // console.log(data)

  // await storeLeadData(data)
  await axios.post('https://leadgen-333711.nw.r.appspot.com/leads/postLead/', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return res.status(200).json({ msg: 'ok' })
}
