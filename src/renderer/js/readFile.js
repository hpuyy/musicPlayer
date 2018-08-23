import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'


export default function (url, file) {
  return new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), 'C:\\Users\\Administrator\\Desktop\\文档\\timg.jpg')
  })
}