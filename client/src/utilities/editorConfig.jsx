import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Code from '@editorjs/code';
const editorConfig = {
  /** 
   * Id of Element that should contain the Editor 
   */
  holder: 'editorjs',

  /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */
  tools: {
    header: {
      class: Header,
      inlineToolbar:["link"]
    },
    list: { 
      class: List, 
      inlineToolbar:["link", "bold"]
    },
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
    code:{
      class:Code,
      
    }
  }
};
export default editorConfig;