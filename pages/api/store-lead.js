// const { GoogleSpreadsheet } = require('google-spreadsheet')

// async function storeLeadData(data) {
//   const doc = new GoogleSpreadsheet('1Y6t9pgCqHo6n8kIFi00mn9zawACiHUjwtuTmtix1j8o')

//   await doc.useServiceAccountAuth({
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   })

//   await doc.loadInfo()

//   const sheet = doc.sheetsById['0']

//   await sheet.addRow({
//     Dato: data.dateStamp,
//     Tid: data.timeStamp,
//     SEO: data.tag,
//     Enhet: data.device,
//     Konverteringside: data.origin,
//     Navn: data.name,
//     Adresse: data.address,
//     Kategori: data.category,
//     Lån: data.financeText,
//     Melding: data.message,
//     Postnummer: data.location,
//     Nummer: data.phone,
//     Epost: data.email,
//   })
// }

// export default storeLeadData
