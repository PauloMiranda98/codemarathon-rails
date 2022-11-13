import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["mobileMenuIcon"];

  connect() {}

  toggleMobileIcon() {
    this.mobileMenuIconTargets.forEach((element) => {
      element.classList.toggle("hidden");
      element.classList.toggle("block");
    });
  }
}
