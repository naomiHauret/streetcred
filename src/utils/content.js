import PrismicDOM from 'prismic-dom'

const Elements = PrismicDOM.RichText.Elements
export const apiEndpoint = "https://meidena.cdn.prismic.io/api/v2"
export const accessToken = "MC5YRkx3bmhNQUFDVUFPQlk3.QEAGIO-_vW0E77-9VTQMHO-_vTHvv71277-977-977-9Qe-_vVLvv73vv700ee-_vUXvv73vv73vv73vv70"
export const htmlSerializer = (type, element, content, children) => {
  switch(type) {
    case Elements.paragraph:
    return `<p>${children.join('')}</p>`

    case Elements.image:
    return  `<img src="${element.url}" alt="${element.alt}">`

    default:
    return null
  }
}
export const linkResolver = (doc) => `/doc/${doc.id}`