import {$} from '@core/dom';

function handleResizer(target, $root) {
  const $resizer = $(target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({
    opacity: 1,
    [sideProp]: '-2000px',
  });

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = coords.right - e.pageX;
      $resizer.css({right: `${delta}px`});
    } else {
      const delta = coords.bottom - e.pageY;
      $resizer.css({bottom: `${delta}px`});
    }
  };

  document.onmouseup = e => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      const value = coords.width + delta;
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(col => col.style.width = value + 'px');
    } else {
      const delta = e.pageY - coords.bottom;
      const value = coords.height + delta;
      $parent.css({height: `${value}px`});
    }

    $resizer.css({
      opacity: null,
      right: 0,
      bottom: 0,
    });
  };
}

export {handleResizer};
