import win32serviceutil
import win32service
import win32event
import servicemanager
import socket
import sys
import os
from multiprocessing import Process
from app import app

class FlaskPrinterService(win32serviceutil.ServiceFramework):
    _svc_name_ = "FlaskPrinterService"
    _svc_display_name_ = "Temple Bill Printer Service"
    _svc_description_ = "Handles bill printing requests for Sree Ayyappan Temple"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.stop_event = win32event.CreateEvent(None, 0, 0, None)
        self.flask_process = None

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.stop_event)
        if self.flask_process:
            self.flask_process.terminate()

    def SvcDoRun(self):
        try:
            servicemanager.LogMsg(
                servicemanager.EVENTLOG_INFORMATION_TYPE,
                servicemanager.PID_INFO,
                (self._svc_name_, 'Starting service')
            )
            
            # Set the working directory to the script's directory
            script_dir = os.path.dirname(os.path.abspath(__file__))
            os.chdir(script_dir)
            
            # Start Flask in a separate process
            self.flask_process = Process(target=self.run_flask)
            self.flask_process.start()
            
            # Wait for the stop event
            win32event.WaitForSingleObject(self.stop_event, win32event.INFINITE)
            
        except Exception as e:
            servicemanager.LogErrorMsg(f"Service error: {str(e)}")
            self.SvcStop()

    def run_flask(self):
        try:
            # Run Flask with waitress WSGI server
            from waitress import serve
            serve(app, host='0.0.0.0', port=5000)
        except Exception as e:
            servicemanager.LogErrorMsg(f"Flask error: {str(e)}")

if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(FlaskPrinterService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(FlaskPrinterService) 