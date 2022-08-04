import 'styled-components'

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_API_KEY: string
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        device: {
            mobile: string
            tablet: string
        }
        color: {
            body: string
            text: string
            primary: string
        }
    }
}
