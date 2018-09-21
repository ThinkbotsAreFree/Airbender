// from https://www.html5rocks.com/en/tutorials/file/dndfiles/

var handleFileSelect, handleDragOver;

if (window.File && window.FileReader && window.FileList && window.Blob) {

    handleFileSelect = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        for (var i = 0, f; f = files[i]; i++) {

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    document.getElementById("input").value += e.target.result;
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsText(f);
        }        
    }

    handleDragOver = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('input');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}