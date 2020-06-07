'use strict'

module.exports = (componentName, pageVersion, siteUrl, pageUrl) => {
    let base = componentName + '/'
    if (pageVersion !== 'master') base += pageVersion + '/'
    let path = (pageUrl + '').replace(base, base + '_attachments/').replace("html", "pdf")
    return siteUrl + path
}
