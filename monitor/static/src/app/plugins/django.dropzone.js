//  Upload Photos validation
    function validate(nro){
        var $form = $('.upload-box');
        var $title = $form.find('#title-field');
        var $description = $form.find('#description-field');
        var $location = $form.find('#location-field');
        var $terms = $form.find('#accept-terms');
        var $submit = $form.find('.submit-photos');
        if (nro==0){
            toastr.error("No hay archivos...");
        } else if( !$title.val()){
            toastr.error("Tiene que poner un titulo...");
            $title.focus();
            return false;
        } else if( !$description.val() ){
            toastr.error("Tiene que poner una decripcion...");
            $description.focus();
            return false;
        } else if( !$location.val() ){
            toastr.error("Tiene que poner una Lugar...");
            $location.focus();
            return false;
        } else if( !$terms.is(':checked') ){
            toastr.error("Tiene que aceptar las condiciones...");
            return false;
        }
        return true;
    }

var djDropzone;
Dropzone.autoDiscover = false;
if ($('.dropzone').length > 0){
    //  Initiate dropzone
    djDropzone = new Dropzone(".dropzone", {
        url: "/pictures/new",
        autoProcessQueue: false,
        addRemoveLinks: true,
        parallelUploads: 100,
        paramName: "photo",
        dictRemoveFile: "Eliminar"

    });

    djDropzone.on("addedfile", function(file) {
        file.previewElement.addEventListener("click", function() {
            file.title = "hola mundo"
            // console.log($(this) );
        });
    });
    djDropzone.on("sending", function(file, xhr, formData) {
      formData.append("title", file.title);
      console.log(file);
    });
    var submit = document.querySelector('.submit-photos');
    submit.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var nro_files = djDropzone.getQueuedFiles().length;
        if(validate(nro_files)){
            djDropzone.processQueue();
        }
    });

    // Add CSRF token to post
    djDropzone.on("sending", function(file, xhr, formData) {
        xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
        formData.append('title',  $('#title-field').val() );
        formData.append('description',  $('#description-field').val() );
        formData.append('location',  $('#location-field').val() );
        console.log(formData);
    });

    // File was successfully uploaded
    djDropzone.on("success", function(file, response) {
        //var file_url = JSON.parse(response)["file_url"];
        //console.log(file_url);
        console.log(response);
        $('form.upload-box').reset();
    });

    // Show error messages
    djDropzone.on("error", function(file, error) {
        console.log(JSON.stringify(error));
    });
}