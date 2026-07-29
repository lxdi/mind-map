import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'
import {sendGet, sendPost, sendPut, sendDelete} from './postoffice'


registerEvent('link-opener', 'open', (stSetter, link) => openLink(link))

const openLink = function(link) {

    console.log('link to open: ' + link)

    if (link.startsWith("file:") && link.endsWith('.mm.json')) {
        console.log('open in new tab')
        const path = link.replace("file:", "")
        window.open(window.location.origin + '?path=' + path, '_blank');
    }
}