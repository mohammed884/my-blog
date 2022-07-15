import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
const editorConfig = {
  holder: 'editorjs',
  tools: {
    header: Header,
    list: List,
    embed: {
      class: Embed,
      inlineToolbar: false,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      }
    },
    image:{
      class:Image,
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      }
    },
    code:Code,
    marker:Marker,
  },
  placeholder:"لنكتب مقالا رائعا"
};
export default editorConfig;