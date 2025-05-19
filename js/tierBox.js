// js/tierBox.js

function toggleTierBox(){
  const box = document.getElementById('tierBox');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

if (typeof HTMLDialogElement === 'undefined') {
  // polyfill loader
  document.write(
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.6/dialog-polyfill.min.js"><\/script>' +
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.6/dialog-polyfill.min.css">'
  );
}
