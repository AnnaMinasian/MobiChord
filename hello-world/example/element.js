import '../src/x-552972-hello-world';
import '../src/x-552972-my-component';

const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
<x-552972-hello-world></x-552972-hello-world>
<x-552972-my-component></x-552972-my-component>
`;
