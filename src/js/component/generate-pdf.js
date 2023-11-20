import { saveAs } from 'file-saver';
import { pdf } from 'react-pdf/dist/esm/entry.webpack';


const generatePdfDocument = async (documentData,fileName) => {
        const blob = await pdf((
            {documentData}
        )).toBlob();
        saveAs(blob, fileName);
};

export default generatePdfDocument;