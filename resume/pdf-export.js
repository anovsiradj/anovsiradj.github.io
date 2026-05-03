$(function () {
    $('#pdf-export-btn').on('click', function () {
        // Clone the resume content to avoid layout changes during PDF generation
        const $content = $('#index').clone();
        
        // Remove interactive elements like buttons to keep PDF clean
        $content.find('#theme-toggle, #pdf-export-btn').remove();
        
        // Convert the cloned HTML to a string
        const html = $content.prop('outerHTML');
        
        // Create jsPDF instance (portrait, A4)
        const doc = new jspdf.jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
        
        // Use html2canvas via jsPDF's html method
        doc.html(html, {
            callback: function (doc) {
                doc.save('resume.pdf');
            },
            x: 20,
            y: 20,
            width: 555 // approx page width minus margins
        });
    });
});
