// from https://www.html5rocks.com/en/tutorials/file/dndfiles/

var handleFileSelect, handleDragOver;

if (window.File && window.FileReader && window.FileList && window.Blob) {
    
    var dropZone = document.getElementById('input');
    
    handleFileSelect = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;

        for (var i = 0, f; f = files[i]; i++) {

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    dropZone.value += e.target.result;
                };
            })(f);

            reader.readAsText(f);
        }        
    }

    handleDragOver = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}