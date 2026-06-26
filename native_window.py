import sys
from PyQt5.QtCore import QUrl
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtGui import QIcon

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('MSI Fan Control')
        self.setGeometry(100, 100, 850, 700)
        
        # Optional: Set a dark background before the web page loads
        self.setStyleSheet("background-color: #0f172a;")

        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl('http://127.0.0.1:5000'))
        
        self.setCentralWidget(self.browser)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
