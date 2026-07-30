import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'
import {sendGet, sendPost, sendPut, sendDelete} from './postoffice'


registerEvent('link-opener', 'open', (stSetter, link) => openLink(link))

const openLink = function(link) {

    console.log('link to open: ' + link)

    if (link.startsWith("file:") && link.endsWith('.mm.json')) {
        console.log('open in new tab')
        var path = link.replace("file:", "")

        var parentPath = getPathPreset()

        if (parentPath != null) {
            path = parentPath + '/' + path
        }

        window.open(window.location.origin + '?path=' + path, '_blank');
    }
}

const getPathPreset = function () {
    const pathWithFile = window.location.search.replaceAll("?path=", "")

    if (!pathWithFile.includes('/')) {
        return null
    }

    return pathWithFile.slice(0, pathWithFile.lastIndexOf('/'))
}