from http.server import BaseHTTPRequestHandler
from pdf2docx import Converter
import io
import base64
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Get content length
            content_length = int(self.headers['Content-Length'])

            # Read the request body
            post_data = self.rfile.read(content_length)

            # Parse JSON data
            data = json.loads(post_data.decode('utf-8'))

            # Get base64 encoded PDF
            pdf_base64 = data.get('pdf')
            if not pdf_base64:
                self.send_error(400, 'No PDF data provided')
                return

            # Decode base64 PDF
            pdf_bytes = base64.b64decode(pdf_base64)

            # Create in-memory file objects
            pdf_file = io.BytesIO(pdf_bytes)
            docx_file = io.BytesIO()

            # Convert PDF to DOCX
            cv = Converter(pdf_file)
            cv.convert(docx_file)
            cv.close()

            # Get DOCX bytes
            docx_bytes = docx_file.getvalue()

            # Encode DOCX to base64
            docx_base64 = base64.b64encode(docx_bytes).decode('utf-8')

            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            response = {
                'success': True,
                'docx': docx_base64
            }

            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            response = {
                'success': False,
                'error': str(e)
            }

            self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
