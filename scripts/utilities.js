



const Tools = {
   /**
    * remove terminal controll code from the string (e.g. color, hyperlink)
    * @param {string} str
    */
   cleanString(str){
      return str.normalize().replace(Tools.REGEXP.ANSICode, '');
   },

   REGEXP: Object.freeze({
      /**
       * match any ANSI code
       *
       * if hyperlinks are found, only match the beginning and the end of a hyperlink escape sequence,
       * along with the Label but kept the URL untouched.
       */
      ANSICode: /\x1b\[\d{1,3}(?:;\d{1,3})*m|\x1b\]8;;|(?<=[^\x07]+)\x07[^\x07]+\]8;;\x07/g,
   }),
}


module.exports = {
   ...Tools
}