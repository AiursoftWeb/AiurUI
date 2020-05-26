import 'dropify';
import $ from 'jquery';

class AiurUploader {
    constructor(name, sizeInMb, validExtensions, uploadUrl) {
        this.name = name;
        this.sizeInMb = sizeInMb;
        this.validExtensions = validExtensions;
        this.uploadUrl = uploadUrl;

        this.fileInput = $(`#${name}-file-input`);
        this.progress = $(`#progress-${name}`);
        this.progressbar = $(`#progressbar-${name}`);
        this.addressInput = $(`[name=${name}]`);
    }

    getExtension(filename) {
        var parts = filename.split('.');
        return (parts[parts.length - 1]).toLowerCase();
    }

    reset() {
        this.addressInput.val("");
        this.addressInput.attr('data-internet-path', "");
        this.progressbar.css('width', '0%');
        window.onbeforeunload = function () { };
    }

    onFile() {
        var file = this.fileInput.prop("files")[0];
        var ext = this.getExtension(file.name);

        if (this.validExtensions.length > 0 && this.validExtensions.indexOf(ext) === -1) {
            return;
        }

        if (file.size / 1024 / 1024 > this.sizeInMb) {
            return;
        }

        window.onbeforeunload = function () {
            return "Your file is still uploading. Are you sure to quit?";
        };

        var formData = new FormData();

        this.progress.removeClass('d-none');
        this.progressbar.css('width', '0%');
        this.progressbar.removeClass('bg-success');
        this.progressbar.addClass('progress-bar-animated');

        formData.append("file", file);
        formData.append("recursiveCreate", true);

        $.ajax({
            url: uploadUrl,
            type: 'post',
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            this.progressbar.css('width', 100 * e.loaded / e.total + '%');
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                window.onbeforeunload = function () { };
                this.addressInput.val(data.filePath);
                this.addressInput.attr('data-internet-path', data.internetPath);
                this.progressbar.addClass('bg-success');
                this.progressbar.removeClass('progress-bar-animated');
                this.progressbar.css('width', '100%');
            },
            error: this.reset
        });
    }

    init() {
        this.fileInput.unbind('change');
        this.fileInput.on('change', this.onFile);
        var dropi = this.fileInput.dropify();
        dropi.on('dropify.afterClear', reset);
    }
}

window.loadAiurUploader = function (name, sizeInMb, validExtensions, uploadUrl) {
    new AiurUploader(name, sizeInMb, validExtensions, uploadUrl).init();
}