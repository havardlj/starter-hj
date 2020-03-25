function $(sel, context) { // select query, target
  var c = context || document;
  return Array.apply(null, c.querySelectorAll(sel));
};

function elm(tag, props, children) { // create element with tag, attributes and content inside
  var el = document.createElement(tag);

  if (typeof props == 'string') {
    el.className = props;
  } else if (typeof props == 'object') {
    for (var prop in props) {
      el.setAttribute(prop, props[prop]);
    }
  }

  if (typeof children == 'string') {
    el.innerHTML = children;
  } else if (children && children.length) {
    children.forEach(function(child) {
      el.appendChild(child);
    });
  }

  return el;

}

function dispEvnt(obj, evType) {
  var event;
  if(typeof(Event) === 'function') {
      event = new Event(evType);
  } else {
      event = document.createEvent('Event');
      event.initEvent(evType, true, true);
  }

  obj.dispatchEvent(event);
}

function hasClass(el, c) { // check for class in element, class
  var reg = new RegExp('\\b' + c + '\\b');
  return reg.test(el.className);
}

function addClass(el, c) { // add class in element, class
  if (!hasClass(el, c)) {
    el.className = el.className + ' ' + c;
  }
}

function removeClass(el, c) { // remove class in element, class
  if (el.className) {
    var reg = new RegExp('\\b' + c + '\\b');
    el.className = el.className.replace(reg, '').replace(/\s*$/, '');
  }
}

function toggleClass(el, c) { // toggle class in element, class
  var reg = new RegExp('\\b' + c + '\\b');
  if (reg.test(el.className)) {
    el.className = el.className.replace(reg, '').replace(/\s*$/, '');
  } else {
    el.className = el.className + ' ' + c;
  }
}

// 100vh fix
function vhFix() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
vhFix();

var timer;
document.documentElement.dataset.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
window.addEventListener('resize', function() {
  var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(winWidth != document.documentElement.dataset.winWidth || winWidth > 991) { vhFix() }
  document.documentElement.dataset.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
});