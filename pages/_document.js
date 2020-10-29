import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                <script defer src="https://kit.fontawesome.com/100f05b54f.js" crossOrigin="anonymous"></script>
                <link href={`https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap`} rel="stylesheet"/>
                <link rel="icon" href="https://lwim.no/eiendomsrettadvokater/wp-content/uploads/sites/3/2019/04/cropped-icon-black-1-32x32.png" sizes="32x32"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument