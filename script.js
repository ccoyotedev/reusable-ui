
// Translate numbers to a pixel count for styles
function translateToPixel(number) {
  return number.toString() + "px";
}


// Set height of scroll bar
function verticalNavSelectorHeight(nav) {
  var viewPercent = window.innerHeight / document.body.clientHeight;
  var navbarHeight = nav.children[nav.children.length - 1].offsetTop - nav.children[0].offsetTop;
  var selectorHeight = navbarHeight * viewPercent;
  selector.style.height = translateToPixel(selectorHeight);
}

// Move custom scroll bar for vertical nav bar
function verticalNavSelector(selector, nav, targets) {
  selector.style.top = translateToPixel(nav.offsetTop);

  // Selectors Scrollable Height
  const links = nav.children;
  const scrollHeight = links[links.length - 1].offsetTop - links[0].offsetTop;

  // Displacement of each target
  var sectionHeights = [];
  for (var i=0; i < targets.length - 1; i++) {
    sectionHeights.push(targets[i + 1].offsetTop - targets[i].offsetTop);
  }

  // Function that moves the selector
  function selectorScroll(pageScroll) {
    var linkDisplacements = scrollHeight / sectionHeights.length;
    // For each section
    for (var i = 0; i < sectionHeights.length; i++) {
      // If page has scrolled past final target then keep selector on bottom link
      if (pageScroll > targets[targets.length - 1].offsetTop) {
        selector.style.top = translateToPixel(links[links.length - 1].offsetTop);
        // For each section scroll between correct links in proportion to the section size
      } else if (pageScroll <= targets[i+1].offsetTop && pageScroll > targets[i].offsetTop) {
        var scrollPercentage = (pageScroll - targets[i].offsetTop) / sectionHeights[i];
        var selectorOffset = scrollPercentage * linkDisplacements + links[i].offsetTop;
        selector.style.top = translateToPixel(selectorOffset)
      }
    }
  }

  // The scroll event listener 
  window.addEventListener("scroll", function() {
      selectorScroll(window.scrollY);
    }
  );
}