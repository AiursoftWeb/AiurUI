'use strict';

window.addEventListener('load', function () {
    $('.datatable').DataTable().destroy();
    $('.datatable').DataTable({
        "pageLength": 15
    });
});