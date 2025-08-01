import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError('Access Denied');
      setPassword('');
      const input = document.getElementById('admin-password-input');
      if (input) {
          input.classList.add('border-red-500', 'animate-shake');
      }
      setTimeout(() => {
        setError('');
        onClose(); // Auto-close on failure as per spec
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]" onClick={onClose}>
        <style>{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .animate-shake {
                animation: shake 0.5s ease-in-out;
            }
        `}</style>
      <div className="bg-white p-8 rounded-lg shadow-xl text-center w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <img src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/Tempa-logo-dark-small.webp" alt="Tempa Web.123 Logo" className="h-12 w-auto mx-auto mb-4" />
        <h2 className="text-xl font-poppins font-bold mb-4 text-gray-800">Admin Portal Access</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="admin-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md text-center transition-all duration-300 focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="w-full mt-4 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Access Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;