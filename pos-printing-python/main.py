import win32print
import sys
from datetime import datetime

def print_sample_bill():
    try:
        # Get the default printer name
        printer_name = win32print.GetDefaultPrinter()
        
        # Open the printer
        handle = win32print.OpenPrinter(printer_name)
        
        # Create the document
        bill_text = []
        bill_text.append("\x1b\x61\x01")  # Center alignment
        bill_text.append("\x1b\x21\x30")  # Double width and height
        bill_text.append("Sree Ayyappan\nTemple Trust\n")
        bill_text.append("\x1b\x21\x00")  # Normal text
        bill_text.append("Nanjappa layout, Yelachenahalli\n")
        bill_text.append("Phone: 9964099964\n")
        bill_text.append("Email: ayyappantempleyelachenahalli@gmail.com\n")
        bill_text.append("---------------------------------------------\n")
        
        # Date and time
        bill_text.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        bill_text.append("---------------------------------------------\n")
        
        # Items
        items = [
            ("Item 1", 10.00),
            ("Item 2", 15.00),
            ("Item 3", 5.00),
            ("Item 4", 8.00)
        ]
        
        for item, price in items:
            bill_text.append(f"{item:<30} Rs.{price:>6.2f}\n")
        
        bill_text.append("---------------------------------------------\n")
        
        # Total
        total = sum(price for _, price in items)
        bill_text.append(f"TOTAL: Rs.{total:>6.2f}\n")
        
        # Footer
        bill_text.append("---------------------------------------------\n")
        bill_text.append("\x1b\x61\x01")  # Center alignment
        bill_text.append("Thank you for visiting!\n")
        bill_text.append("Om Saranam Ayyappa!\n\n\n\n")
        
        # Cut command
        bill_text.append("\x1b\x69")  # Cut paper
        
        # Convert to bytes and send to printer
        doc_info = ("Sample Bill", None, "RAW")
        job = win32print.StartDocPrinter(handle, 1, doc_info)
        win32print.StartPagePrinter(handle)
        win32print.WritePrinter(handle, ''.join(bill_text).encode('ascii', 'replace'))
        win32print.EndPagePrinter(handle)
        win32print.EndDocPrinter(handle)
        win32print.ClosePrinter(handle)
        
        print("Bill printed successfully!")
        
    except Exception as e:
        print(f"Error printing bill: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    print_sample_bill()
