import win32print
import sys
from datetime import datetime

def print_single_bill(bill_data, item):
    try:
        # Get the default printer name
        printer_name = win32print.GetDefaultPrinter()
        
        # Open the printer
        handle = win32print.OpenPrinter(printer_name)
        
        # Create the document
        bill_text = bytearray()
        
        # Convert text content to bytes
        text_content = []
        
        # Header
        text_content.append("\x1b\x61\x01")  # Center alignment
        text_content.append("\x1b\x21\x30")  # Double width and height
        text_content.append("Sree Ayyappan Temple Trust\n")
        text_content.append("\x1b\x21\x00")  # Normal text
        text_content.append("Nanjappa layout, Yelachenahalli\n")
        text_content.append("Phone: 9964099964\n")
        text_content.append("Email: ayyappantempleyelachenahalli@gmail.com\n")
        text_content.append("---------------------------------------------\n")
        
        # Bill details
        text_content.append("\x1b\x61\x00")  # Left alignment
        text_content.append(f"{'Bill No':<12}: {bill_data['billNumber']}\n")
        text_content.append(f"{'Date':<12}: {bill_data['transactionDate']}\n")
        text_content.append("---------------------------------------------\n")
        
        # Item details
        text_content.append(f"{'Vazhipadu':<12}: {item['vazhipaduName']}\n")
        text_content.append(f"{'Devotee':<12}: {item['devoteeName']}\n")
        text_content.append(f"{'Nakshatram':<12}: {item['devoteeNakshtram']}\n")
        text_content.append(f"{'Deity':<12}: {item['deityName']}\n")
        text_content.append(f"{'Amount':<12}: Rs.{item['amount']:.2f}\n")
        text_content.append("---------------------------------------------\n")
        
        # Footer
        text_content.append("\x1b\x61\x01")  # Center alignment
        text_content.append("Thank you for visiting!\n")
        text_content.append("Om Saranam Ayyappa!\n\n\n\n")
        
        # Cut command
        text_content.append("\x1b\x69")  # Cut paper
        
        # Add text content to bill
        bill_text.extend(''.join(text_content).encode('ascii', 'replace'))
        
        # Send to printer
        doc_info = ("Temple Bill", None, "RAW")
        job = win32print.StartDocPrinter(handle, 1, doc_info)
        win32print.StartPagePrinter(handle)
        win32print.WritePrinter(handle, bytes(bill_text))
        win32print.EndPagePrinter(handle)
        win32print.EndDocPrinter(handle)
        win32print.ClosePrinter(handle)
        
        return True, "Bill printed successfully!"
        
    except Exception as e:
        return False, f"Error printing bill: {str(e)}"

def print_bill(bill_data):
    try:
        success_count = 0
        error_messages = []
        
        # Print a separate bill for each item
        for item in bill_data['items']:
            success, message = print_single_bill(bill_data, item)
            if success:
                success_count += 1
            else:
                error_messages.append(f"Error printing bill for {item['devoteeName']}: {message}")
        
        if success_count == len(bill_data['items']):
            return True, f"Successfully printed {success_count} bills"
        else:
            return False, "\n".join(error_messages)
            
    except Exception as e:
        return False, f"Error processing bills: {str(e)}"

def print_sales_bill(bill_data):
    try:
        # Get the default printer name
        printer_name = win32print.GetDefaultPrinter()
        
        # Open the printer
        handle = win32print.OpenPrinter(printer_name)
        
        # Create the document
        bill_text = bytearray()
        
        # Convert text content to bytes
        text_content = []
        
        # Header
        text_content.append("\x1b\x61\x01")  # Center alignment
        text_content.append("\x1b\x21\x08")  # Compressed width, normal height
        text_content.append("Sree Ayyappan Temple Trust\n")
        text_content.append("\x1b\x21\x00")  # Normal text
        text_content.append("Nanjappa layout, Yelachenahalli\n")
        text_content.append("Phone: 9964099964\n")
        text_content.append("Email: ayyappantempleyelachenahalli@gmail.com\n")
        text_content.append("---------------------------------------------\n")
        
        # Bill details
        text_content.append("\x1b\x61\x00")  # Left alignment
        text_content.append(f"{'Bill No':<12}: {bill_data['billNumber']}\n")
        text_content.append(f"{'Date':<12}: {bill_data['saleDate']}\n")
        text_content.append(f"{'Customer':<12}: {bill_data['customerName']}\n")
        text_content.append(f"{'Mobile':<12}: {bill_data['customerMobile']}\n")
        text_content.append("---------------------------------------------\n")
        
        # Item details header
        text_content.append("\x1b\x61\x00")  # Left alignment
        text_content.append(f"{'Item':<18} {'Qty':>3} {'Price':>8} {'Total':>8}\n")
        text_content.append("---------------------------------------------\n")
        
        # Item details
        for item in bill_data['items']:
            name = item['productName'][:18]
            qty = str(item['quantity'])
            price = f"{item['unitPrice']:.2f}"
            total = f"{item['totalPrice']:.2f}"
            text_content.append(f"{name:<18} {qty:>3} {price:>8} {total:>8}\n")
        
        text_content.append("---------------------------------------------\n")
        
        # Total
        text_content.append(f"{'Total Amount':<22} {'':<7}Rs.{bill_data['totalAmount']:.2f}\n")
        text_content.append("---------------------------------------------\n")
        
        # Footer
        text_content.append("\x1b\x61\x01")  # Center alignment
        text_content.append("Thank you for your purchase!\n")
        text_content.append("Om Saranam Ayyappa!\n\n\n\n")
        
        # Cut command
        text_content.append("\x1b\x69")  # Cut paper
        
        # Add text content to bill
        bill_text.extend(''.join(text_content).encode('ascii', 'replace'))
        
        # Send to printer
        doc_info = ("Sales Bill", None, "RAW")
        job = win32print.StartDocPrinter(handle, 1, doc_info)
        win32print.StartPagePrinter(handle)
        win32print.WritePrinter(handle, bytes(bill_text))
        win32print.EndPagePrinter(handle)
        win32print.EndDocPrinter(handle)
        win32print.ClosePrinter(handle)
        
        return True, "Sales bill printed successfully!"
        
    except Exception as e:
        return False, f"Error printing sales bill: {str(e)}" 