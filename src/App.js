import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';
import logo from "./_3c72afc1-a9ee-4b7a-b0c7-3c5f489c254b.jpg";


function App() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [qrData, setQrData] = useState('');
  const [userOptions, setUserOptions] = useState({
    size: 150,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'L',
    includeMargin: true,
  });
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  useEffect(() => {
    let html5QrCode;

    if (scanning) {
      const qrCodeSuccessCallback = (decodedText) => {
        setResult(decodedText);
        setScanning(false);
      };

      html5QrCode = new Html5Qrcode('qr-code-reader');
      html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        qrCodeSuccessCallback
      );
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().then(ignore => {
          // Do nothing
        }).catch(err => console.error(err));
      }
    };
  }, [scanning]);

  const startScan = () => {
    setResult('');
    setScanning(true);
  };

  const stopScan = () => {
    setScanning(false);
  };

  const handleOptionsModalClose = () => {
    setShowOptionsModal(false);
  };

  const handleOptionsModalSave = () => {
    setShowOptionsModal(false);
    generateQrCode();
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setUserOptions((prevOptions) => ({
      ...prevOptions,
      [name]: inputValue,
    }));
  };

  const generateQrCode = () => {
    const options = {
      size: userOptions.size,
      fgColor: userOptions.fgColor,
      bgColor: userOptions.bgColor,
      level: userOptions.level,
      includeMargin: userOptions.includeMargin,
    };

    const qrCodeData = 'Your QR Code Data'; // Replace with actual data
    setQrData(<QRCode value={qrCodeData} {...options} />);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg  'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
        <a className="navbar-brand" href="/">
  <img src={logo} alt="Your Logo" height="40" />
</a>

          <a className="navbar-brand" href="/">BLINQR</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-5 ">
        <div className="row">
          <div className="col-md-6">
            <div className={`card mb-4  'bg-dark text-white' : ''}`}style={{ height: '100%' }}>
              <div className="card-body">
                <h3 className="fs-3 text-body-emphasis">QR Code Scanning</h3>
                <p>Scan QR codes using your device's camera. Explore exciting content and stay connected with QR code scanning.</p>
                {scanning ? (
                  <>
                    <div id="qr-code-reader"></div>
                    <button className="btn btn-primary mt-3" onClick={stopScan} style={{ width: '50%' }}>
                      Stop Scanning
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary mt-3" onClick={startScan} style={{ width: '50%' }}>
                    Start Scanning
                  </button>
                )}
                {result && (
                  <div className="mt-3">
                    <strong>QR Code Result:</strong> <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={`card mb-4  'bg-dark text-white' : ''}`}>
              <div className="card-body">
                <h3 className="fs-3 text-body-emphasis">QR Code Generation</h3>
                <p>Generate your own QR code with custom options. Adjust the size, colors, and error correction level to suit your needs.</p>
                <button className="btn btn-success mt-3" onClick={() => setShowOptionsModal(true)} style={{ width: '50%' }}>
                  Generate QR Code
                </button>

                {qrData && (
                  <div className="mt-3">
                    <h5>Generated QR Code:</h5>
                    {qrData}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Options Modal */}
      <div className={`modal fade ${showOptionsModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showOptionsModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">QR Code Generation Options</h5>
              <button type="button" className="btn-close" onClick={handleOptionsModalClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Size:</label>
                <input
                  type="number"
                  className="form-control"
                  name="size"
                  value={userOptions.size}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Foreground Color:</label>
                <input
                  type="color"
                  className="form-control"
                  name="fgColor"
                  value={userOptions.fgColor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Background Color:</label>
                <input
                  type="color"
                  className="form-control"
                  name="bgColor"
                  value={userOptions.bgColor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Error Correction Level:</label>
                <select
                  className="form-select"
                  name="level"
                  value={userOptions.level}
                  onChange={handleInputChange}
                >
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="Q">Q</option>
                  <option value="H">H</option>
                </select>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="includeMargin"
                  checked={userOptions.includeMargin}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Include Margin</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleOptionsModalClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleOptionsModalSave}>Generate QR Code</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
