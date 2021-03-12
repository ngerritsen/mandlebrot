export default class Modal {
  private element: Element;

  public constructor(element: Element) {
    this.element = element;

    element.addEventListener("click", this.open.bind(this));
    this.getModal().addEventListener("click", this.close.bind(this));
  }

  private open() {
    this.getModal().classList.add("active");
  }

  private close(event: MouseEvent) {
    if (event.target instanceof Element && event.target.matches("[data-modal-close]")) {
      this.getModal().classList.remove("active");
    }
  }

  private getModal(): Element {
    const id = this.element.getAttribute("data-modal-trigger");
    return document.querySelector(`[data-modal="${id}"]`);
  }
}
