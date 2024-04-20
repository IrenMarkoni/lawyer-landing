"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// * плавный скролл на якоря
$("body").on("click", '[href*="#"]', function (e) {
  var fixed_offset = 100;
  if (!$(this.hash).length) return;
  $("html,body").stop().animate({
    scrollTop: $(this.hash).offset().top - fixed_offset
  }, 2000);
  e.preventDefault();
});
/* mobile menu */

$(".burger").on("click", function () {
  $(".header__content").addClass("open");
  bodyFixed();
});
$(".header__mobile-close").on("click", function () {
  $(".header__content").removeClass("open");
  clearInlineStyle($("body"));
});
if ($(window).width() < 1300) {
  $(".header__nav ul a, .header .primary-btn").on("click", function () {
    $(".header__content").removeClass("open");
    clearInlineStyle($("body"));
  });
}
/*phone mask */

$("[data-tel-input]").inputmask({
  mask: "+7 (999) 999-99-99",
  showMaskOnHover: false,
  placeholder: "_"
}); // * Вычисляет ширину полосы прокрутки

function scrollWidth() {
  var div = document.createElement("div");
  div.style.height = "50px";
  div.style.width = "50px";
  div.style.overflowY = "scroll";
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
} // * Убирает прокрутку у body


function bodyFixed() {
  $("body").css({
    "padding-right": scrollWidth() + "px",
    overflow: "hidden"
  });
}

function clearInlineStyle(element) {
  element.removeAttr("style");
}
/* accordeon */


$(".accordeon__head").on("click", function () {
  $(this).toggleClass("open").closest(".accordeon__item").toggleClass("active").find(".accordeon__body").slideToggle(300);
});
/* btns animation */
// * The function of adding a loader to the button

function addBtnLoader(btn) {
  btn.attr("disabled", "disabled").css("width", btn.outerWidth() + "px").css("height", btn.outerHeight() + "px").html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
} // * The function of removing the loader from the button


function removeBtnLoader(btn, btnOld) {
  btn.removeAttr("disabled").removeAttr("style").html(btnOld);
}
/* modals */


function showModal(modalParam) {
  var modal = $(".modal[data-modal=".concat(modalParam, "]"));
  var bg = $(".modals");

  if (bg.is(":visible")) {
    modal.fadeIn(300);
  } else {
    $(".modals").fadeIn(300);
    modal.fadeIn(300);
    bodyFixed();
  }
}

function hideModal(modalParam) {
  var modal = $(".modal[data-modal=".concat(modalParam, "]"));
  $(".modals").fadeOut(300);
  modal.fadeOut(300);
  clearInlineStyle($("body"));
}

function openSuccessModal() {
  showModal("thanks-modal");
}

function clearModalForm() {
  var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var forms = form !== null ? form.get() : document.querySelectorAll(".modal__form");

  if (form.length) {
    forms.forEach(function (form) {
      form.reset();
      form.querySelectorAll(".custom-input.filled").forEach(function (input) {
        input.classList.remove("filled");
      });
      var span = form.querySelector(".custom-input__span");

      if (span) {
        span.innerText = "Прикрепите ТЗ если есть";
      }
    });
  }
}

$(".openmodal").on("click", function (e) {
  e.preventDefault();
  var modalId = $(this).attr("data-modal");
  var title = $(this).find(".cases__title").text();
  var content = $(this).find(".cases__modal").html();
  showModal(modalId);
  $(".modal__wrap").append("<h3>".concat(title, "</h3>"));
  $(".modal__wrap").append("".concat(content));
});
$(".modal__close").on("click", function () {
  var modal = $(this).closest(".modal").attr("data-modal");

  if (modal == "info-modal") {
    $(".modal__wrap").empty();
  }

  hideModal(modal);
});

function ajaxPost(url, data) {
  var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return fetch(url, _objectSpread({
    method: "POST",
    body: data,
    headers: headers
  }, params));
}

