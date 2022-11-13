import { Controller } from "@hotwired/stimulus";

import hljs from "highlight.js";
import katex from "katex";
export default class extends Controller {
  initialize() {
    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });

    document.querySelectorAll(".inline-latex").forEach((el) => {
      katex.render(el.textContent, el, {
        throwOnError: false,
      });
    });

    document.querySelectorAll(".block-latex").forEach((el) => {
      katex.render(el.textContent, el, {
        throwOnError: false,
        displayMode: true,
      });
    });
  }
}
