import './index.css';

const helloEl = document.createElement('h1');
helloEl.classList.add('hello');
helloEl.textContent = 'Hello World';
document.body.appendChild(helloEl);
