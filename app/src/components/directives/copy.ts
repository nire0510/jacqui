import M from 'materialize-css';

function copy(event: Event) {
  navigator.clipboard
    .writeText((event.target as HTMLElement).innerText)
    .then(() => {
      M.toast({ html: 'Copied' });
    });
}

export default {
  mounted(element: any, binding: any) {
    // this.element = element;
    element.addEventListener('click', copy);
    element.classList.add('cursor-copy');
  },
  beforeUnmount(element: Element, binding: any) {
    element.removeEventListener('click', copy);
  },
};
