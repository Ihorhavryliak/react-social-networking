import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


/* function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
        fancy modal
      </Modal>
    </div>
  );
}

export default App;
//

import ReactDOM from "react-dom"

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal = ({ open, children, onClose }) => {

  if (!open) { return null }

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={()=> console.log('clic')} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )

}

export default Modal

// index
<div id="portal"></div> */