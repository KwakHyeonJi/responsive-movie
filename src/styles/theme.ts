const deviceSize = {
    mobile: '600px',
    tablet: '1024px',
}

const device = {
    mobile: `screen and (max-width: ${deviceSize.mobile})`,
    tablet: `screen and (max-width: ${deviceSize.tablet})`,
}

const color = {
    body: '#000',
    text: '#fff',
    primary: '#e50914',
}

const theme = {
    device,
    color,
}

export default theme
