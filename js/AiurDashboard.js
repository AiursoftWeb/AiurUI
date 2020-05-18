import 'datatables';
import './AiurCore';
import 'dropify';
import $ from 'jquery';

$(function () {
    $('.datatable').DataTable().destroy();
    $('.datatable').DataTable({
        "pageLength": 15
    });

    $("#sidenavToggler").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("sidenav-toggled");
        $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
        $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    });

    $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
        var originalEvent = e.originalEvent;
        var delta = originalEvent.wheelDelta || -originalEvent.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });
});