$("form").on("submit", function (e) {
  e.preventDefault();
  var form = $(this);
  var btn = form.find("button");
  var btnHtml = btn.html();
  var fd = new FormData();
  addBtnLoader(btn);
  ajaxPost("https://jsonplaceholder.typicode.com/users", fd).then(function (response) {
    return response.json();
  }).then(function (data) {
    clearModalForm(form);
    removeBtnLoader(btn, btnHtml);

    if (form.hasClass("modal__form")) {
      var modal = form.closest(".modal");
      modal.fadeOut(300);
      setTimeout(function () {
        openSuccessModal();
      }, 300);
    } else {
      $(".modals").fadeIn(300);
      openSuccessModal();
    }
  })["catch"](function (error) {
    return console.log(error);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwibmFtZXMiOlsiJCIsIm9uIiwiZSIsImZpeGVkX29mZnNldCIsImhhc2giLCJsZW5ndGgiLCJzdG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInByZXZlbnREZWZhdWx0IiwiYWRkQ2xhc3MiLCJib2R5Rml4ZWQiLCJyZW1vdmVDbGFzcyIsImNsZWFySW5saW5lU3R5bGUiLCJpbnB1dG1hc2siLCJtYXNrIiwic2hvd01hc2tPbkhvdmVyIiwicGxhY2Vob2xkZXIiLCJzY3JvbGxXaWR0aCIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiaGVpZ2h0Iiwid2lkdGgiLCJvdmVyZmxvd1kiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJvZmZzZXRXaWR0aCIsImNsaWVudFdpZHRoIiwicmVtb3ZlIiwiY3NzIiwib3ZlcmZsb3ciLCJlbGVtZW50IiwicmVtb3ZlQXR0ciIsInRvZ2dsZUNsYXNzIiwiY2xvc2VzdCIsImZpbmQiLCJzbGlkZVRvZ2dsZSIsImFkZEJ0bkxvYWRlciIsImJ0biIsImF0dHIiLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJodG1sIiwicmVtb3ZlQnRuTG9hZGVyIiwiYnRuT2xkIiwic2hvd01vZGFsIiwibW9kYWxQYXJhbSIsIm1vZGFsIiwiYmciLCJpcyIsImZhZGVJbiIsImhpZGVNb2RhbCIsImZhZGVPdXQiLCJvcGVuU3VjY2Vzc01vZGFsIiwiY2xlYXJNb2RhbEZvcm0iLCJmb3JtIiwiZm9ybXMiLCJnZXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInJlc2V0IiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJzcGFuIiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsIm1vZGFsSWQiLCJ0aXRsZSIsInRleHQiLCJjb250ZW50IiwiYXBwZW5kIiwiZW1wdHkiLCJhamF4UG9zdCIsInVybCIsImRhdGEiLCJoZWFkZXJzIiwicGFyYW1zIiwiZmV0Y2giLCJtZXRob2QiLCJidG5IdG1sIiwiZmQiLCJGb3JtRGF0YSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJoYXNDbGFzcyIsInNldFRpbWVvdXQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKiDQv9C70LDQstC90YvQuSDRgdC60YDQvtC70Lsg0L3QsCDRj9C60L7RgNGPXHJcblxyXG4kKFwiYm9keVwiKS5vbihcImNsaWNrXCIsICdbaHJlZio9XCIjXCJdJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgZml4ZWRfb2Zmc2V0ID0gMTAwO1xyXG4gIGlmICghJCh0aGlzLmhhc2gpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICQoXCJodG1sLGJvZHlcIilcclxuICAgIC5zdG9wKClcclxuICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wIC0gZml4ZWRfb2Zmc2V0IH0sIDIwMDApO1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG4vKiBtb2JpbGUgbWVudSAqL1xyXG4kKFwiLmJ1cmdlclwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmhlYWRlcl9fY29udGVudFwiKS5hZGRDbGFzcyhcIm9wZW5cIik7XHJcbiAgYm9keUZpeGVkKCk7XHJcbn0pO1xyXG4kKFwiLmhlYWRlcl9fbW9iaWxlLWNsb3NlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuaGVhZGVyX19jb250ZW50XCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuICBjbGVhcklubGluZVN0eWxlKCQoXCJib2R5XCIpKTtcclxufSk7XHJcblxyXG4vKnBob25lIG1hc2sgKi9cclxuJChcIltkYXRhLXRlbC1pbnB1dF1cIikuaW5wdXRtYXNrKHtcclxuICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gIHNob3dNYXNrT25Ib3ZlcjogZmFsc2UsXHJcbiAgcGxhY2Vob2xkZXI6IFwiX1wiLFxyXG59KTtcclxuXHJcbi8vICog0JLRi9GH0LjRgdC70Y/QtdGCINGI0LjRgNC40L3RgyDQv9C+0LvQvtGB0Ysg0L/RgNC+0LrRgNGD0YLQutC4XHJcbmZ1bmN0aW9uIHNjcm9sbFdpZHRoKCkge1xyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LnN0eWxlLmhlaWdodCA9IFwiNTBweFwiO1xyXG4gIGRpdi5zdHlsZS53aWR0aCA9IFwiNTBweFwiO1xyXG4gIGRpdi5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IHNjcm9sbFdpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xyXG4gIGRpdi5yZW1vdmUoKTtcclxuICByZXR1cm4gc2Nyb2xsV2lkdGg7XHJcbn1cclxuXHJcbi8vICog0KPQsdC40YDQsNC10YIg0L/RgNC+0LrRgNGD0YLQutGDINGDIGJvZHlcclxuZnVuY3Rpb24gYm9keUZpeGVkKCkge1xyXG4gICQoXCJib2R5XCIpLmNzcyh7XHJcbiAgICBcInBhZGRpbmctcmlnaHRcIjogc2Nyb2xsV2lkdGgoKSArIFwicHhcIixcclxuICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcklubGluZVN0eWxlKGVsZW1lbnQpIHtcclxuICBlbGVtZW50LnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcclxufVxyXG4vKiBhY2NvcmRlb24gKi9cclxuJChcIi5hY2NvcmRlb25fX2hlYWRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgJCh0aGlzKVxyXG4gICAgLnRvZ2dsZUNsYXNzKFwib3BlblwiKVxyXG4gICAgLmNsb3Nlc3QoXCIuYWNjb3JkZW9uX19pdGVtXCIpXHJcbiAgICAudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIilcclxuICAgIC5maW5kKFwiLmFjY29yZGVvbl9fYm9keVwiKVxyXG4gICAgLnNsaWRlVG9nZ2xlKDMwMCk7XHJcbn0pO1xyXG5cclxuLyogYnRucyBhbmltYXRpb24gKi9cclxuLy8gKiBUaGUgZnVuY3Rpb24gb2YgYWRkaW5nIGEgbG9hZGVyIHRvIHRoZSBidXR0b25cclxuZnVuY3Rpb24gYWRkQnRuTG9hZGVyKGJ0bikge1xyXG4gIGJ0blxyXG4gICAgLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpXHJcbiAgICAuY3NzKFwid2lkdGhcIiwgYnRuLm91dGVyV2lkdGgoKSArIFwicHhcIilcclxuICAgIC5jc3MoXCJoZWlnaHRcIiwgYnRuLm91dGVySGVpZ2h0KCkgKyBcInB4XCIpXHJcbiAgICAuaHRtbChcclxuICAgICAgJzxkaXYgY2xhc3M9XCJsZHMtZWxsaXBzaXNcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PidcclxuICAgICk7XHJcbn1cclxuXHJcbi8vICogVGhlIGZ1bmN0aW9uIG9mIHJlbW92aW5nIHRoZSBsb2FkZXIgZnJvbSB0aGUgYnV0dG9uXHJcbmZ1bmN0aW9uIHJlbW92ZUJ0bkxvYWRlcihidG4sIGJ0bk9sZCkge1xyXG4gIGJ0bi5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpLmh0bWwoYnRuT2xkKTtcclxufVxyXG5cclxuLyogbW9kYWxzICovXHJcblxyXG5mdW5jdGlvbiBzaG93TW9kYWwobW9kYWxQYXJhbSkge1xyXG4gIGxldCBtb2RhbCA9ICQoYC5tb2RhbFtkYXRhLW1vZGFsPSR7bW9kYWxQYXJhbX1dYCk7XHJcbiAgbGV0IGJnID0gJChcIi5tb2RhbHNcIik7XHJcbiAgaWYgKGJnLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgIG1vZGFsLmZhZGVJbigzMDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiLm1vZGFsc1wiKS5mYWRlSW4oMzAwKTtcclxuICAgIG1vZGFsLmZhZGVJbigzMDApO1xyXG4gICAgYm9keUZpeGVkKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTW9kYWwobW9kYWxQYXJhbSkge1xyXG4gIGxldCBtb2RhbCA9ICQoYC5tb2RhbFtkYXRhLW1vZGFsPSR7bW9kYWxQYXJhbX1dYCk7XHJcbiAgJChcIi5tb2RhbHNcIikuZmFkZU91dCgzMDApO1xyXG4gIG1vZGFsLmZhZGVPdXQoMzAwKTtcclxuICBjbGVhcklubGluZVN0eWxlKCQoXCJib2R5XCIpKTtcclxufVxyXG5mdW5jdGlvbiBvcGVuU3VjY2Vzc01vZGFsKCkge1xyXG4gIHNob3dNb2RhbChcInRoYW5rcy1tb2RhbFwiKTtcclxufVxyXG5mdW5jdGlvbiBjbGVhck1vZGFsRm9ybShmb3JtID0gbnVsbCkge1xyXG4gIGNvbnN0IGZvcm1zID1cclxuICAgIGZvcm0gIT09IG51bGwgPyBmb3JtLmdldCgpIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9fZm9ybVwiKTtcclxuICBpZiAoZm9ybS5sZW5ndGgpIHtcclxuICAgIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcclxuICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3VzdG9tLWlucHV0LmZpbGxlZFwiKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJmaWxsZWRcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgc3BhbiA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5jdXN0b20taW5wdXRfX3NwYW5cIik7XHJcbiAgICAgIGlmIChzcGFuKSB7XHJcbiAgICAgICAgc3Bhbi5pbm5lclRleHQgPSBcItCf0YDQuNC60YDQtdC/0LjRgtC1INCi0Jcg0LXRgdC70Lgg0LXRgdGC0YxcIjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiQoXCIub3Blbm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgbW9kYWxJZCA9ICQodGhpcykuYXR0cihcImRhdGEtbW9kYWxcIik7XHJcbiAgbGV0IHRpdGxlID0gJCh0aGlzKS5maW5kKFwiLmNhc2VzX190aXRsZVwiKS50ZXh0KCk7XHJcbiAgbGV0IGNvbnRlbnQgPSAkKHRoaXMpLmZpbmQoXCIuY2FzZXNfX21vZGFsXCIpLmh0bWwoKTtcclxuICBzaG93TW9kYWwobW9kYWxJZCk7XHJcbiAgJChcIi5tb2RhbF9fd3JhcFwiKS5hcHBlbmQoYDxoMz4ke3RpdGxlfTwvaDM+YCk7XHJcbiAgJChcIi5tb2RhbF9fd3JhcFwiKS5hcHBlbmQoYCR7Y29udGVudH1gKTtcclxufSk7XHJcblxyXG4kKFwiLm1vZGFsX19jbG9zZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBtb2RhbCA9ICQodGhpcykuY2xvc2VzdChcIi5tb2RhbFwiKS5hdHRyKFwiZGF0YS1tb2RhbFwiKTtcclxuICBpZiAobW9kYWwgPT0gXCJpbmZvLW1vZGFsXCIpIHtcclxuICAgICQoXCIubW9kYWxfX3dyYXBcIikuZW1wdHkoKTtcclxuICB9XHJcbiAgaGlkZU1vZGFsKG1vZGFsKTtcclxufSk7XHJcbmZ1bmN0aW9uIGFqYXhQb3N0KHVybCwgZGF0YSwgaGVhZGVycyA9IHt9LCBwYXJhbXMgPSB7fSkge1xyXG4gIHJldHVybiBmZXRjaCh1cmwsIHtcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBib2R5OiBkYXRhLFxyXG4gICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgIC4uLnBhcmFtcyxcclxuICB9KTtcclxufVxyXG4kKFwiZm9ybVwiKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBmb3JtID0gJCh0aGlzKTtcclxuICBjb25zdCBidG4gPSBmb3JtLmZpbmQoXCJidXR0b25cIik7XHJcbiAgY29uc3QgYnRuSHRtbCA9IGJ0bi5odG1sKCk7XHJcbiAgY29uc3QgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICBhZGRCdG5Mb2FkZXIoYnRuKTtcclxuICBhamF4UG9zdChcImh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS91c2Vyc1wiLCBmZClcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgY2xlYXJNb2RhbEZvcm0oZm9ybSk7XHJcbiAgICAgIHJlbW92ZUJ0bkxvYWRlcihidG4sIGJ0bkh0bWwpO1xyXG4gICAgICBpZiAoZm9ybS5oYXNDbGFzcyhcIm1vZGFsX19mb3JtXCIpKSB7XHJcbiAgICAgICAgbGV0IG1vZGFsID0gZm9ybS5jbG9zZXN0KFwiLm1vZGFsXCIpO1xyXG4gICAgICAgIG1vZGFsLmZhZGVPdXQoMzAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIG9wZW5TdWNjZXNzTW9kYWwoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIubW9kYWxzXCIpLmZhZGVJbigzMDApO1xyXG4gICAgICAgIG9wZW5TdWNjZXNzTW9kYWwoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFFQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxFQUFWLENBQWEsT0FBYixFQUFzQixhQUF0QixFQUFxQyxVQUFVQyxDQUFWLEVBQWE7RUFDaEQsSUFBSUMsWUFBWSxHQUFHLEdBQW5CO0VBQ0EsSUFBSSxDQUFDSCxDQUFDLENBQUMsS0FBS0ksSUFBTixDQUFELENBQWFDLE1BQWxCLEVBQTBCO0VBQzFC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
