import { PDFDocument, StandardFonts } from 'pdf-lib';
import ReactDOMServer from 'react-dom/server';

const MyComponent = () => {
    return (
      <div>
        <h1>Hello, World!</h1>
        <p>This is a PDF generated from a React component.</p>
      </div>
    );
  };
  
  const reactToPdf = async (component) => {
    // render the component to a string
    const html = ReactDOMServer.renderToString(component);
  
    // create a new PDF document
    const pdfDoc = await PDFDocument.create();
  
    // add a page to the document
    const page = pdfDoc.addPage();
  
    // set the font and font size for the page
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    page.setFont(font);
    page.setFontSize(fontSize);
  
    // get the dimensions of the page
    const { width, height } = page.getSize();
  
    // create a text box for the HTML content
    const textBox = page.drawText(html, {
      x: 50,
      y: height - 50,
      width: width - 100,
      height: height - 100,
      lineHeight: 1.5,
      font: font,
      size: fontSize,
    });
  
    // adjust the height of the page based on the height of the text box
    const textHeight = textBox.height;
    page.setSize(width, height - textHeight - 100);
  
    // save the PDF document to a Uint8Array buffer
    const pdfBytes = await pdfDoc.save();
  
    // return the buffer
    return pdfBytes;
  };

  export default reactToPdf;
  