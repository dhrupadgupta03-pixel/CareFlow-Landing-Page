"use client";
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  // Use current URL for testing (once deployed)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://prescription-mvp.vercel.app';

  const handleSend = () => {
    // Generate the link for the preview page
    const prescriptionUrl = `${baseUrl}/prescription/test1`;
    // Create the WhatsApp sharing link
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(prescriptionUrl)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif", maxWidth: "400px", margin: "0 auto" }}>
      <h2>WhatsApp Prescription Sender</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>Patient Phone Number (with country code):</label>
        <input 
          type="text" 
          placeholder="e.g. 919876543210" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <button 
        onClick={handleSend}
        style={{ width: "100%", padding: "12px", background: "#25D366", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}
      >
        Send on WhatsApp
      </button>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Make sure to include the country code without any special characters (e.g., 91 for India).
      </p>
    </div>
  );
}
