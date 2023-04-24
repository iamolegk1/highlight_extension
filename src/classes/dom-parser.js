'use strict';

export class DOMParser {
  constructor(document) {
    this.document = document;
  }

  getElementById(id) {
    return this.document.getElementById(id);
  }

  getElementsByTagName(tagName) {
    return this.document.getElementsByTagName(tagName);
  }

  getElementsByClassName(className) {
    return this.document.getElementsByClassName(className);
  }
}
